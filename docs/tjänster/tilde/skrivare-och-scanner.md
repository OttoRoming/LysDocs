## Skriva ut
I Lysators lokaler finns skrivare och scanner som kan användas av medlemmar utan
extra kostnad.

!!! warning "Måttfullhet..."
    Skrivaren är främst till för Lysatorprojekt och annat kul vi gör i föreningen.  
    Föreningen ska ***inte*** konkurrera med **PaperCut** när det gäller utskrifter av rapporter eller andra långa skoluppgifter.

Skrivaren är nätansluten och går att komma åt via någon av arbetsstationerna.
För att använda skrivaren välj `urd` som enhet och välj därefter de
inställningar som behövs för din utskrift.

Ibland kommer utskrifen inte igång av sig själv då skrivaren är satt i
strömsparläge. För att få igång skrivaren igen gör man ett kort tryck på
_power_-knappen till vänster på skrivarens ovansida.

### Grafiska gränssnitt
Skrivaren kommer automatiskt att synas i listan över tillgängliga skrivare i
din skrivbordsmiljö. I exempelvis Gnome, KDE och Cinnamon är detta testat och
fungerar (i skrivande stund). De flesta program som exempelvis firefox, eller
någon av alla installerade PDF-läsare borde också kunna hitta anslutna skrivare.

### Utskrift via kommandoraden

För utskrift via kommandoraden används lämpligen kommandot `lp` med familj.

Snabbhjälp för kommandot hittar du via: `lp --help`

För att lista tillgängliga skrivare kan du använda: `lpstat -v` <br> (I 9/10
fall kommer du nog att använda "Xerox_Phaser_6510")

För att skriva ut en PDF med standardinställnignar:
`lp -o sides=two-sided-long-edge -d urd <namn på dokument>.pdf`

### Ful nätverksutskrift
För att snabbt och smidigt skriva ut en lokal fil, pipe:a innehållet av filen
till `ssh volton -- lp -o sides=two-sided-long-edge -`.
Argumentet `-o sides=two-sided-long-edge` innebär att skrivaren kommer att spara på papper
genom att skriva till båda sidorna.
```sh
cat file.pdf | ssh volton -- lp -o sides=two-sided-long-edge -
```

Utanför lysators nät måste du tillägga `.lysator.liu.se` efter `volton`.

## Scanna In
En scanner finns ansluten via USB till arbetsstationen Borsalino. Scannern är
kabapel till att scanna in dokument i A3 storlek och mindre. Det finns även en
autoscanningsfunktion likt Universitetets Xerox maskiner.

!!! warning "Sätt på strömmen!"
    För att använda scannern, se till att den är påslagen via huvudströmbrytaren
    (sitter på scannerns vänsta kortsida), och att den är ordentligt ansluten
    via USB. ![](./scanner.jpg)

### Grafiska gränssnit
För Gnome, KDE och Cinnamon finns applikationen _Document Scanner_.
(`simple-scan` i kommandoraden.) Den är hyfsat intuitiv att använda och har gott
om inställningar att pilla med.

### Inscanning via kommandoraden
För inscanning via kommandoraden finns verktyget `scanimage`. Det är ett
kraftfullt verktyg som kan användas för att bygga skrift och att komma åt alla
möjliga inställningar på scannern. Det är dock inte särsklit användarvänligt.

- Upptäck scanners:
    ```sh
    scanimage -L
    ```

- Scanna in _alla_ dokument som ligger på skrivarens ADF (automatic document
  feeder, ovanpå). Kommer default skapa `out*.pnm`-filer- en per sida.
    ```sh
    scanimage -d 'canon_dr' --resolution 300 --batch --source 'ADF Front'
    ```

- Kombinera `out1.pnm`, `out2.pnm`, ... `out11.pnm` till en PDF.
    ```sh
    magick out{1..11}.pnm combined.pdf
    ```

