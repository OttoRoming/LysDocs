# Terminalen

Terminalen är din bästa vän! Det kan vara svårt att tro första gången du öppnar
den, men det är sant. Kommandoraden är ett otroligt mäktigt verktyg som låter 
dig ta kontrollen över din dator på ett ojämförbart sett förutsatt att du
dedikerar lite tid till att lära dig hur man använder den.

Det är enkelt att komma igång med terminalen men det tar en livstid att
bemästra den. Alla som använder sig av datorn kan sin terminal olika väl
och oavsett kompetensnivå finns det alltid någon som kan den bättre än dig.
Jämför därför inte dig själv med andra, utan lek istället, se vad du kan lära
dig och hur du kan använda terminalen för att strömlinjeforma dina datalogiska
vardagssysslor.

## Manualsidor

Alla kommandon som nämns i denna artikel har en motsvarande manualsida under
```sh
man [kommandonamn]
```
Skriv ovanstående i terminalen för att hitta vidare läsning om ett givet kommando.

## Grundläggande navigering

### Katalogstrukturen

Din dator lagrar allt den har i filer och kataloger. Kataloger kan innehålla
både filer och kataloger medan filer inte kan innehålla andra kataloger eller
filer. En lämplig liknelse är ett träd. Filer är blad på trädet medan kataloger
är kvistar. Ju längre upp i katalogstrukturen du kommer destå tjockare är kvistarna
tills du når trädets rot. I Linux kallas den översta katalogen `/` därför
"root" (på engelska).

Katalogstrukturen innehåller även en mängd andra kataloger som du kan läsa om på
manualsidan "[hier](https://linux.die.net/man/7/hier)"
```sh
man hier
```

En viktig förkortning att känna till är `~` (utläses "tilde") som betyder
`/home/[användarnamn]`. Detta är din personliga hemkatalog där du lämpligen
lägger dina personliga filer.

### Utläsning och förflyttning

För att se var i katalogstrukturen du befinner dig kan du använda dig av
```sh
pwd
```
som står för "path (to) working directory".

För att se vad som finns i din nuvarande katalog kan du använda "list" kommandot med
```sh
ls
```

För att läsa vad som finns i en annan katalog kan du skriva
```sh
ls /sökväg/till/katalog
```
till exempel
```sh
ls ~/Downloads
```

En viktig förkortning att känna till är `..` som står för "ovanstående katalog".
Du kan se vad ovanstående katalog innehåller med
```sh
ls ..
```

För att flytta till en annan katalog använder du
```sh
cd /sökväg/till/katalog
```
till exempel
```sh
cd ~/Documents
```
för att flytta till `Documents` i din hemkatalog
följt av
```sh
cd
```
för att flytta tillbaka till din hemkatalog.
Notera att `cd` står för "change directory".

## Grundläggande filhantering

För att skapa en ny katalog använder du "make directory" genom att skriva
```sh
mkdir /sökväg/till/ny/katalog
```
till exempel kan vi skapa en katalog `test` i `Documents` mappen genom att skriva
```sh
mkdir ~/Documents/test
```

I ovanstående katalog kan vi sedan skapa en fil kallad `hejsan` med 
```sh
touch ~/Documents/test/hejsan
```
eller skapa en fil och direkt börja redigera den med
```sh
nano ~/Documents/test/hejsan
```

Om du nu skriver något och sedan stänger programmet med `ctrl-x` så
kan du sedan läsa ut innehållet med "concatenate"
```sh
cat ~/Documents/test/hejsan
```

För att radera filen används "remove" genom att skriva
```sh
rm ~/Documents/test/hejsan
```

För att radera en katalog måste även alla potentiella filer i katalogen
raderas, vi garanterar att detta sker genom att bruka den så kallade rekursiva
flaggan `-r`. Om vi vill radera den ovan skapade mappen `test` skriver vi
```sh
rm -r ~/Documents/test
```
oavsett om den i verkligheten innehåller filer eller inte.

