# CPU-servrarna på Lysator

CPU-servrarna är till för föreningens medlemmar att kunna logga in remote och köra sina program på.
Få restriktioner gäller förutom [Lysators Användarvillkor](https://www.lysator.liu.se/foreningen/styrelsen/villkor.pdf).

Vilka servrar som finns tillgängliga och vad de är kapabla till varierar över tid. Nedan finns en lista på de nuvarande aktiva servrarna och vad de lämpar sig för.

## Vett och etikett
Lysators system är till för att alla medlemmar ska kunna använda och experimentera med.
För att det ska fortsätta funka behöver vi hjälpas åt lite.
Punkterna nedan är inte regler från ovan utan saker vi har lärt oss när saker har gått sönder.
Var inte rädd att använda systemen men tänk på dina medanvändare, och hör av dig på bryggan eller
till root-gruppen (root@lysator.liu.se) om du undrar över något.

1. Lägg inte virtuella diskar (för qemu etc.) under `/home`. En aktiv VM
   skriver hela tiden till sin disk, vilket gör att borg-backupen
   aldrig blir klar. Använd istället den lokala disken som finns
   på Auri-El, Milou och Shipon.
2. Om möjligt: exkludera stora datamängder från säkerhetskopieringen
   genom att skapa en `.nobackup` i mappen som ska exkluderas. Hemdisk
   (`/home`) har ~479 TB lagring medan backup-servern Arisa bara har ~140 TB.
3. Kör långa och CPU- eller I/O-tunga jobb med `nice` (och gärna också
   `ionice`) så att andra fortfarande kan jobba på maskinen.

## CPU-servrar

### Auri-El (auriel.lysator.liu.se)
**OS**: Archlinux <br>
**Modell**: RS720Q-E8-RS12 <br>
**CPU**: 16-core (32 threads) <br>
**RAM**: Ca 128GB <br>
**Övrigt**: Har ssd och hdd scratchdisk monterad på /scratch/{ssd,hdd}, kör RDP server (se länk nedan för mer information) <br>
[Mer detaljerad information om servern finns här](auriel.md)

#### Användningsområden
Åtkommlig via ssh eller rdp (fjärrskrivbord). Lämplig för allmän användning. Monterar hemdisk och mailkataloger samt det delade Lysator-filsystemet.
Har nya version av paket (Archlinux).

### Milou
**OS**: Debian 13 <br>
**Modell**: ASUS RS300-E10-RS4
**CPU**: 16-core (32 threads) <br>
**RAM**: Ca 300GB <br>
**Övrigt**: Har en scratchdisk monterad på /scratchpad <br>
[Mer detaljerad information om servern finns här](https://datorhandbok.lysator.liu.se/index.php/Milou)

#### Användningsområden
Lämplig för diskintensiva jobb (mot `/scratchpad`) och minnesintensiva jobb. Milou har mycket resurser och är bestyckad för att klara det mesta. 
Monterar hemdisk och mailkataloger samt det delade Lysator-filsystemet.

### Shipon
**OS**: FreeBSD 14 <br>
**Modell**: HP SL230s Gen8 <br>
**CPU**: 32-core <br>
**RAM**: 64GB <br>
[Mer detaljerad information om servern finns här](https://datorhandbok.lysator.liu.se/index.php/Shipon)

#### Användningsområden
Lämplig för CPU- och minnesintensiva jobb. Har god upptid och stabilitet. Kör en annan smak *nix vilket kan vara kul! Monterar hemdisk och mailkataloger samt det delade Lysator-filsystemet.

### Totoro
**OS**: Arch Linux <br>
**Modell**: Virtualiserad <br>
**CPU**: 4-core <br>
**RAM**: 16GB <br>
[Mer detaljerad information om servern finns här](https://datorhandbok.lysator.liu.se/index.php/Totoro)

#### Användningsområden
Lämplig för mindre resurskrävande men långkörande processer. Monterar hemdisk och mailkataloger samt det delade Lysator-filsystemet.


