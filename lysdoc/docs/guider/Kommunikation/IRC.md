 
# IRC

IRC står för Internet Relay Chat, och är ett protokoll som togs fram i Finland på 1980-talet. Även om dess storhetstid passerat så sker mycket kommunikation över IRC än idag, i synnerhet när det gäller t.ex. fri mjukvara. Det största nätverket för IRC är Libera.chat, och det är även där du hittar Lysators irc-kanal, #lysator.

## Klienter

Det finns många klienter för IRC, med alla möjliga användargränssnitt, t.ex. irssi och weechat för terminalen. I Emacs finns det också två inbyggda irc-klienter, ERC och rcirc, utöver andra som går att installera själv (ex. circe).

## Nickserv

På en del irc-nätverk behöver/kan man inte registrera sitt nick, men det är något som bland annat Libera.chat erbjuder som möjlighet. Det är rekommenderat om man vill ha en cloak eller rent allmänt skydda sitt nick så att ingen annan kan använda det när man själv är nerkopplad. Den tjänst som hanterar användarregistreringar på Libera heter nickserv, och du registrerar ditt nick med `/msg nickserv register <lösenord> <epostadress>`. Därefter bekräftar du enligt instruktioner i mailet du får, och kan därefter logga in genom `/msg nickserv identify <lösenord>` efter att du anslutit. Det finns även andra metoder att verifiera sig, t.ex. genom certifikat, eller genom att använda lösenordet som ett s.k. serverlösenord i din irc-klient.

## Chanserv

### Claim

Lysator är registrerat som ett projekt hos Libera.chat, vilket innebär att vi dels äger kanalen `#lysator` och namnrymden `#lysator-*`. Detta hindrar i sig inte att någon skapar en kanal `#lysator-blaha`, men det ger de som är gruppkontakter möjligheten att claima kanaler i namnrymden genom `/msg chanserv claim #lysator-blaha`. Detta innebär att denna får fullständiga rättigheter över kanalen.

### Flags

Rättighetssystemet på Libera.chat är baserat på att (registrerade) användare kan ha flaggor på kanaler. `/msg chanserv help flags` kommer att ge en lista över dessa, men bland annat ger +o möjligheten att använda `/op` och `/deop` i kanalen, dvs operatörstatus. `+ARefiorstv` ger i princip alla rättigheter i en kanal.

Utöver att ge en användare flaggor i en kanal kan man ge användare som har flaggor i en kanal rättigheter i en annan kanal. Om man exempelvis vill att operatörer i kanalen `lysator-foo` ska ha fullständiga rättigheter i `lysator-bar` kan man göra `/msg chanserv flags #lysator-bar $chanacs:#lysator-foo +ARefiorstv`.

## Cloaks

Normalt sett på IRC så kan alla se vilket hostname/ip-adress som en användare ansluter ifrån. En metod för att dölja detta för alla utom irc-nätverket/serverns administratörer kallas för cloak, vilket betyder att man ersätter hostname med en annan text.

Registrerade användare hos Libera.chat tilldelas numera en generisk cloak, men eftersom Lysator är ett registrerat projekt så finns möjligheten att ha en Lysatorspecifik cloak (ex. `lysator/user/<användarnamn>`). Om man vill ha en sådan är den enklaste metoden att fråga i `#lysator` så kommer någon av gruppkontakterna att ordna det. Om ditt irc-användarnamn och ditt Lysatoranvändarnamn skiljer sig kan du välja vilket av dessa du vill ha.