---
title: Jukebox
---

## Spela musik i `~` och BAR

Anslut till mpd **från Lysators nät**.

| Lokal               | Värd (Mpd)                      | Port (Mpd) |
|---------------------|---------------------------------|------------|
| Vardagsrummet i `~` | `tv.jukebox.lysator.liu.se`     | 6600       |
| Byrån i `~`         | `office.jukebox.lysator.liu.se` | 6600       |
| BAR-labbet          | `bar.jukebox.lysator.liu.se`    | 6600       |

## Mappen

Mappen som Jukebox spelar ifrån monteras på alla arbetsstationer och
CPU-serverar under `/lysator/jukebox`. Om du lägger in ny musik, se till att
uppdatera databasen. Annars syns musiken inte av mpd. En uppdatering kan
startas genom att ssh:a till `jukebox.lysator.liu.se` och köra `mpc update`. Den
nya musiken bör visa sig efter en stund.

## Klienter

Det finns en mångfald klienter för mpd. När konfiguration förklaras för
respektive klient gäller det att `$HOST` syftar på någon av värdarna i tabellen
ovan.

### rmpc

`rmpc` är en terminalbaserad mpd-klient. Börja med att skapa
standardkonfigurationen genom att köra följande i kommandoraden:

```bash
    mkdir -p ~/.config/rmpc
    rmpc config > ~/.config/rmpc/config.ron
```

Redigera därefter fältet `address` (vid skrivtid längst upp i filen) till
`"$HOST:6600"`. Kör slutligen `rmpc` för att ansluta till jukebox. För att
ansluta till en alternativ jukebox-sänka än den som pekas ut av `address`, kör
istället `rmpc -a $HOST:6600`.

### ncmpcpp

`ncmpcpp` är en terminalbaserad mpd-klient. För att ansluta till Jukebox,
placera följande på ditt lysatorkonto i `~/.config/ncmpcpp/config`:

```conf
    mpd_host=$HOST
    mpd_music_dir=/lysator/jukebox/
```

Kör därefter `ncmpcpp` på kommandoraden, vänta på att den ansluter till
Jukebox, och tryck på 2 för att utforska filstrukturen. För att ansluta till
en alternativ jukebox-sänka än den som pekas ut av `mpd_host`, kör istället
`ncmpcpp -h $HOST`.

## Vid problem

- Om mpd är mycket långsamt på någon av sänkorna, vänta först en stund.
- Kontakta [Jukebox-ansvarig](https://www.lysator.liu.se/projekt/#jukebox).