!!!Danger "rm -rf / förstör din dator"
    `rm -rf /` betyder "remove (`rm`) root (`/`) recursively (`-r`) by force (`-f`)"
    Detta raderar ditt operativsystem. Ett roligt experiment att utföra på sin egen 
    dator, ett brott mot Svea rikes lag att utföra utan samtycke eller genom
    vilseledning på andras datorer.

!!!Info "Detta räcker för att börja utforska ett system"
    När du har läst hit kan du börja utforska lysators datorer eller din egen katalogstruktur.
    När du känner dig bekväm med allt ovanstående kan du läsa vidare med nästa kapitel.

## Strömmar och stömmanipulering

All text i terminalen transporteras genom så kallade "strömmar". När du skriver text i
terminalen matar du in text i `stdin`-strömmen (standard in). När du exekverar ett kommando
får du ut information på `stdout` (standard out) och `errout` (error out). `stdout` innehåller
all ordinarie information som programmet skriver ut, medan `errout` är en dedikerad ström för
felmeddelanden.

Som terminalanvändare ges vi tillgång att manipulera dessa strömmar för att få datorn att
göra det vi vill. Vi tillhandahålls ett antal byggblock:

*   `|` : "pipe", dirigerar om `stdout` från ett kommando till `stdin` på ett annat.
    Ett relativt avancerat exempel på vad `|` låter dig göra är följande 
    ```
    w | cut -f 1 -d\t | uniq | wc -l
    ```
    * `w` visar vem som är inloggad och vad de gör.
    * `cut` ser till att endast deras användarnamn skrivs ut.
    * `uniq` tar bort alla duplicerade namn
    * `wc -l` räknar antalet rader på `stdin`.

    Detta kommando listar alltså ut alla som är inloggade 
    och räknar sedan upp hur många de är.

*   `>` och `>>`: "plough" och "double plough" används för att dirigera in strömmar i filer.
    Skillnaden mellan dem är att `>` tömmer målfilen medan `>>` lägger till `stdin` i slutet
    på filen. Som exempel på detta betrakta
    ```
    echo "hejsan" > fil
    ```
    detta skriver ut "hejsan" till `stdout` och skickar sedan `stdout` till
    `fil` vars innehåll ersätts med "hejsan"

*   `*` : "wildcard" används för att representera "vad som helst". För att hitta alla
    pdf:er i en katalog kan vi till exemel skriva
    ```
    ls *.pdf
    ```
    vilket betyder "list (`ls`) all objects (`*`) suffixed by .pdf (`.pdf`)".
    Enligt samma principer kan vi även hitta filer som börjar på ett särskilt sätt med
    ```
    ls abc*
    ```
    som hittar alla filer med prefixet `abc` följt av vad som helst.

*   `&&` och `&` : Används för att exekvera flera kommandon.
    ```
    echo "hello" && echo "world"
    ```
    skriver "hello" till `stdout`, väntar till att den processen signalerat att
    den är färdig och skriver sedan "world" till `stdout`.
    ```
    echo "hello" & echo "world"
    ```
    väntar inte på att kommandot till vänster om `&` ska köra klart utan skapar
    direkt en ny process för kommandot på höger sida. Detta kan användas för att
    köra flera saker samtidigt i separata processer.

*   Det finns många fler nyckelord som kan användas för att få extremt
    kraftfull funktionalitet ur terminalen, för många för att gå igenom här.
    Dessa ger dock en stark grund för att börja göra saker även om listan
    inte är fullständig. För vidare läsning se
    ```
    man bash
    ```

## Grundläggande prestandaöversikt

För att få en uppfattning om hur flitigt en dator används kan du exekvera kommandot
```
htop
```

För att få veta hur mycket diskutrymme som finns kvar på datorn kan du använda
```
df -h
```

För att veta hur mycket plats en specifik fil använder kan du använda
```
du -h
```

För att skriva ut aktiva processer direkt till kommandoraden kan du använda
```
ps -aux
```

## Övrigt grundläggande 
För att söka efter filer i katalogstrukturen kan du använda
```
find / -name [filnamn] 2> /dev/null
```
som söker igenom hela katalogstrukturen och direkt slänger alla i `/dev/null` (se `man hier`)

För att söka i en textfil eller i `stdout` kan du använda
```
grep [sökterm] [fil]
```
