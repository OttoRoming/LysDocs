# CPU-servrarna på Lysator

CPU-servrarna är till för föreningens medlemmar att kunna logga in remote och köra sina program på.
Få restriktioner gäller förutom [Lysators Användarvillkor](https://www.lysator.liu.se/foreningen/styrelsen/villkor.pdf).

Vilka servrar som finns tillgängliga och vad de är kapabla till varierar över tid. Nedan finns en lista på de nuvarande aktiva servrarna och vad de lämpar sig för.

## CPU-servrar

### Auri-El (auriel.lysator.liu.se)
**OS**: Archlinux <br>
**Modell**: RS720Q-E8-RS12 <br>
**CPU**: 16-core (32 threads) <br>
**RAM**: Ca 128GB <br>
**Övrigt**: Har ssd och hdd scratchdisk monterad på /scratch/{ssd,hdd}, kör RDP server (se länk nedan för mer information) <br>
[Mer detaljerad information om servern finns här](auriel)

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


