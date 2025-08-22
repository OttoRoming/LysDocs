# Lösenordshanterare

Det finns många lösenordshanterare med olika fördelar och nackdelar. Deras
syfte är att på ett säkert sätt förvalta en databas med lösenord så att du
endast ska behöva komma ihåg ett för att få åtkomst till alla. Vissa
lösenordshanterare stödjer även att ha olika lösenord för olika
lösenordsuppsättningar om man vill kompartmentalisera sin exponering för att
mästarlösenordet läcker.

!!!danger "Välj ett STARKT mästarlösenord"
    Välj ett starkt mästarlösenord till din lösenordshanterare och memorera det.
    Skriv aldrig ner det och om du skriver ner det är upp pappret/hårddisken du
    skrev ner det på vid snarast möjliga tillfälle.


## pass

`pass` är en lösenordshanterare som använts flitigt inom Lysator. Programmet bor
helt och hållet i terminalen och krypterar din lösenordsdatabas med pgp (du kommer
alltså behöva en [gpg-nyckel](./gpg.md). För att initialisera ett pass-repo
(lösenordsdatabas) så skriver du
```sh
pass init [gpg-fingeravtryck]
```
Detta skapar ett pass-repo under `~/.password-store`. Vill du att fler än en
[gpg-nyckel](./gpg.md) ska kunna avkryptera repot så är det bara att lägga till fler
gpg-fingeravtryck efter det första, separerade med mellanslag. Vill du att repot
ska ligga någon annanstans så kan du lägga till `-p sökväg/till/katalog` efter
`init`. 

För att lägga in gamla lösenord skriver du 
```sh
pass insert [namn]
```
Notera att `[namn]` är en filsökväg, pass stödjer sortering av lösenord i en katalogstruktur.
För att sedan få ut lösenordet skriver du
```
pass [namn]
```
`pass` kommer sedan att be dig avkryptera lösenordet i `[namn]` med din
[gpg-nyckel](./gpg.md). `pass` skriver sedan ut lösenordet du angett till `stdout`.
Om du vill undvika detta (t.ex. om någon sitter och axelsurfar) så kan du även skriva
direkt till din `x-clipboard` med `pass -c [namn]`.

För att lägga till nya lösenord automatiskt kan du använda 
```sh
pass generate [namn] [lösenordslängd]
```
du kan begränsa genereringen till alphanumeriska tecken med hjälp av `-n` vilket kan
vara lämpligt att göra under särskilda omständigheter. Under sådana omständigheter
se till att kompensera genom att öka längden på lösenordet.

Vidare läsning finns på programmets [man-sida](https://linux.die.net/man/1/pass)
som kan nås i terminalen med
```
man pass
```

## keepassxc

`keepassxc` är en lösenordshanterare med både grafiskt och kommandoradsgränssnitt.
Dess stora fördel gentemot `pass` är att lösenordsdatabasen är krypterad med ett
kvantsäkert symmetriskt krypto (standard är AES-256 som ska vara säkert på
överskådlig framtid förutsatt att inte förbättringar sker på Grovers algoritm
eller att det utvecklas kvantdatorer med många miljarder qubits). 

Det grafiska gränssnittet är intuitivt nog så jag kommer inte att ge en förklaring för det.

Kommandoradsgränssnittet är enklast att börja utforska med
```
keepassxc-cli
```
En rekommendation är att binda om kommandot med ett `alias`, förslagsvis `kpcli`.
Du skapar sedan en lösenordsdatabas med
```
kpcli db-create -p [lösenordsdatabas]
```
som kommer ge dig en prompt att sätta ett lösenord på din lösenordsdatabas.

Du lägger sedan till en fil i databasen med 
```
kpcli add [lösenordsdatabas] [namn] 
```
för att specificera lösenordet i ovanstående kommando lägger man sedan till
`-p` för en lösenordsprompt eller `-g` för att generera ett lösenord.
Man kan även lägga till ett matchande användarnamn till lösenordet med `-u`
och en tillhörande webblänk med `--url`, ett fullständigt kommando kan till 
exempel se ut som
```sh
kpcli add ~/.keepassxc webmail -p -u wnabee --url webmail.lysator.liu.se --notes "Min login till Lysators webmailgränssnitt"
```

När en fil är skapad kan man redigera dess attribut (som t.ex
lösenord/användarnamn) med
```sh
kpcli edit [lösenordsdatabas] [namn]
```
precis som ovan redigeras sedan de olika attributen med `-g`,`-p`,`-u`, etc.

Ett lösenord kan sedan hämtas ut med
```sh
kpcli clip [lösenordsdatabas] [namn]
```
En hel fil kan visas upp med
```sh
kpcli show [lösenordsdatabas] [namn]
```
Ett specifikt attribut kan hämtas ut med
```sh
kpcli clip -a <attr> [lösenordsdatabas] [namn]
```
Vidare läsning finns på keepassxcs
[användarguide](https://keepassxc.org/docs/KeePassXC_UserGuide)
samt under
```sh
man keepassxc
```
