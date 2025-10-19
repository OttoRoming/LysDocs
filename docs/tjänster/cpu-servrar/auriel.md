## Auri-El
!!! warning

    Auri-El är under driftsättning!
    Förvänta dig ingen stabilitet innan driftsättning, omstarter kan ske när som helst.  
    Plannerad driftsättning: **fredag 2025-10-24**

Auri-El är en CPU-server.

### Diskar och monteringar
Auri-El monterar de vanliga Lysator mapparna (`/home`, `~/.public`, mail, `/lysator`).
Scratch finns tillgänglig både som ssd (`/scratch/ssd`, max 500GB) och hårddisk (`/scratch/hdd`, 4TB).
Var snäll mot `/scratch/ssd` (undvik att skriva jättemycket i onödan) och respektera andra användare på systemet.

### Anslutning till SSH
!!! abstract Kortfattat

    `ssh <namn>@auriel.lysator.liu.se`

Auri-El kör ssh på port 22 och har följande tumavtryck:
```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

256 SHA256:ymO4feTQOEtJVjunwDiAxNG5phFc9BVgljchmkoTIMQ auriel.lysator.liu.se (ECDSA)
3072 SHA256:LqwtNGcpj/BX4QQWqNaL5yQbVSesUcc0fD8mLeZmOfQ auriel.lysator.liu.se (RSA)
256 SHA256:jZo+w5bLtfSgxhqV4GFeWsTMH2461xXzibteBTIqTrE auriel.lysator.liu.se (ED25519)

-----BEGIN PGP SIGNATURE-----

iHUEARYKAB0WIQR0MUI9RZvpczlbzlXukfsRS97d2AUCaPVDbgAKCRDukfsRS97d
2PGMAP9HVybs3jRvuerTCffOZcELF9n4joLFoVHrPRBz+TT9bwEAnpcO7u8Dx51N
RvKrCvnF/93Epxc0TNkmJGB+QLWArgU=
=fo9c
-----END PGP SIGNATURE-----
```

### Anslut till fjärrskrivbord (RDP)
Av säkerhetsskäl exponerar inre Auri-El sin RDP-port (3389) utanför Lysators nät.
Det är därför nödvändigt att tunnla med ssh för att nå RDP.
Eftersom detta är en ganska vanlig konfiguration finns det inbyggt stöd 
för att tunnla genom ssh i vissa RDP-klienter bland annat Remmina.

#### Fönsterhanterare { #wm }
Fönsterhanterare väljs genom att ändra i filen `~/.xinitrc`.
Det kan vara smakfullt att ha något i stil med nedanstående i filen för att det ska gå att välja fönsterhanterare på vissa arbetsstationer.
```bash
if [ "$1" = "default" ] || [ "$1" = "" ]; then
    exec <vald fönsterhanterare> # Ersätt denna rad
fi
exec $1
```

Följande fönsterhanterare finns tillgängliga på Auri-El

| Namn         | Rad i `~/.xinitrc`  |
|--------------|-------------------  |
| xfce4        | `exec startxfce4`   |
| i3           | `exec i3`           |
| herbstluftwm | `exec herbstluftwm` |

#### Konfigurera Remmina { #remmina }
1. Sätt tangentbordslayout
    1. Gå till "Preferences" genom att trycka Ctrl-P eller genom att klicka på knappen med tre sträck i övre högra hörnet i huvudfönstret (det där anslutningar väljs).
    2. Klicka på RDP i menyn till vänster.
    3. Välj rätt "Keyboard Layout".
2. Skapa en ny profil genom att klicka på "+" i övre vänstra hörnet.
3. Sätt ett namn på profilen och välj "Protocol" till "RDP - Remote Desktop Protocol"
4. Konfigurera fliken "Basic"
    1. Sätt Server till "auriel.lysator.liu.se"
    2. (valfritt) sätt Username till ditt användarnamn på Lysator
5. (valfritt) Konfigurera fliken "Advanced":
    1. (valfritt) Ändra "Quality"
    2. (valfritt) Aktivera ljud genom att sätta "Audio output mode" till "Local"
6. Konfigurera fliken "SSH Tunnel"
    1. Tryck "Enable SSH tunnel"
    2. Välja "Tunnel via loopback address"
    3. (valfritt) Ändra "Authentication type"
    4. (valfritt) Sätt "Username" till ditt användarnamn på Lysator

#### Felsökning
##### Fönstret stängs direkt efter inloggning
1. Din `.xinitrc` kan vara felaktig eller så finns inte din valda fönsterhanterare på Auri-El, se [Fönsterhanterare](#wm)
2. Tidigare sessioner som var igång när rdp-tjänsten startades om kan ha blivit zombies, döda dem med `killall -u [användade] Xorg`

##### "User does not exist, or could not be authenticated"
Antaligen blir lösenordet fel. Kontrollera att tangentbordslayouten är rätt i RDP-klienten (se punkt 1 i [Konfigurera Remmina](#remmina)
och kontrollera att du kan ssh till Auri-El.


