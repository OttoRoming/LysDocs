# Lysdocs
Skapa gärna merge-request om du vill bidra!

## Sätta upp utvecklingsmiljö

### Manuellt
1. Hämta hem detta repo till godtycklig mapp
2. I toppkatalogen på detta repo kör `python3 -m venv venv`
3. Kör `source venv/bin/activate` för att aktivera python miljön.
4. Kör `pip install -r requirements.txt` för att installera alla beroenden.
5. Kör kommandot `mkdocs serve` för att serva sidan lokalt.

Mer information går att hitta på <https://squidfunk.github.io/mkdocs-material/>

### Med `mise`
[`mise`](https://mise.jdx.dev/getting-started.html) är ett fantastiskt sätt att fixa reproducerbara utvecklingsmiljöer. I detta repo finns en konfiguration `mise.toml`.

1. Installera [`mise`](https://mise.jdx.dev/getting-started.html).
2. Kör `mise trust` i repon:s katalog.
3. Kör `mise install` och `mise install-pip-requirements`

Nu har du allt du behöver! Det finns färdiga "tasks" som nästan bara är aliaser.

Exempelvis kör `mise serve` bara `mkdocs serve` (i korrekt katalog, oavsett var du är).

## TODO:
- [X] Aktivera darkmode
- [X] Byt färgtema till lysators "officiella" färger.
- [X] Lägg till länk till detta Git-repo.
- [ ] Lägg till "Contribution guidelines" så att folk vet hur de ska göra.
- [X] Skapa CI/CD flöde, gärna så att det pushas till web-server.
- [X] Komma överens om vilka top-ämnen som ska finnas och vad de ska innehålla. (Guider, fakta/info, datorer, övrigt etc.)
