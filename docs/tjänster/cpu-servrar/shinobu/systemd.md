# Autostarta Podman Compose
För att slippa starta tjänsten varje gång machinen startar om kan man använda
sig av [systemds användartjänster](../systemd-för-användare.md). Läs den guiden
först för att få en god introduktion till hur användartjänster fungerar.

Systemd använder så kallade 
[_template unit filer_](https://fedoramagazine.org/systemd-template-unit-files/)
som agerar som mallar när man vill programmatiskt generera tjänster.

Kopiera följande till `~/.config/systemd/user/podman@.service`:

```systemd
[Unit]
Description=%i rootless pod (podman-compose)
# VIKTIGT: Detta gör att tjänsten enbart startar på shinobu.
ConditionHost=shinobu.lysator.liu.se
RequiresMountsFor=/podman
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/podman/users/%u/%i
EnvironmentFile=-/podman/users/%u/%i/.env

# Autohämta paket och updatera vår pod till containers med de nyaste images.
ExecStartPre=/usr/bin/podman-compose pull
ExecStartPre=/usr/bin/podman-compose up --force-recreate --no-start

# Starta poden och vänta medans den är på.
ExecStartPre=/usr/bin/podman pod start pod_%i
ExecStart=/usr/bin/podman-compose wait
ExecStop=/usr/bin/podman pod stop pod_%i

[Install]
WantedBy=default.target
```

Tjänsten definerar en systemd-tjänst för varje mapp som finns i
`/podman/users/<nick>`. Den tjänsten bygger alla containers som defineras i
`docker-compose.yaml` till en pod startart den. Innan den bygger hämtar den även
nyaste versionen av alla images som används så att mjukvaran hålls uppdaterad.

För att kunna använda tjänsten behöver man först be systemd att ladda in
förändringar. Man bör också sätta på linger så att tjänster kör även när man
inte är inloggad.

```bash
systemctl --user daemon-reload
loginctl enable-linger "$USER"
```

För att sätta på automatstartning av `hello-world` poden från
[Introduktionen till podman](./introduktion.md) måste man då köra:
```bash
systemctl --user enable --now podman@hello-world.service
```
