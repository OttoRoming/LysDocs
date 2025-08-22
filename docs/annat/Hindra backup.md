# Hindra Backup

Om din hemkatalog börjar växa bortanför ett antal hundra gigabyte är det
lämpligt att instruera backupprocessen att ignorera din hemkatalog för att
spara utrymme på backupservern.

Detta åstadkommer du genom att exekvera
```
touch ~/.nobackup
```
på valfri cpu-server.
