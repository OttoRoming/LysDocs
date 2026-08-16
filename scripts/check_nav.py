#!/usr/bin/env python3
"""Kontrollerar att inga filer i docs/ blir bortglömda.

Sedan navigationen definieras explicit i zensical.toml hamnar en ny sida inte
i menyn automatiskt. Bygget varnar inte heller för det, så en sida som varken
står i nav eller länkas från någon annan sida blir i praktiken osynlig.

Skriptet rapporterar två saker:

  1. Filer i docs/ som varken står i nav eller refereras från någon annan
     sida. För bilder och andra tillgångar räknas även referenser från
     zensical.toml, CSS och mallarna i overrides/.
  2. Poster i nav som pekar på filer som inte finns - de plockas bort tyst
     när sajten byggs.

Kör med `just check` eller `python3 scripts/check_nav.py`. Använder bara
standardbiblioteket. Avslutar med kod 1 om något hittas.

Notera att en sida som bara länkas från en bortglömd sida räknas som länkad.
"""

import argparse
import posixpath
import re
import sys
from pathlib import Path
from urllib.parse import unquote

# Filer som hör till sajten själv och varken ska stå i nav eller länkas från
# en sida.
IGNORED = {"robots.txt"}

# [text](sökväg), [text](<sökväg>) och ![bild](sökväg "titel")
MARKDOWN_LINK = re.compile(r"\]\(\s*<?([^)<>\s]+)>?[^)]*\)")

# [etikett]: sökväg
MARKDOWN_REF = re.compile(r"^ {0,3}\[[^\]]+\]:\s*<?([^\s>]+)>?", re.MULTILINE)

# href="sökväg" och src='sökväg', både i markdown och i mallar
HTML_ATTR = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""")

# url(sökväg) i CSS
CSS_URL = re.compile(r"""url\(\s*["']?([^)"']+)["']?\s*\)""")

# "sökväg.ext" - för konfigurationen, där t.ex. logo anges som ett rent värde
QUOTED_PATH = re.compile(r"""["']([^"'\s]+\.[A-Za-z0-9]{2,5})["']""")

PAGE_PATTERNS = (MARKDOWN_LINK, MARKDOWN_REF, HTML_ATTR)
ASSET_PATTERNS = (HTML_ATTR, CSS_URL, QUOTED_PATH)


def load_nav(config: Path) -> list:
    """Alla sökvägar som nämns i nav, i den ordning de står."""
    try:
        import tomllib
    except ModuleNotFoundError:
        # Python 3.10 saknar tomllib. Nav-posterna är de enda .md-sökvägarna i
        # konfigurationen, så de går att plocka ut direkt ur texten.
        return re.findall(r'"([^"]+\.md)"', config.read_text(encoding="utf-8"))

    with config.open("rb") as handle:
        data = tomllib.load(handle)

    def walk(item) -> list:
        if isinstance(item, str):
            return [item]
        if isinstance(item, list):
            return [path for child in item for path in walk(child)]
        if isinstance(item, dict):
            return [path for child in item.values() for path in walk(child)]
        return []

    return walk(data.get("project", data).get("nav", []))


def resolve(target: str, page: str):
    """Gör en länk från `page` till en sökväg relativ docs/, om den är intern."""
    target = unquote(target.split("#")[0].split("?")[0]).strip()
    if not target or "://" in target:
        return None
    if target.startswith(("//", "data:", "mailto:", "tel:")):
        return None

    if target.startswith("/"):
        path = target.lstrip("/")
    else:
        path = posixpath.join(posixpath.dirname(page), target)

    path = posixpath.normpath(path)
    # Länkar som pekar utanför docs/ är inte vårt bekymmer.
    return None if path.startswith("..") else path


def references(text: str, page: str, patterns) -> set:
    """Alla interna sökvägar som en text pekar på."""
    targets = set()
    for pattern in patterns:
        for match in pattern.findall(text):
            path = resolve(match, page)
            if not path:
                continue
            targets.add(path)
            # Länkar skrivs normalt mot källfilen (foo.md), men kan också vara
            # skrivna mot den byggda adressen (foo/).
            targets.add(path.rstrip("/") + ".md")
            targets.add(posixpath.join(path.rstrip("/"), "index.md"))
    return targets


def main() -> int:
    root = Path(__file__).resolve().parent.parent

    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--docs", type=Path, default=root / "docs")
    parser.add_argument("--config", type=Path, default=root / "zensical.toml")
    args = parser.parse_args()

    docs, config = args.docs, args.config
    if not docs.is_dir():
        print(f"Hittar inte {docs}", file=sys.stderr)
        return 2

    files = sorted(
        path.relative_to(docs).as_posix() for path in docs.rglob("*") if path.is_file()
    )
    nav = load_nav(config)

    linked = set(nav)
    for name in files:
        if name.endswith(".md"):
            text = (docs / name).read_text(encoding="utf-8")
            linked |= references(text, name, PAGE_PATTERNS)
        elif name.endswith(".css"):
            text = (docs / name).read_text(encoding="utf-8")
            linked |= references(text, name, ASSET_PATTERNS)

    # Bilder och annat kan även refereras från konfigurationen och mallarna.
    for path in [config, *sorted((root / "overrides").rglob("*.html"))]:
        if path.is_file():
            linked |= references(path.read_text(encoding="utf-8"), "", ASSET_PATTERNS)

    orphans = [
        name
        for name in files
        if name not in linked and posixpath.basename(name) not in IGNORED
    ]
    missing = [path for path in nav if not (docs / path).is_file()]

    for name in orphans:
        print(f"{docs.name}/{name}: varken i nav eller länkad från någon sida")
    for path in missing:
        print(f"{config.name}: nav pekar på {path}, som inte finns")

    if orphans or missing:
        problems = len(orphans) + len(missing)
        print(f"\n{problems} problem, {len(files)} filer kontrollerade")
        return 1

    print(f"Alla {len(files)} filer i {docs.name}/ nås från nav eller via länkar")
    return 0


if __name__ == "__main__":
    sys.exit(main())
