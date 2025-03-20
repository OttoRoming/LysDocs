!!! warning "Ej i drift"
    Leslie är ännu inte i drift, och detaljer kring maskinen är fortfarande i experimentfas.

Den nya webbservermaskinen som ersätter [Knuth](https://datorhandbok.lysator.liu.se/index.php/Knuth).

## Översikt

Leslie gör tre jobb:

1. Servera statiska sidor, genom nginx.
2. Servera användarsidor, genom Roxen.
2. Servera "legacy"-sidor, genom Roxen.

nginx är installerad på systemet, medan Roxen körs i en Docker-container.

## Blockdiagram
Flödet av pilar visar hur en förfrågan kan bli löst.
<!-- https://excalidraw.com/#json=FgUCST401wW4875E3ga85,oezOFI25OVms1kep5g9I1w -->
![](leslie-blockdiagram.svg)

## URL-mönster

Leslie serverar URL:er som följer dessa mönster

| Beskrivning         | URL-mönster                             |
| ------------------- | --------------------------------------- |
| Webbplatsen         | `http(s)?://www.lysator.liu.se/.*`      |
| "Legacy"-sidor      | `http(s)?://www.lysator.liu.se/$LEGACY_PATH` |
| Användarwebbplatser | `http(s)$USERNAME//.*.user.lysator.liu.se/.*`  |

- `$USERNAME` är namnet på en lysator-användare.
- `$LEGACY_PATH` är en sökväg till en "legacy"-sida. Exempelvis `/alma`, `/mud` eller `/jukebox`.
