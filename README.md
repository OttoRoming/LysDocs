# Lysdocs
Skapa gärna merge-request om du vill bidra!

## Sätta upp utvecklingsmiljö

### Manuellt
1. Hämta hem detta repo till godtycklig mapp
2. I toppkatalogen på detta repo kör `python3 -m venv venv`
3. Kör `source venv/bin/activate` för att aktivera python miljön.
4. Kör `pip install -r requirements.txt` för att installera alla beroenden.
5. Byt mapp till `lysdocs/`
6. Kör kommandot `mkdocs serve` för att serva sidan lokalt.
7. Mer information går att hitta på https://squidfunk.github.io/mkdocs-material/

### Med `direnv`
Efter att ha skapat din venv för första gången, kan du installera `direnv` och köra
```
direnv allow
```
för att automatiskt aktivera venv:en så fort du är i repo:t!

## TODO:
- [X] Aktivera darkmode
- [ ] Byt färgtema till lysators "officiella" färger.
- [ ] Lägg till länk till detta Git-repo.
- [ ] Lägg till "Contribution guidelines" så att folk vet hur de ska göra.
- [ ] Skapa CI/CD flöde, gärna så att det pushas till web-server.
- [ ] Komma överens om vilka top-ämnen som ska finnas och vad de ska innehålla. (Guider, fakta/info, datorer, övrigt etc.)
