 Introduktion till Podman
Podman är ett containerverktyg för att köra program i reproducerbara och
isolerade miljöer. Podman är (nästan) helt kompatibel med Docker och har
fördelen att den kan köras av vanliga användare, något Docker inte stödjer.

Podman gör det helt enkelt väligt smidigt att köra mjukvara även om den
har många beroenden eftersom utvecklaren kan skapa ett reproducerbar miljö
som innehåller allt en användare behöver för att köra mjukvaran.
`podman compose` verktyget kan också orkestrera flera containers samtidig
så en webapp med databas kan defineras i en fil.

Denna introduktion är bara ett smakprov för det man kan göra med Podman/Docker,
om du är såld kan man läsa mer på länkarna nedan efter du ha läst klart här.

 - [What is a container?](https://www.docker.com/resources/what-container/)
 - [Getting started with Docker](https://docs.docker.com/get-started/)
 - [Docker Docs](https://docs.docker.com/)
 - [Podman Docs](https://docs.podman.io/en/latest/)
 - [Podmans manual](https://manpages.debian.org/bullseye/podman/podman.1.en.html),
   läs på Shinobu med `man podman`

## Begreppförklaring
Dockerfilen kallas den definitionen som beskriver allt som en container behöver.
De kan byggas från grunden så binärer där binärer för ett kompilerat projekt 
kopieras över men de kan också baseras på existerande Dockerfiler. Det finns 
Dockerfiler bland annat för Debian, Alpine och Ubuntu som kan användas för
detta.

Imagen är det som byggs från en Dockerfil. De applicerar varje byggsteg i 
sekvens, det som kommer ut är det som man kan köra med Docker eller Podman
runtimen. Varje rad i en Dockerfil kallas för Layer - lager - vid byggen
cachas lagren. Om det senare sker en förändring i ett lager, det kan vara en
förändring i Dockerfilen eller filer som kopieras har förändrats, byggs
alla lager som kommer därefter om.

För att slipa skriva massa Dockerfiler själv och för att inte alla ska behöva
bygga alla images själv finns registries. De fungerar som i princip som
pakethanteraren för Docker på liknande sätt som `apt`, `pacman` mm. .
Utvecklarna publicerar och bygger Dockerfilen och det färdigbyggda imagen
kan sedan laddas ner. Den största är [docker.io](https://docker.io) men det
finns även [ghcr.io](https://ghcr.io), Githubs registry, och många fler.


## Första Containern
För att börja ska vi köra en webservern [Nginx](https://nginx.org/en/) för
att få en enkel hello world sida. Allt som står nedan ska du göra på
shinobu, det kommer inte att fungerar på samtliga andra machiner - de 
kör inte podman. På shinobu kör:

```bash
podman run docker.io/nginx
```

Det kommer att ladda new imagen `nginx` från docker.io och starta den. Du bör se
loggar som bara beskriver att nginx har startat upp. Enda problemet är att vi
inte kan komma åt sidan, vi måste exponera någon port på maskinen för det. För
att exponerar en port används flagan `--port extern:intern`, kort `-p`, där
 ***intern*** är den porten i containern som ska exponeras på den 
***externa*** porten på host machinen:

```bash
podman run --port 1234:80 docker.io/nginx
```

!!! tip
    Om du får ett error i stil med: `Failed to bind port 1234 (Address
    already in use)` betyder det porten du vill använda, 1234, redan används
    av någon annan. Byt då ut den ***externa*** porten mot ett annat tal
    över 1024.

Om du nu besöker [shinobu.lysator.liu.se:1234](http://shinobu.lysator.liu.se:1234/)
i din webbläsare bör du bli bemöt av en sida där det stå **Welcome to Nginx**,
snyggt! 

Som du ser gör podman det lätt att köra mjukvara. Det är dock inte smidigt än,
om du stänger din avslutning till shinobu eller vill göra något annat går det
inte riktig. `--detach` flaggan, kort `-d`, säger att podman ska köra containern
som en daemon, en bakgrundstjänst. Den starta och sedan fortsätter den att köra
i bakgrunden. Vi använder `--name` för att ge containern vi starta ett namn och
slänger på `--replace` för att bytta ut eventuella andra containers med samma
namn som du tidigare har startat. 

```bash
kindergarten@shinobu:~$ podman run -p 1234:80 -d --replace --name hello_world docker.io/nginx
585ae643edcbe6a193901642e0fb2380ec6410b24de43635a124cee6862c6afc
```
Komandot ger tillbaka ett unik id som den har gett din container. För att
vissa alla containers som kör just nu används `podman ps`.

```bash
kindergarten@shinobu:~$ podman ps
CONTAINER ID  IMAGE                                         COMMAND               CREATED         STATUS         PORTS                                      NAMES
585ae643edcb  docker.io/library/nginx:latest                nginx -g daemon o...  58 seconds ago  Up 58 seconds  0.0.0.0:1234->80/tcp                       hello_world
```

Vi kan läsa containerns loggar med `podman logs [id¦name]` där vi ger namnet
som vi har tilldelat eller containers unika id. Man behöver inte ange det fulla
ID men det räcker att ta den avkortade som vissas av `podman ps`.

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

Det finns också de ganska självförklarande kommandon `podman start`, `podman
stop` `podman restart` som liksom `podman logs` kräver ett id eller namn av
containern. Om du vill ta bort en container använder du `podman rm -f [id|namn]`
där flaggan `-f` - kort för `--force` - specificerar att containern ska tas bort
även om den är igång, utan denna flagga behöver man köra `podman stop` först.

Nu kan vi starta och kontrollera en container men den trågiga **Welcome to
NGINX** har inte blivit finare. För att ändra på det behöver vi passera in
våran egna filer för Nginx att servera. 
[Dokumentationen för Nginx imagen](https://hub.docker.com/_/nginx/) säger att
webrooten ligger under `/usr/share/nginx/html`, där måste vi placera våra filer
i containern för att Nginx ska kunna läsa de. Det smidigaste sättet att göra det
är att montera filer från hostmachinen i containern.

 Vi börjar med att skapa det nya sidinnehållet. När du för första gången loggade
 in på shinobu för skapades mappen `/podman/users/<nick>` åt dig, där kan du lägga
alla konfigurationsfiler samt filer dina containers behöver för att köra. Vi
skapar en ny mapp `hello-world´ med en submap `html` där, som innehåller filen
`index.html` som innehåller en mycket finare sida.

```bash
mkdir -p "/podman/users/$USER/hello-world/html" # skapa mapparna
echo "En mycket finare hello world." > "/podman/users/$USER/hello-world/html/index.html" # skriv texten i första kommandot till filen index.html
tree "/podman/users/$USER/hello-world" # printa ut trädstrukturen av mapparna vi skapade
```

För att montera en fil eller mapp i en container används flaggan `--volume
extern:intern`, kort `-v`. ***extern*** är sökvägen till filen på
maskinen, ***intern*** är vars den mappen eller filen ska monteras i containern.
`

```bash
podman run -p 1234:80 -d --replace --name hello_world -v "/podman/users/$USER/hello-world/html:/usr/share/nginx/html" docker.io/nginx
```

Om du åter besöker
[shinobu.lysator.liu.se:1234](http://shinobu.lysator.liu.se:1234/) ser du nu
texten av filen som finns i index.html. Om du skulle exempelvis skapa filen
`passwords.txt` skulle dess innehåll presenteras på
[shinobu.lysator.liu.se:1234/passwords.txt](http://shinobu.lysator.liu.se:1234/passwords.txt).
Man skulle på samma sätt även kunna passera Nginx en skräddarsyddat
konfigurationsfil för att förändra hur den beter sig. En genomgång av Nginx är
utanför ramen av denna korta introduktion, kontakta kindergarten@lysator...
eller fråga runt i ~ om du vill veta mer om det.

## Intro till Podman Compose
Podman Compose används för att definera multicontainer deployments av
applikationer som behöver flera containers. Under luven är Podman Compose
bara en wrapper runt de andra podman kommandon. Men nu istället för att
 själv behöver hantera flera containers kan de hanteras som en enhet. Den
är kompatibel med Docker Compose. Konfigurationsfilerna använder sig av yaml
och har oftast namnet `docker-compose.yaml` men ibland heter även
`docker-compose.yml`, `compose.yaml` eller `compose.yml`.

Kommandon `podman compose up`, `podman compose down` starta respektiv stoppa
alla containers i `docker-compose.yaml`. `podman compose logs` och `podman
compose ps` listar statusen av containers definerade i `docker-compose.yaml`.

!!! bug "Docker compose kompabilitetslager"
    Om du kör `podman compose` används `docker compose` verktyget
    men den pekas på en docker kompatibel podman tjänst som starta och
    kontrollera alla containers. Man slår på den tjänsten för sin användare
    med `systemctl --user enable --now podman.socket`.

Vi kan defininera våran nginx hello-world applikation med hjälp av Podman
Compose som nedan:

```bash
cat 
kindergarten@shinobu:~$ cat /podman/users/kindergarten/hello-world/docker-compose.yaml
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

Det är troligvis förhoppningsvis inget överraskande i vad varje rad definerar.
Fältet `restart` är något som vi inte har sett innan. Den deklarerar att om 
Nginx skulle crasha de ska den startas på nytt, bara om vi stoppa den ska den
sluta köra. Det finns några andra värden för `restart` men `unless-stopped` är
den vanligaste.

För att starta appliationen med compose kör man:

```bash
cd "/podman/users/$USER/hello-world/"
podman compose up -d
```

Vi kan se hur det går med `podman compose ps`:
```bash
kindergarten@shinobu:/podman/users/kindergarten/hello-world$ podman compose ps
NAME          IMAGE                            COMMAND                  SERVICE       CREATED         STATUS         PORTS
hello_world   docker.io/library/nginx:latest   "nginx -g daemon off;"   hello_world   7 seconds ago   Up 7 seconds   80/tcp
```

Vi kan kolla på loggarna med `podman compose logs`, stoppar våra containers med
`podman compose stop` och starta de igen med `podman compose start`. För att ta
bort de kör `podman compose down`.

Nu har vi fattat grunderna för hur Podman Compose fungerar. Hur YAML strukturen
exakt ser ut lär man sig efter ett tag. Det lättaste här är att bara kopiera en
`docker-compose.yaml` man redan ha och anpassa den till det man vill ha. Annars
är [officella dokumenationen](https://docs.docker.com/compose/) också bra.

För att vissa en podman compose med flera containers ska vi ändra lite på Nginx's
roll. Nginx kommer fortfahrande servera filerna i `html` mappen, men när ett
anropp sker till `/api/` så leder vi vidare förfrågan till en annan container,
[`http-echo`](https://github.com/hashicorp/http-echo) ger tillbaka en sträng av
som vi definerar.
För det behöver våran Nginx konfiguration samt innehållet i våran index sida
modifieras. I `hello-world` mappen skapa en fil `nginx.conf` med innehållet:

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

Den säger att Nginx ska lyssna på port 80, och fortsatt serverar våra filer.
Om en förfråga kommer däremot till `/api` routen ska den skickas viddare till
`http_echo:8080` som är våran andra container, `http_echo` till port 8080.

Modifiera även `index.html` filen som vi skapade i `html` mappen:
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

Våran nya `docker-compose.yaml` ska nu se ut som följande:
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

I den nya compose filen defineras nu både våran Nginx men också en till
container, `http_echo`. Vi säger även att våran Nginx container, `hello_world`,
beror på den andra containern `http_echo` så att den startas först. Notera att
`http_echo` inte exponerar någon port utåt, den ska inte nås från utifrån det är
bara Nginx som ska få prata med den. För att Nginx ska kunna göra det skapar vi
ett nätverk som vi kallar `app` där våra containers kan prata fritt. `command`
sektionen för echo servern definerar helt enkelt vilka flaggor echo servern ska
startas med, vi vill att den ska lyssna på port 8080 och ska ge tillbaka
textsträngen definerad.

Ett besök tillbaka till
[shinobu.lysator.liu.se:1234/](http://shinobu.lysator.liu.se:1234/) visar våran
fina sida. Om man trycker på knappen skickas en förfråga till våran API genom
Nginx och vi svaret skrivs ut på skärmen. I loggarna ser vi även hur
förfrågningen når våran API genom Nginx:

```text
api-1          | 2069/08/13 22:46:11 api:8080 130.236.254.20:55834 "GET / HTTP/1.1" 200 30 "Firefox" 88.773µs
hello_world-1  | 130.136.254.20 - - [13/Aug/2069:22:46:11 +0000] "GET /api/ HTTP/1.1" 200 30 "http://shinobu.lysator.liu.se:1234/" "Firefox" "-"
```

Exemplet vissar de vanligaste features man använder och du bör nu ha verktygen
för att förstå vad som händer. Compose har några andra ass i ärmeln som
underlättar livet, du får konsultera dokumentationen för det:

 - [Hur man använder enviroment variabler för att spara secrets](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/)
 - [Health Checks](https://docs.docker.com/compose/how-tos/startup-order/)
 - [Flera docker-compose.yaml filer](https://docs.docker.com/compose/how-tos/multiple-compose-files/)
 - [Pre-start och Pre-stop hooks](https://docs.docker.com/compose/how-tos/lifecycle/)

