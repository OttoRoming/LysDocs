# Autostarta Podman Compose
För att slippa starta tjänsten varje gång machinen starta om kan man använda sig
av [user systemd tjänster](../systemd-för-användare.md). Systemd har så kallade 
[unit filer](https://fedoramagazine.org/systemd-template-unit-files/) som
templata flera systemd tjänster.

Kopierar följande till `~/.config/systemd/user/podman@.service`:

```systemd
[Unit]
Description=%i rootless pod (podman-compose)
ConditionHost=shinobu.lysator.liu.se
RequiresMountsFor=/podman
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/podman/users/%u/%i
EnvironmentFile=-/podman/users/%u/%i/.env

# Autohämta paket och updatera våran pod till containers
# med de nyaste images. 
ExecStartPre=/usr/bin/podman-compose pull
ExecStartPre=/usr/bin/podman-compose up --force-recreate --no-start

# starta poden och vänta medans den är på.
ExecStartPre=/usr/bin/podman pod start pod_%i
ExecStart=/usr/bin/podman-compose wait
ExecStop=/usr/bin/podman pod stop pod_%i

[Install]
WantedBy=default.target
```

Tjänsten definerar en systemd tjänst för varje mapp i som finns i
`/podman/users/<nick>`. Den tjänsten starta först bygger alla containers
i definerad i `docker-compose.yaml` till en pod och sedan starta den. Innan
den bygger hämtar den även nyaste versionen av alla images som används så
att mjukvaran hålls uppdaterad.

För att kunna använda tjänsten behöver man först berätta till systemd att
ladda in förändringar. Man bör också sätta på linger så att tjänster kör
även när man inte är inloggad.

```bash
systemctl --user daemon-reload
loginctl enable-linger "$USER"
```

För att sätta på automatstartning av `hello-world` poden från [Introduktionen till
podman](./introduktion.md) måste man då köra:

```bash
systemctl --user enable --now podman@hello-world.service
```

