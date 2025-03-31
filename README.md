# Lysdocs

Skapa gärna merge-request om du vill bidra!

Mer information går att hitta på <https://squidfunk.github.io/mkdocs-material/>

## Sätta upp utvecklingsmiljö

### Manuellt

1. Hämta hem detta repo till godtycklig mapp
2. I toppkatalogen på detta repo kör `python3 -m venv venv`
3. Kör `source venv/bin/activate` för att aktivera python miljön.
4. Kör `pip install -r requirements.txt` för att installera alla beroenden.
5. Kör kommandot `mkdocs serve` för att serva sidan lokalt.


### Med `uv`

[`uv`](https://docs.astral.sh/uv/) är en BLAZINGLY snabb pakethanterare för Python.

1. Installera [`uv`](https://docs.astral.sh/uv/getting-started/installation/).

2. Inuti detta repo, kör
    ```sh
    uv pip install -r requirements.txt
    ```

3.
    - Alt 1: kör `uv run mkdocs serve` för att serva sidan lokalt.
    - Alt 2: aktivera venv:et, precis som i [manuellt](#manuellt)


### Med `mise`

`mise` är ett fantastiskt sätt att fixa reproducerbara utvecklingsmiljöer.

1. Installera [`mise`](https://mise.jdx.dev/getting-started.html).
2. Kör `mise trust` och `mise install` i repot:s katalog.
3. Följ stegen för [Med `uv`](#med-uv), men ditt venv bör automatiskt aktiveras när du är i repot:s katalog.

Nu har du allt du behöver! Det finns färdiga "tasks" som nästan bara är aliaser.

Exempelvis kör `mise serve` bara `mkdocs serve` (i korrekt katalog, oavsett var du är).

## TODO:

- [x] Aktivera darkmode
- [x] Byt färgtema till lysators "officiella" färger.
- [x] Lägg till länk till detta Git-repo.
- [x] Lägg till "Contribution guidelines" så att folk vet hur de ska göra.
- [x] Skapa CI/CD flöde, gärna så att det pushas till web-server.
- [x] Komma överens om vilka top-ämnen som ska finnas och vad de ska innehålla. (Guider, fakta/info, datorer, övrigt etc.)
