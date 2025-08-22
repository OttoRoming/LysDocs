# rsync
Vill man föra över filer till och från lysatordatorer kan man
använda `scp`, `sftp`, eller `rsync`, som alla använder `ssh`
som transport. Vi rekommenderar att du använder `rsync`, som är
snabbt, säkert, och pålitligt.

## Grunder
!!!warning "Kom ihåg!"
    Din hemkatalog är den samma på alla Lysators maskiner, men
    för att överföra en fil/katalog till lysators system måste
    du välja en målmaskin.

För att kopiera filen _gazonk_ till din hemkatalog på
lysatordatorn _milou_ (som användaren _bar_) skriver du:
```sh
  rsync gazonk bar@milou.lysator.liu.se:
```

Det innan `:` är alltså adressen till datorn (och eventuellt
användarnamn; samma princip som för `ssh`), och det efter är
sökvägen som filen ska kopieras till (eller från).

För att kopiera filen _gazonk_ från din hemkatalog på
lysatordatorn _bar_ vänder man på det:
```sh
  rsync milou.lysator.liu.se:gazonk . 
```

För att kopiera hela mappar måste inställningen `-r` specificeras. Detta görs genom:
```sh 
rsync -r gazonk bar@milou.lysator.liu.se
```
I allmänhet kommer inställningar att specificeras direkt efter
`rsync` kommandot. För att läsa om fler inställningar och
andra sätt att använda `rsync` kan du läsa
[man-sidan](https://linux.die.net/man/1/rsync) som även går
att nå i din terminal via:
```sh
man rsync
```

## Användbara flaggor
Ett smakprov av användbara flaggor (inställningar) för dagligt bruk är:

* `-r` : Rekursiv uppladdning, låter dig ladda upp hela kataloger istället för individuella filer.
* `-h` : Hjälpmeny, öppnar upp en kortare manualsida direkt i din stdout.
* `-v` : Verbos utskrift, informerar dig om exakt vad `rsync` gör vid ett givet tillfälle. Användbart för felsökning.
* `-n`,`--dry-run`: Låter dig testa ditt `rsync` kommando utan att faktiskt genomföra filöverföringen.
* `-4`,`-6`: Låter dig specificera att du vill koppla upp dig med IPv4 respektive IPv6.
* `--delete`: Låter dig ta bort filer som finns på fjärrdatorn men som saknas lokalt.
* `--port=` : Låter dig specificera vilken port du vill koppla upp dig mot på fjärrdatorn.
* `-z` : Zippa, låter dig komprimera datan som ska skickas innan den sänds till fjärrdatorn.
* `--progress` : Visar upp vilken fil det är som överförs.
* `-p` : bevara rättigheter, säkerställer att filen har samma läs-/skrivrättigheter som på den lokala datorn.
* `--exclude` : Låter dig exkludera filer/kataloger från överföringen.

Det finns dock många fler att läsa om på [man-sidan](https://linux.die.net/man/1/rsync)
