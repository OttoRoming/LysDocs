## Säkerhetskopiering
### Säkerhetskopiering av hemdisk
Hemdisk säkerhetskopieras regelbundet (4 gånger per dygn). Servern som säkerhetskopieringen sker mot en server som är betydligt mindre än hemdisk (Hermaeus) så om en större datamängd ska lagras som inte kräver säkerhetskopiering (till exempel om hemdisk används för just säkerhetskopiering) så behöver den exkluderas från säkerhetskopieringen.

Exkludera data från att säkerhetskopieras genom att skapa filen `.nobackup` i mappen som ska exkluderas.

### Använda cpu-servar för att säkerhetskopiera data
_Detta går självklart att tillämpa för säkerhetskopiering mot andra system_  
Det enklaste sättet att säkerhetskopiera egen data till hemdisk är att använda rsync. Däremot har det ett antal nackdelar:
1. Nya versioner av filer skriver över de gamla så om en fil modifieras (felaktigt) och sedan säkerhetskopieras så går det inte att återställa den tidigare versionen.
2. Filerna ligger okrypterade på servern.

Båda problemen kan lösas genom att använda för ändamålet skapade program. Två välanvända program med gott anseende är restic och borg.
Nedan beskrivs hur man kan sätta upp restic.

1. Skapa en SSH-nyckel för det (kontot som ska genomföra säkerhetskopieringen) utan lösenord och lägg till den i din `authorized_keys` (om lösenord behöver skrivas in går det inte att automatisera). **Skydda nyckeln väl**.
2. Skapa ett avsnitt i `~/.ssh/config` för kontot som ska genomföra säkerhetskopieringen
```
Host lysator-backup
    HostName [VÄRDNAMN HÄR]
    IdentityFile [SÖKVÄG TILL SSH-NYCKEL]
    User [LYSATOR ANVÄNDARNAMN]
```
2. Skapa en mapp i din hemkatalog där säkerhetskopian ska ligga.
3. Skapa filen `.nobackup` i den mappen (se ovan)
4. Generera en lösenord (nyckeln som säkerhetskopian krypteras med)
4. Skapa en mapp som kommer innehålla skripten för säkerhetskopieringen och i den skapa en filen `repo.sh` med följande innehåll.
```
export RESTIC_PASSWORD=[LÖSENORD HÄR]
export export RESTIC_REPOSITORY=sftp:lysator-backup:[SÖKVÄG TILL MAPP FÖR SÄKERHETSKOPIA]
```
5. Läs in miljövariablerna genom att köra `source repo.sh`
6. Initiera förrådet genom att köra `restic init`
7. Skapa ett skript som gör själva säkerhetskopieringen `backup.sh` med följande innehåll:
```
#!/usr/bin/bash
export RESTIC_CACHE_DIR=~/.cache/restic/
source repo.sh
restic backup [SÖKVÄG 1] [SÖKVÄG 2] [SÖKVÄG 3]
```
Ge användaren som ska genomföra säkerhetskopieringen rätt att köra skriptet samt läsa `repo.sh`
8. Testa att göra en första backup. (Tips: Kör i en screen/tmux om du har "mycket" data). Gå till mappen med scripten och kör `./backup.sh`


