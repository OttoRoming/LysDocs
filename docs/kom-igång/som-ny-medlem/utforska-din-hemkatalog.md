---
weight: -85
---

# Utforska din hemkatalog

## Första steg

Om allt gått väl i "[Logga in på Lysator](./logga-in.md)" befinner du dig nu i Milous terminalgränsnitt (Skal). Ett vanligt
första steg är nu att lista ut allt innehåll i katalogen med 
```
ls -la
```
Detta är din hemkatalog, ditt ~, här kan du lägga alla de filer du anser
hör hemma här. Hemkatalogen finns på en dedikerad dator och monteras över
nätverk till den maskin du loggar in på, när du loggar in. Det innebär att
du har tillgång till samma filer, oavsett vilken lysatormaskin du är
uppkopplad till eller inloggad på!

En katalog i ~ värd att anmärka på är `.public` som är en
genväg till en katalog på webbservern som publiceras på lysators hemsida.
Om du lägger kataloger och filer under `.public` kan du sedan hitta dessa
filer på 
```
lysator.liu.se/~[användarnamn]
```

Hemkatalogen är dock användbar för mycket mer. Du kan:

*   Redigera och skapa filer med `nano` 

    nano är ett enkelt terminalbaserat textredigeringsprogram 
    som låter dig förvalta filinnehåll direkt i terminalen.
    Ett av desmånga trevliga funktioner är att alla 
    tangentbordskommandon beskrivs direkt i gränssnittet.

* Flytta runt filer i katalogstrukturen `mv`

    `mv` låter dig flytta en fil i katalogstrukturen genom att
    ange först vilken fil du vill flytta och sedan vart du 
    vill flytta den. Som exempel, skapa en fil med 
    `touch ursprungsfil`, och flytta sedan in den i
    `Documents` katalogen med 
    ```
    mv ursprungsfil Documents/målfil
    ```
    detta döper även om filen till `målfil`. Om du vill att 
    namnet ska förbli det samma efter flytten så räcker det
    att endast skriva `Documents/`

    För att sedan se filen kan du lista innehållet i `Documents` med
    ```
    ls Documents
    ```

*   Kopiera filer med `cp`

    `cp` funkar nästan exakt som `mv`, men kopierar filen 
    istället för att flytta den. 

Du kan även transportera filer mellan din dator och CPU-servern med:

*   `rsync`
    
    `rsync` är ett protokoll för att överföra filer mellan datorer.
    Det har även ett dedikerat program med samma namn som finns 
    tillgängligt i alla dugliga pakethanterare.
    Dess syntax liknar `cp` men kräver också att en fjärrbaserad
    dators address anges. Antag att du lokalt har en fil kallad
    `fil` och vill leverera den in på lysators system till `Downloads`
    mappen i din hemkatalog. Då kan du åstadkomma detta med 
    ```
    rsync fil [användarnamn]@milou.lysator.liu.se:Downloads/   
    ```
    
*   `FileZilla`
    
    `FileZilla` är en grafisk framända för `FTP` protokollet,
    det är ett snabbt och händigt sätt att leverera filer utan
    att behöva krångla allt för mycket i terminalen. `FileZilla`
    kan komma till hands, speciellt om man aldrig har arbetat med
    fjärrdatorsystem tidigare.


