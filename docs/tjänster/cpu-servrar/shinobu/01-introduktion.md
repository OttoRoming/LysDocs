# Introduktion till Podman

[Podman](https://podman.io) är ett containerverktyg för att köra program i
reproducerbara och isolerade miljöer. Podman är (nästan) helt kompatibel med
Docker och har fördelen att den kan köras av vanliga användare, något Docker
vanligtvis inte stödjer.

Podman gör det helt enkelt väligt smidigt att köra mjukvara även om den
har många beroenden. Utvecklaren kan skapa ett reproducerbar miljö
som innehåller allt en användare behöver för att köra mjukvaran.
`podman compose`-verktyget kan också orkestrera flera containers samtidigt,
så en webapp med databas kan defineras i en fil.

Denna introduktion är bara ett smakprov för det man kan göra med Podman/Docker,
om du är såld kan man läsa mer i länkarna nedan efter du ha läst klart här.

 - [What is a container?](https://www.docker.com/resources/what-container)
 - [Getting started with Docker](https://docs.docker.com/get-started)
 - [Docker Docs](https://docs.docker.com)
 - [Podman Docs](https://docs.podman.io/en/latest)
 - [Podmans manual](https://manpages.debian.org/bullseye/podman/podman.1.en.html),
   läs på Shinobu med `man podman`

## Begreppförklaring
_Dockerfilen_ kallas den definition som beskriver alla steg som behövs för att
bygga en container. Containers kan byggas från grunden så att alla binärer för
ett kompilerat projekt kopieras över, men de kan också baseras på existerande
Dockerfiler. Det finns klara Dockerfiler bland annat för Debian, Alpine och
Ubuntu som kan användas för detta.

En _Image_ är det som byggs från en Dockerfil. Programmet applicerar varje
byggsteg i  sekvens, och det som kommer ut är det som man kan köra med Docker
eller Podman runtimen. Varje rad i en Dockerfil kallas för _Layer_ - lager. Vid
byggen cachas lagren. Om det senare sker en förändring i ett lager, vilket kan
innebära en förändring i Dockerfilen eller de filer som kopieras, byggs alla
efterföljande lager om.

För att slippa skriva massa Dockerfiler själv, och för att inte alla ska
behöva bygga alla images själva, finns _Registries_. De fungerar i princip som
repositorier för Docker på liknande sätt som `apt` eller `pacman`. Utvecklarna
publicerar och bygger Dockerfilen, och det färdigbyggda imagen kan sedan laddas
ner. Den största registryn är [docker.io](https://docker.io), men det finns även
[ghcr.io](https://ghcr.io), Githubs registry, och många fler.

## Första Containern
För att börja ska vi köra en instans webservern [Nginx](https://nginx.org/en)
för att få en enkel hello world sida. Allt som står nedan ska du göra på
shinobu, det kommer inte att fungerar på samtliga andra machiner - de kör inte
podman. På shinobu kör:

```bash
podman run docker.io/nginx
```

Det kommer att ladda new imagen `nginx` från docker.io och starta den. Du bör se
loggar som bara beskriver att nginx har startat upp. Enda problemet är att vi
inte kan komma åt sidan, vi måste exponera någon port på maskinen för det. För
att exponerar en port används flagan `--port extern:intern`, kort `-p`, där
`intern` är den porten i containern som ska exponeras på den `extern`-porten
på hostmachinen:

```bash
podman run --port 1234:80 docker.io/nginx
```

!!! tip
    Om du får ett error i stil med: `Failed to bind port 1234 (Address
    already in use)` betyder det porten du vill använda, 1234, redan används
    av någon annan. Byt då ut den `extern`-porten mot ett annat tal
    över 1024.

Om du nu besöker [shinobu.lysator.liu.se:1234](http://shinobu.lysator.liu.se:1234/)
i din webbläsare bör du bemötas av en sida där det stå **Welcome to Nginx**,
snyggt! 

Som du ser gör podman det lätt att köra mjukvara. Det är dock inte smidigt än,
om du stänger din anslutning till shinobu eller vill göra något annat kommer
containern att stängas ner. `--detach` flaggan, kort `-d`, får podman att
köra containern som en daemon, en bakgrundstjänst. Containern startas kör i
bakgrunden. Vi använder `--name` för att ge vår container ett namn. Slutligen
slänger vi på `--replace` för att byta ut eventuella andra containers med samma
namn som vi tidigare startat.

```bash
user@shinobu:~$ podman run \
  -p 1234:80 \
  -d \
  --replace \
  --name hello_world \
  docker.io/nginx

585ae643edcbe6a193901642e0fb2380ec6410b24de43635a124cee6862c6afc
```
Komandot ger tillbaka ett unikt id som podman har gett din container. För att
visa alla containers som kör just nu används `podman ps`.

```
user@shinobu:~$ podman ps
CONTAINER ID  IMAGE                           COMMAND               CREATED         STATUS         PORTS                NAMES
585ae643edcb  docker.io/library/nginx:latest  nginx -g daemon o...  58 seconds ago  Up 58 seconds  0.0.0.0:1234->80/tcp hello_world
```

Vi kan läsa containerns loggar med `podman logs [id|name]`, där vi ger namnet
som vi har tilldelat eller containers unika id. Man behöver inte ange det fulla
ID:t; det räcker att ta den avkortade som vissas av `podman ps`.

```bash
podman logs hello_world
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Configuration complete; ready for start up
2026/08/13 19:49:16 [notice] 1#1: nginx/1.31.3
2026/08/13 19:49:16 [notice] 1#1: built by gcc 14.2.0 (Debian 14.2.0-19) 
2026/08/13 19:49:16 [notice] 1#1: OS: Linux 6.12.101+deb13-amd64
2026/08/13 19:49:16 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 524288:524288
2026/08/13 19:49:16 [notice] 1#1: start worker processes
...
2026/08/13 19:49:16 [notice] 1#1: start worker process 71
```

Det finns också de ganska självförklarande kommandona `podman start`, `podman
stop` `podman restart` som, liksom `podman logs`, kräver ett id eller namn av
containern. Om du vill ta bort en container använder du `podman rm -f [id|namn]`
där flaggan `-f` - kort för `--force` - specificerar att containern ska tas bort
även om den är igång. Utan denna flagga behöver man köra `podman stop` först.

Nu kan vi starta och kontrollera en container men vår tråkiga **Welcome to
NGINX** har inte blivit finare. För att ändra på det behöver vi passera in
våra egna filer för Nginx att servera. 

[Dokumentationen för Nginx imagen](https://hub.docker.com/_/nginx/) säger att
webrooten ligger under `/usr/share/nginx/html`. Där måste vi placera våra filer
i containern för att Nginx ska kunna läsa dem. Det smidigaste sättet att göra
det är att montera filer från hostmachinen i containern.

Vi börjar med att skapa det nya sidinnehållet. När du för första gången loggade
in på shinobu skapades mappen `/podman/users/<nick>` åt dig. Där kan du lägga
alla konfigurationsfiler samt filer dina containers behöver för att köra. Vi
skapar en ny mapp, `hello-world`, med en submapp `html`. Där placerar vi filen
`index.html`, som innehåller en mycket finare sida.

```bash
# skapa mapparna
mkdir -p "/podman/users/$USER/hello-world/html"
# skriv texten i första kommandot till filen index.html
echo "En mycket finare hello world." > "/podman/users/$USER/hello-world/html/index.html"
# printa ut trädstrukturen av mapparna vi skapade
tree "/podman/users/$USER/hello-world"
```

För att montera en fil eller mapp i en container används flaggan `--volume
extern:intern`, kort `-v`. `extern`är sökvägen till filen på
maskinen, `intern` är var den mappen eller filen ska monteras i containern.


```bash
podman run \
  -p 1234:80 \
  -d \
  --replace \
  --name hello_world \
  -v "/podman/users/$USER/hello-world/html:/usr/share/nginx/html" \
  docker.io/nginx
```

Om du åter besöker
[shinobu.lysator.liu.se:1234](http://shinobu.lysator.liu.se:1234/)
ser du nu texten av filen som finns i index.html. Om du exempelvis
skapar filen `passwords.txt`, skulle dess innehåll presenteras på
[shinobu.lysator.liu.se:1234/passwords.txt](http://shinobu.lysator.liu.se:1234/passwords.txt).
Man skulle på samma sätt även kunna passera Nginx en skräddarsydd
konfigurationsfil för att justera dess beteende. En genomgång
av Nginx är utanför ramen av denna korta introduktion, kontakta
[kindergarten](mailto:kindergarten@lysator.liu.se) eller fråga runt i `~` om du
vill veta mer om det.

## Intro till Podman Compose
Podman Compose används för att definera multicontainer deployments av
applikationer som behöver flera containers. Under luven är Podman Compose
bara en wrapper runt existerande podman-kommandon. Istället för att själv
behöva hantera flera containers kan de enkelt hanteras som en enhet. Podman
Compose är kompatibel med Docker Compose. Konfigurationsfilerna använder sig
av yaml och har oftast namnet `docker-compose.yaml`, men kan ibland även heta
`docker-compose.yml`, `compose.yaml` eller `compose.yml`.

Kommandon `podman compose up`, `podman compose down` startar respektive stoppar
alla containers definierade i `docker-compose.yaml`. `podman compose logs` och
`podman compose ps` listar statusen av containers definerade i
`docker-compose.yaml`.

!!! bug "Docker compose kompabilitetslager"
    Om du kör `podman compose` används `docker compose`-verktyget
    men den pekas på en docker-kompatibel podman-tjänst som startar och
    kontrollerar alla containers. Man slår på den tjänsten för sin användare
    med `systemctl --user enable --now podman.socket`.

Vi kan defininera vår nginx hello-world-applikation med hjälp av Podman
Compose. Skapa först vår yaml-fil:
```bash
touch /podman/users/$USER/hello-world/docker-compose.yaml
```
Redigera den därefter till följande innehåll:
```yaml
services:
  hello_world:
    image: docker.io/nginx
    container_name: hello_world
    ports:
      - "1234:80"
    volumes:
      - "/podman/users/${USER}/hello-world/html:/usr/share/nginx/html"
    restart: unless-stopped
```

Det är förhoppningsvis inget överraskande i vad varje rad definerar. Fältet
`restart` är något som vi inte har sett innan. Fältet deklarerar att tjänsten
automatiskt ska startas om ifall den crashar. Nginx ska enbart sluta köra
om vi manuellt stoppar den. Det finns några andra värden för `restart` men
`unless-stopped` är det vanligaste.

För att starta appliationen med compose kör man:
```bash
cd "/podman/users/$USER/hello-world/"
podman compose up -d
```

Vi kan se hur det går med `podman compose ps` (kört från tjänstens katalog):
```bash
user@shinobu:/podman/users/$USER/hello-world$ podman compose ps
NAME         IMAGE                           COMMAND                 SERVICE      CREATED        STATUS        PORTS
hello_world  docker.io/library/nginx:latest  "nginx -g daemon off;"  hello_world  7 seconds ago  Up 7 seconds  80/tcp
```

Vi kan kolla på loggarna med `podman compose logs`, stoppa våra containers med
`podman compose stop` och starta de igen med `podman compose start`. För att ta
bort dem, kör `podman compose down`.

Nu har vi fattat grunderna för hur Podman Compose fungerar. Hur YAML strukturen
exakt ser ut lär man sig efter ett tag. Det lättaste här är att bara kopiera en
existerande `docker-compose.yaml` och anpassa den till det man vill ha. Annars
är [officella dokumenationen](https://docs.docker.com/compose/) också bra.

För att visa en podman compose med flera containers ska vi ändra lite på Nginx
roll. Nginx kommer fortfarande servera filerna i `html` mappen, men när ett
anrop sker till `/api/` så leder vi vidare förfrågan till en annan container,
[`http-echo`](https://github.com/hashicorp/http-echo), som ger svarar med en
sträng som vi definerar.

För det behöver vår Nginx-konfiguration samt innehållet i våran index-sida
modifieras. I `hello-world`-mappen, skapa en fil `nginx.conf` med innehållet:

```nginx
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /api/ {
        proxy_pass http://http_echo:8080/;
    }
}
```

Den säger att Nginx ska lyssna på port 80, och fortsatt servera våra filer.
Om en förfråga istället kommer till `/api` ska den skickas vidare till
`http_echo:8080`, som är vår andra container.

Modifiera även `index.html` som vi skapade i `html` mappen:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Compose Demo</title>
</head>
<body>
    <h1>Hello from nginx!</h1>

    <button onclick="callApi()">Call API</button>

    <pre id="result"></pre>

    <script>
        async function callApi() {
            const response = await fetch("/api/");
            document.getElementById("result").textContent =
                await response.text();
        }
    </script>
</body>
</html>
```

Vår `docker-compose.yaml` ska nu skrivas om till följande:
```yaml
services:
  hello_world:
    image: docker.io/nginx:latest
    ports:
      - "1234:80"
    volumes:
      - "/podman/users/${USER}/hello-world/html:/usr/share/nginx/html:ro"
      - "/podman/users/${USER}/hello-world/nginx.conf:/etc/nginx/conf.d/default.conf:ro"

    depends_on:
      - http_echo
    networks:
      - app

  http_echo:
    image: docker.io/hashicorp/http-echo:latest
    command:
      - "-text=Hello from the API container!"
      - "-listen=:8080"
    networks:
      - app

networks:
  app:
```

I den nya compose-filen defineras nu både vår Nginx, men också en till
container: `http_echo`. Vi skriver även att vår Nginx container, `hello_world`,
beror på den andra containern. `http_echo` startas då först. Notera att
`http_echo` inte exponerar någon port utåt, den ska inte nås utifrån. Det
är bara Nginx som ska få prata med den. För att Nginx ska kunna göra det
skapar vi ett nätverk vi kallar `app` där våra containers kan prata fritt.
`command`-sektionen för echo servern definerar helt enkelt vilka flaggor echo
servern ska startas med, vi vill att den ska lyssna på port 8080 och ge tillbaka
textsträngen vi definierat.

Ett besök tillbaka till
[shinobu.lysator.liu.se:1234/](http://shinobu.lysator.liu.se:1234/) visar vår
fina sida. Om man trycker på knappen skickas en förfråga till vår API genom
Nginx, och svaret skrivs ut på skärmen. I loggarna ser vi även hur förfrågningen
når vår API genom Nginx:

```
api-1          | 2069/08/13 22:46:11 api:8080 130.236.254.20:55834 "GET / HTTP/1.1" 200 30 "Firefox" 88.773µs
hello_world-1  | 130.136.254.20 - - [13/Aug/2069:22:46:11 +0000] "GET /api/ HTTP/1.1" 200 30 "http://shinobu.lysator.liu.se:1234/" "Firefox" "-"
```

Exemplet vissar de vanligaste funktioner man använder och du bör nu ha verktygen
för att förstå vad som händer. Compose har mycket mer funktioner som kan
underlätta livet, men du får läsa dokumentationen för det:

 - [Hur man använder enviroment variabler för att spara secrets](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/)
 - [Health Checks](https://docs.docker.com/compose/how-tos/startup-order/)
 - [Flera docker-compose.yaml filer](https://docs.docker.com/compose/how-tos/multiple-compose-files/)
 - [Pre-start och Pre-stop hooks](https://docs.docker.com/compose/how-tos/lifecycle/)



!!! tip "Be rootgruppen köra allmännyttiga tjänster!"
    Om du kör en tjänst som du tror flera lysiter kan ta nytta av, meddela
    gärna rootgruppen [här](mailto:root@lysator.liu.se). Vi har förmodligen
    möjligheten att starta upp en global instans för alla, inkopplat till
    Lysators andra användartjänster.

    Om du redan har en fungerande `docker-compose.yml` så är 90% av jobbet
    redan gjort för oss! :)   
