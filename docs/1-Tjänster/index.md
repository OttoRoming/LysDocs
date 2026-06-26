---
weight: 20
---

# Tjänster

Här är en hyfsat uppdaterad lista över de tjänster som Lysator driftar och
som användare av Lysators system har tillgång till. Varje tjänst har en kort
beskrivning och en länk till relevanta guider och resurser rörande tjänsten.


## Lokaler

Lysator har två lokaler på Campus Valla.

### ~
~ (Tilde) är Lysators primära föreningslokal. Den finns på nedre våningen i
HusETT.

Alla medlemmar med Lysator konto har tillgång till lokalerna genom att logga in
på [Lysators låssystem](https://lock.lysator.liu.se).

I ~ finns soffa, kaffebryggare, tekokare, TV,
[~/lib](https://www.lysator.liu.se/foreningen/lokaler/lib/),
[arbetsstationer](./tilde/arbetsstationer.md),
[skrivare, scanner](./tilde/skrivare-och-scanner.md),
[jukebox](./tilde/jukebox.md) samt en hörna där man kan leka med elektronik.

### BAR
BAR är Lysators datorhall och finns under Ingång 19 i A-huset. Här kör
majoriteten av alla de servrar som Lysator driftar. Endast root-gruppen har
tillgång till denna lokal. Om du vill kolla på något eller jobba på ett projekt
som kräver fysisk närvaro till hårdvara är det bara att fråga närmaste root.


## Arbetsstationer
I Lysators lokal i HusETT finns ett antal arbetsstationer. Alla som har ett
konto hos Lysator kan logga in och använda arbetsstationerna. De monterar alla
hemdisk, www, och jukebox. De har även en relativt stor katalog av paket och
program.

[Mer info om Arbetsstationerna finns här!](./tilde/arbetsstationer.md)

## CPU-servrar
CPU-servrar finns när du behöver lite mer CPU-kraft, vill köra långa processer,
servrar eller tjänster. Eller kanske bara vill komma åt Lysator hemmifrån. De
fungerar för det mesta som arbetsstationerna i HusETT.

[Mer info om CPU-servrarna finns här!](./cpu-servrar/index.md)

## E-post
Lysator driver sedan länge sin egen E-post server. E-post går att nå via
[webmail.lysator.liu.se](https://webmail.lysator.liu.se), din e-post klient
eller direkt via `/var/mail/<användarnamn>` på någon av arbetsstationerna eller
CPU-servrarna.

[Läs allt om E-post här!](./kommunikation/elektronisk-post-på-lysatorvis/index.md)

## Webbspace

Alla användare har en webb-katalog på webbservern! Du hittar den i din hemmapp
`~/.public/` och `https://www.lysator.liu.se/~/<användarnamn>`. Webbservern har
även stöd för rudimentära server-script (.cgi), pike-skript och Markup-språket
RXML.

[Mer info om webbsidor och webbservern finns här!](../1-Tjänster/www/index.md)

## Versionshantering

Versionshantering är bra att ha! Därför finns
[git.lysator.liu.se](https://git.lysator.liu.se). Det är en GitLab-instans som
finns att använda för både lysiter och folk utanför föreningen.

Här på LysDocs hittar du guider om både git och vår egna
[GitLab-instans](./gitlab/index.md).

## Fillagring

Varje användare som har ett konto hos Lysator kan lagra filer av olika slag.

### Hemdisk

"Hemdisk" är ansluten till samtliga CPU-servrar och arbetsstationer. Hemdisk har
hand om samtliga användares `/home`-mapp och lagrar även det delade fillagret
`/lysator`.

!!! note "Notera:"
    Hemdisk är stor, men inte oändlig. Respektera andra användare och använd
    bara så mycket som du behöver! Om du vill lagra stora filer, sätt gärna en
    fil kallad `.nobackup` bredvid datan. Detta sparar på Lysators backup.

### WWW-servern

WWW-servern lagrar filer som syns på Lysators och användares webbsidor.
Den monteras automatiskt på samtliga CPU-servrar och arbetsstationer under
`/lysator/www/` och varje användare har en mapp kallad `.public`i sin
hem-mapp som länkar direkt till sin webbspace. Lägg in en rolig hälsning i din
index.html!

!!! note "Notera:"
    Denna lagringsyta är betydligt mindre än hemdisk, ladda därför inte upp för
    många stora (>1GB) filer här!

