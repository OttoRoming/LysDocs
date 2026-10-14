---
title: Webbserver
---

Leslie är Lysators nya webbservermaskin som ersätter [Knuth](https://datorhandbok.lysator.liu.se/index.php/Knuth).

!!! note "Läs mer om mig!"
    Om du undrar något specifikt om Leslie, läs [Leslie:s puppetmodul](https://git.lysator.liu.se/www/leslie)!

Härifrån serveras:

1. statiska sidor (genom `nginx`)
2. användarsidor (genom Roxen)
3. "legacy"-sidor (genom Roxen)

Alla förfrågningar möter först reverse-proxy:n (`nginx`), sen slussas den vidare. Flödet av pilar i diagrammet nedan visar hur en förfrågan kan bli löst.
<!-- https://excalidraw.com/#json=FgUCST401wW4875E3ga85,oezOFI25OVms1kep5g9I1w -->
![Blockdiagram över Leslie: NGINX tar emot förfrågningar och vidarebefordrar dem till Roxen, Roxen-innehåll eller statiskt innehåll](./leslie-blockdiagram.svg)

## [publisher](https://git.lysator.liu.se/www/leslie/-/tree/main/files/publisher)

Leslie lyssnar på nätverksanrop på `http://leslie.lysator.liu.se/publish/$PROJECT`, där `$PROJECT` är en av de som är definierade i [`projects.yaml`](https://git.lysator.liu.se/www/leslie/-/blob/main/files/publisher/projects.yaml).

När ett anrop för ett visst projekt görs, kommer repo:t för det projektet klonas, de givna byggkommandona köras, och till sist, det som finns i `public/` efter bygg, att publiceras till det angivna `www_root`.
