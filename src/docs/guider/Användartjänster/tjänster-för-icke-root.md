Vill du kunna ha långtidskörande bakgrundprocesser på ett smidigt och pålitligt sätt? Har du fram tills nu kanske kört på en `tmux`/`screen`-session och behövt starta upp den manuellt, de få gånger Lysator har haft nedtid?

Här kommer en bättre lösning: skapa en `systemd`-tjänst.

Du kanske tänker "det inte är möjligt, jag är inte root", men sanningen är att man kan använda nästan alla funktioner av `systemd` som vanlig dödlig användare, bara man lägger konfigurationen för tjänsten på rätt ställe, och tillägger flaggan `--user` i alla `systemctl`-kommandon.

## Exempel på användartjänsts enhetssfil

`~/.config/systemd/user/<TJÄNSTNAMN>.service`
```systemd
[Unit]
Description=g06 backend
After=network.target
ConditionHost=totoro.lysator.liu.se #VIKTIGT

[Service]
ExecStart=%h/Git/mockup-web-interface/backend/main.py
Restart=always
RestartSec=1

[Install]
WantedBy=default.target
```

!!! danger "Använd `ConditionHost`!"
    Om du inte anger vilken maskin som tjänsten ska köras på kommer den startas på alla maskiner där din hemkatalog monteras, vilket är väldigt dåligt! 

    `ConditionHost` är en parameter som anges under `[Unit]`, och kommer försöka matcha maskinens värdnamn. Om det inte stämmer kommer tjänsten inte att starta.

    Exempel:
    ```systemd
    ConditionHost=totoro.lysator.liu.se
    ```

Detta ser precis ut som en vanlig systemtjänst. Enda skillnaden är kanske `%h`. Detta är en specifierare som kommer omvandlas till användarens hemkatalog. [Det finns en hel del sådana.](https://man.archlinux.org/man/systemd.unit.5#SPECIFIERS)

Läs mer detaljerat om att skapa `systemd` user-unit:s på Arch Wiki: <https://wiki.archlinux.org/title/Systemd/User>

