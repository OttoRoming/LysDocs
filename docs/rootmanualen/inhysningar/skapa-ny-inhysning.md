---
weight: -10
---

## Innan du bjuder in kontaktpersonen

Du behöver ha gjort följande:

1. Sett till de accepterar [Regler för inhysningar](https://www.lysator.liu.se/inhysningar/#regler-for-inhysningar-v-1-0-1).

2. Hittat en ledig IP-adress i `130.236.254.0/24` och [skapat DNS-poster](../dns/lysators-namnserver.md) för inhysningens maskin. Enklast är att logga in på `ns` och leta i `/lysator/etc/dns/db/lysator/254.zone` efter lediga.

3. Skapat en [ny virtuell maskin](../proxmox/virtuella-maskiner.md) för inhysningen.

4. Konfigurerat statisk IPV

4. Sett till att `lysroot`-användaren finns och har fått lösenord som genererats med `pass generate -n <passrepot>`.

5. Dokumenterat följande:
    - Kontaktinformation till kontaktperson ska läggas i **roots passrepo.**
    - `lysroot`:s lösenord ska läggas i **roots passrepo.**
    - Skapa en sida om inhysningen på **datorhandboken**:
        1. [Logga in](https://datorhandbok.lysator.liu.se/index.php?title=Special:Inloggning&returnto=Special%3AS%C3%B6k&returntoquery=search%3Dgsdaf%26profile%3Ddefault%26fulltext%3D1).
        2. Sök efter den (icke-existerande) inhysningen.
        3. Tryck på den röda länken för att skapa sidan. Sidan ska innehålla något i stil med:
        ```mediawiki
        Maskinen heter **NAMN I KLUSTRET**

        {| style="border: 0px"
        ! Funktion
        |  Inhysning **INHYSNINGENS NAMN**
        |-
        ! Operativsystem
        | [[:Kategori:Debian 12 | Debian 12]]
        |-
        ! Arkitektur
        | x86-64
        |-
        ! valign="top" | SSH-fingeravtryck
        | <pre>$ ls /etc/ssh/ssh_host*.pub | xargs -n1 ssh-keygen -lf
        **OUTPUT AV KOMMANDO**
        </pre>
        |-
        ! Placering
        | Milliways 
        |-
        ! Ansvarig root
        | **DU**
        |-
        ! Kontaktperson
        | Läs i roots passrepo!
        |-
        ! Driftstatus
        | I drift
        |-

        [[Kategori:Inhysningar]]
        [[Kategori:Debian 12]]
        [[Kategori:Maskiner i drift]]
        [[Kategori:Virtuella servrar]]
        [[Kategori:Proxmox]]
        ```

## När kontaktperson är på plats

1. Se till att kontaktpersonen är/blir medlem i Lysator.

2. Skapa en användare (med sudo:er-rättigheter) på VM:en för kontaktpersonen.

3. Färdigt! Föreslå att de pekar sin domän med `CNAME` på maskinens domännamn.
