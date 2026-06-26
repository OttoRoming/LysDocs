---
title: Management Nätet
---
# Management Nätet
Detta nät finns för att kunna administrera datorer, servrar, switchar, routrar och annan nätansluten utrustning.

Rötter kommer åt nätet via orwell.

## IP-rymd
Management-nätets ip-rymd är `172.16.0.0/16`. Ip-adresserna är uppdelade så att näst sista oktetten anger ändamål för ip-adressen och den sista oktetten speglar den sista oktetten i den managerade enhetens "riktiga" ip-adress.

| näst sista oktett | Användning                                                                           |
|-------------------|--------------------------------------------------------------------------------------|
| 163               | PDU:er										   |
| 237	            | Conina                                                                               |
| 249               | Management Switchar								   |
| 250               | Switchar 										   |
| 254               | Datorer med "vanlig ip" (sista oktetten är samma som vanliga)			   |
| 255               | Mycket temporär använding                                                            |

## Kort om access till Management Nätet och Orwell
Rötter har tillgång till management-nätet via Orwell.

Orwell agerar gateway för management nätet.

Orwell kör diverse tjänster som övervakar och sammlar data från enheter som är anslutna till management-nätet.
