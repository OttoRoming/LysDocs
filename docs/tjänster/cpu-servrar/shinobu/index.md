# Shinobu
Shinobu skiljer sig från alla andra CPU-servrar eftersom den är
dedikerat till att köra [Docker
Containrar](https://www.docker.com/resources/what-container/) med
[Podman](https://podman.io/).
Machinen har 256 GB DDR4 RAM, 47 trådar och dedikerat lagring av ~3.5TB 
för lagring av applikationsdata, monterad under `/podman`.


Eftersom den är tänkt som tjänsteserver förvänta dig inte upptiden som
[Shipon](../index.md) eller [Milou](../index.md) erbjuder. Sätt därför 
upp automatstartning för dina Podman applikationer med systemd tjänster
eller Quadlet.

Det gäller samma vet och etiket som på andra maskiner - kör inte QBittorrent,
gräv inte Bitcoin - kör annars hård, fråga om du vill ha hjälp. Det kan vara
så att root periodvis kolla på vilka images som körs på maskinen för att
kolla att ingen uråldrig applikation med flera CVE mot sig körs.

!!! warning "Alla portar är öppnade"
    Portar på maskinen kan nås från det publika internet.
    **Säkerhetshåll i det du hosta kan komma exploteras och din användare
    hackas.** Ingen tycker det är kul så vänligen håll dina containers
    uppdaterade. Om du vill ha en guldsjärna gå med på security mejllistan
    för det du hosta.

För att komma igång med Podman:

 - [Komma igång](./introduktion.md) för att få en introduktion till
    Podman

Om du har problem eller frågor så vill vi gärna hjälpa dig. Rootgruppen 
är till för att hjälpa, ingen fråga är för dum.  Kontakta gära
machin-ansvaring kindergarten `kindergarten@lysator...` eller
`root@lysator...` .

## Lagring på /podman
Din hemkatalog `/home/<nick>` är en nätverksmontering mot machinen
[Hermod](https://datorhandbok.lysator.liu.se/index.php/Hermod).
Det gör att din hemkatalog är samma på alla machiner men det introducerar
också latens så om man exempelvis kör en databas på [Shipon](../index.md)
kommer den knappast vara fort.

För att lösa detta har Shinobu egen lagring monterad på `/podman` som är 
tänkt att användas för just applikationsdata av [Podman](https://podman.io/)
applikationer. När du loggar in första gången på maskinen skapas mapparna
`/podman/containers/<nick>` och `/podman/users/<nick>` åt dig. 

 - `/podman/containers/<nick>`: Här kommer podman att spara ner images
    som du bygger, container data samt alla volymer som du skapar. 
 - `/podman/users/<nick>`: Det är tänkt för dig att lägga applikationsfiler
    som dina applikationer behöver. Det kan vara konfigurationsfiler eller
    där du skriver applikationsdata till.

!!! warning "Ta backups!"
    Det tas för tillfället inga säkerhetskopior av `/podman`.

!!! warning "Varning!"
    Använd vänligen inte `/podman` som en permanent scratchdisk. Om du ska
    baka upp din hemdator, spara ner större filer som du hittar på nätet 
    eller annat som inte har med Podman att göra kommer maskinen inte
    kunnas nyttas av andra användare till det den är tänkt till. Hemdisk
    är stor, använd den för sånt.

## Vanliga fel
### Failed to bind port 1234 (Address already in use)
Porten på maskinen används redan, du behöver bytta den externa porten din
applikation vill lyssna på.

### Cannot connect to the Docker daemon
Om du kör `podman compose` används faktiska `docker compose` verktyget med ett
kompabilitetslager som podman exponerar. Du behöver starta detta för att `podman
compose` ska fungera som det ska. Kör en gång `systemctl --user enable --now
podman.socket` för att starta kompabilitetslagret.

### Vars lagras volymer?
Volymer lagras under `/podman/containers/<nick>/volumes`.

