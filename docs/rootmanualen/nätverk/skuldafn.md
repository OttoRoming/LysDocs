---
title: Skuldafn
---
# Skuldafn
Skuldafn är ett subnät för enheter som inte behöver en publik ip-address (t.e.x. noderna i Conina).

## IP-rymd
Skuldafn använder `10.10.0.0/16` som subnät. Ip-adresserna är uppdelade så att näst sista oktetten anger ändamål för ip-adressen.

| Oktett | Användning                                                                           |
|--------|--------------------------------------------------------------------------------------|
| 237    | Conina                                                                               |
| 254    | Maskiner som har både skuldafn och "vanlig ip" (sista oktetten är samma som vanliga) |
| 255    | Mycket temporär använding                                                            | 

## Wireguard
För att förenkla administering finns en wireguard server tillgänglig för root-gruppen på skuldafn för att kunna nå subnätet utifrån.

1. Plugga fysiskt in din laptop i switchen markerad `sovngarde`
2. Ge dig själv en address på 10.10.0.0/16 nätet med näst sista oktetten 255.
3. Öppna webbläsare och gå till 10.10.1.1 och logga in med användarnamn `root`samt lösenord för `skuldafn` i pass-repo
4. Klicka dig fram: VPN -> Wireguard -> Peer Generator
5. Fyll i fälten som följande
        1. Endpoint: `130.236.254.49:51951`
        2. Generera en ny preshared key
        3. Allowed IPs: `10.10.0.0/16, 10.11.1.0/24, 10.11.2.0/24, 192.168.42.0/24, 172.24.42.0/29`
        4. keepalive: `<leave blank>`
        5. dns: `<leave blank>`
6. Kopiera den resulterande wireguard konfigurationen och placera den under `/etc/wireguard` på din laptop.
7. Klicka på "store and generate next"
8. Kolla under fliken "peers" att din wireguardprofil är skapad.
9. Starta om wireguard tjänsten (genom att sätta wireguard inststansen Management till disabled sedan enabled)
9. Testa wireguard anslutningen med `wg-quick up <profile_name>`

