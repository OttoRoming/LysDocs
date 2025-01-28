# Guider

Här hittar du användarguider skrivna av Lysiter för Lysiter. Om du är kunnig
inom någon särskild mjukvara/hårdvara/vill utveckla någon redan existerande
artikel uppmuntras du att bidra!

## Bidrag till LysDocs

Vem som helst får bidra till LysDocs, om du vill börja bidra så hittar du 
källkoden på [Lysators gitlab](https://git.lysator.liu.se/lysdocs/lysdocs). 

För att klona hem koden kör du 
```
git clone git@git.lysator.liu.se:lysdocs/lysdocs.git
```

Sedan kan du skapa en personlig gren att redigera på med
```
git checkout -b [namn på grenen]
```

### Konfigurera utvecklingsmiljön
När du har koden lokalt kan du sätta upp utvecklingsmiljön. 
För att göra detta:
#### Manuellt

1. Kör `python3 -m venv venv` i git-repots toppkatalog. 
2. Kör `source venv/bin/activate` för att aktivera python miljön.
3. Kör `pip install -r requirements.txt` för att installera alla beroenden.
4. Kör kommandot `mkdocs serve` för att serva sidan lokalt.

#### Med skript

1. Kör `setup_venv.sh` för att göra steg 1-3 ovan.
2. Kör `mkdocs serve` för att serva sidan lokalt.

#### Med `mise`
[`mise`](https://mise.jdx.dev/getting-started.html) är ett fantastiskt sätt att
fixa reproducerbara utvecklingsmiljöer. I detta repo finns en konfiguration
`mise.toml`.

1. Installera [`mise`](https://mise.jdx.dev/getting-started.html).
2. Kör `mise trust` i repon:s katalog.
3. Kör `mise install` och `mise install-pip-requirements`

Nu har du allt du behöver! Det finns färdiga "tasks" som nästan bara är aliaser.

Exempelvis kör `mise serve` bara `mkdocs serve` (i korrekt katalog, oavsett var du är).

### Redigera innehåll

Innehållet i LysDocs hanteras med [MkDocs](https://www.mkdocs.org/). Alla sidor 
är därför skrivna i [Markdown](https://github.com/lifeparticle/Markdown-Cheatsheet).
Öppna önskad fil på rätt plats i filträdet och redigera efter behov.

#### Exempel
```
vim docs/Guider/foo/bar.md
```
kommer att börja redigera filen som kommer att ligga på sidan `Guider` under kategorin `foo`
i artikeln `bar`.

`bar.md` kan se ut exempelvis såhär
```
# Titel

Brödtext

## Underrubrik

* punkt 1
* punkt 2

| tabell | med | info |
|--------|-----|------|
|lorem   |ipsum|dolor |
```
och skapar då

-------------------

# Titel

Brödtext

## Underrubrik

* punkt 1
* punkt 2

| tabell | med | info |
|--------|-----|------|
|lorem   |ipsum|dolor |

------------------

### Publicera artikeln

För att publicera artikeln trycker du ditt modifierade repo till gitlabben och
lägger en merge-request. För att göra detta följer du Lysators 
[Gitlab guide](https://www.lysator.liu.se/lysdocs/guider/Versionshantering/GitLab/).

