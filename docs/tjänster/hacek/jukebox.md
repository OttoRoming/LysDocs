# Jukebox
## Spela musik i ˇ(haček)
Anslut till mpd **från Lysators nät**.

| Lokal   | Namn   | Värd (Mpd)            | Port (Mpd) |
| ------- | ------ | --------------------- | ---------- |
| `(grav) | Muspaj | peking.lysator.liu.se | 6600       |

## Mappen
Mappen som Jukebox spelar ifrån monteras på alla arbetsstationer och
CPU-serverar under `/lysator/jukebox`.

## Klienter
Det finns en mångfald klienter för mpd.

### ncmpcpp
ncmpcpp är en terminalbaserad mpd-klient. För att ansluta till Jukebox,
placera följande på ditt lysatorkonto i `~/.config/ncmpcpp/config`:
```
    mpd_host=peking.lysator.liu.se
    mpd_music_dir=/lysator/jukebox/
```

Kör därefter `ncmpcpp` på kommandoraden, vänta på att den ansluter
till Jukebox, och tryck på 2 för att utforska filstrukturen.

## Vid problem
* Om mpd inte kan spela efter omstart av peking, vänta några sekunder
  och försök igen.
* Kontakta [Jukebox-ansvarig](https://www.lysator.liu.se/projekt/#jukebox).


