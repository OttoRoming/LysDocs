# Elektronisk post på Lysatorvis

## <https://webmail.lysator.liu.se>

Hårdvaruinformation om mailservern finns här (OBS: PLACEHOLDER): [mail](https://datorhandbok.lysator.liu.se/index.php/Hermod).

Mailservern använder enbart fri programvara:

* Postfix som MTA
* Dovecot som IMAP- och POP-server
* Mailman för maillinglistor
* Roundcube för Webmail
* MariaDB för att lagra diverse användarspecifik information. 


## Katalogstruktur

Alla filer relaterade till *din* epost finns på "alla" Lysators
maskiner tillgängligt under <code>/var/mail/*användarnamn*</code>.
Där kan följande filer finnas:

* <code>Maildir/</code>
  Faktisk e-post lagras här. Katalogen är på maildir-struktur, och
  används som <code>INBOX</code>. Underkataloger för e-post kommer här
  skapas, med en punkt framför.
* <code>.forward</code>
  Konfiguration av vart e-post ska skickas vidare, alternativt om den ska skickas till procmail.
* <code>.procmailrc</code>
  Konfiguration av procmail, inkluderinade sortering av e-post.
* <code>.procmail/</code>
  Övrigt relaterat till procmail.

Som kuriosa är katalogen <code>/var/mail/</code> inmonterade från
mailserverns <code>/home/</code>.

## Läsa Epost
### Via Webmail
E-post kan både läsas och skickas via webmail, där Lysator kör
Roundcube. https://webmail.lysator.liu.se. För inloggning krävs ett ett e-postlösenord sätts på https://admin.lysator.liu.se.

### Via IMAP eller POP

| | | |
|-|-|-|
| **IMAP** | *imap.lysator.liu.se* | port 143|
| **IMAP/TLS**|*imap.lysator.liu.se*|port 993 |
| **POP3**| *pop.lysator.liu.se*| port 110|
| **POP3/TLS**| *pop.lysator.liu.se*| port 995 |

Hämntning av e-post kan göras via ett antal olika protokoll. IMAP/TLS
är dock rekommenderat. Vid användning av de "okrypterade" länkarna
måste STARTTLS användas innan inloggning kan gå igenom.

För authentisering används normalt lösenord, där användarnamnet är
ditt Lysatoranvändarnamn (med eller utan <code>@lysator.liu.se</code>
på slutet). E-postlösenord sätts på <https://admin.lysator.liu.se>.
**Ditt "vanliga" lösenord kommer INTE att fungera**.

### Lokalt

Eftersom alla Lysators maskiner monterar in ens e-postkatalog lokalt
kan vissa klienter konfigureras till att titta på den direkt.

### Mutt

I <code>~/.muttrc</code> eller <code>~/.mutt/muttrc</code> lägg till
följande:
<pre>
    set spoolfile = /var/mail/<i>användarnamn</i>/Maildir
    set mbox_type = Maildir
    set folder = /var/mail/<i>användarnamn</i>/Maildir
    set mbox = /var/mail/<i>användarnamn</i>/Maildir
</pre>

## Extra adresser

Om man känner att man behöver extra e-postaddresser (t.ex. för att förenkla sortering av skräppost) tillhandahåller Lysator följande funktioner:

### Plus-syntaxen

Alla addresser på formen <code>*användarnamn*+*någonting*@lysator.liu.se</code> levereras till den användarnamnet före '+'-teckenet. T.ex. levereras mail till <code>gazonk+lysmail@lysator.liu.se</code> Lysatoranvändaren "gazonk".

Varje address av det här slaget kan ha en egen .forward-fil, då med namnet <code>/var/mail/*användarnamn*/.forward+*extra*</code> (där *extra* är delen efter '+'-tecknet).

### <code>user</code>-domänen
Även alla mail till <code>*någonting*@*användarnamn*.user.lysator.liu.se</code> kommer levereras till användaren. T.ex. kommer <code>testaddress@gazonk.user.lysator.liu.se</code> komma fram till användaren gazonk.

När det här systemet används kommer följande e-posthuvud bli satt, vilket kan hjälpa med automatisk sortering:

 Delivered-to: *användarnamn*+user_*localpart*@lysator.liu.se   
Där *localpart* är det som stod innan '@' i addressen. Även
speciella .forward-filen kan användas (likt nämnt
[[#Plus-syntaxen|ovan]]), Dock i det här fallet som
<code>.forward+user_*localpart*</code>.

{{Föråldrad}}

Pga diverse omskrivningar så behålls inte hela To-raden när du gör
såhär, utan när du får brevet har ditt användarnamn kapats bort. Det
här är en stor bugg, men ingen har lyckats fixa den, så tig och lid.
Eller ge oss rötter tips om hur man kan fixa till det. 


==Vidarebefodring, sortering, och spamhantering==

===Vidarebefodring (<code>.forward</code>)===
Vidarebefodring hanteras i första hand av <code>.forward</code>-filer.
Dem berättar för mailservern hur den ska leverera mail, alternativt om
breven ska köras genom procmail. Komplett dokumentation av formatet
finns i [http://www.postfix.org/local.8.html Postfixs oficiella dokumentation].

Om filen inte finns kommer brev sparas lokalt på Lysators
webbserver. Om du vill göra någonting annat är det antagligen en av
följande:

; Vidarebefodring till annan address
: Skriv önksad epostaddress i filen, t.ex. <code>mittnamn@example.com</code>. Notera att breven *inte* sparas hos Lysator i det här fallet.
; Vidarebefodring till annan address samt spara hos Lysator
: Ange både önskad address, samt ditt användarnamn, separerade med mellanslag.
: T.ex. <code>mittnamn@example.com gazonk</code> om ditt Lysatoranvändarnamn är 'gazonk'.
; Kör genom procmail
: Ange <code>"|exec /usr/bin/procmail"</code> (citationstecken, pipe, "exec /usr/bin/procmail", citationstecken).

Notera att Postfix är noga med filrättigheterna på <code>.forward</code>, och
tillåter ingenting offentligare än 644 (<code>rx-r--r--</code>).

===Sortering via Procmail===
Information om vad procmail kan göras finns på sidan [[procmail]].

**INGA EGNA KOMMANDON, PERL-HACK, EGENINSTALLERAD PROGRAMVARA ELLER LIKNANDE FÅR KÖRAS PÅ MAILSERVERN.**

**DET ÄR INTE TILLÅTET ATT LÅTA PROCMAIL ELLER MAILDROP EXEKEVERA ANDRA KOMMANDON. ENBART INBYGGD FILTERFUNKTIONALITET FÅR ANVÄNDAS!**

===SPAM och Virus===
{{Föråldrad}}

Lysators mailserver försöker bli av med lite skräp innan det levereras till dig. Filtreringen sker i flera steg.


====Andra DNS-kollar====

Det finns ett antal andra kollar, exempelvis kan man kolla om domänen för avsändande mailadress går att slå upp i DNS, och om avsändande mailservers IP går att slå upp i DNS. Den första av de här reglerna tenderar att kapa bort en hel del SPAM.


====Greylisting====

Greylisting är en teknik där man tittar på tripleten (IP på avsändande mailserver, avsändaradress, mottagaradress). Första gången en unik triplet dyker upp så ger man en temporär felkod. En normal mailserver försöker då att leverera mailet igen efter en liten stund (fem minuter eller så), medan den speciella programvara spamavsändare använder helt enkelt struntar i att skicka iväg mailet.

Var gång du får mail från en ny mottagare tar det alltså en liten stund innan mailet kommer fram, men stora mängder spam kommer inte fram över huvud taget.

Lysators mailserver kör per default greylisting, men du kan slå av det för just din adress med hjälp av [[LysAdm]].

Mer information om greylisting finner du på exempelvis [http://greylisting.org http://greylisting.org].

====ClamAV====

När mailet väl tagit sig in på mailservern körs det genom ClamAV som kör virusscanning för att detektera virus. Klassas mailet som virus slängs det utan att vare sig avsändare eller mottagare får något meddelande. Avsändaren får inget, för virus har ändå oftast falsk avsändare. Mottagare får inget, eftersom ett meddelande om ett virus inte gör någon glad.

====Spamassassin====
Mailet körs sedan igenom Spamassassin, som med hjälp av regler, DNS-listor, analys på ingående URLer, autolearn mm försöker detektera spam. Påfallande ofta lyckas det, och då märks mailet upp med headern X-Spam-Flag: Yes.

==Övrigt==
===Inloggning på mailservern===
Vanliga användare kan inte logga in på mailservern. Det ska normalt inte behövas.

===Ta bort all sin Mail===
Om man vill ta bort **all** mail man har lagrad på lysators mailserver måste man vara aningen försiktig om man ska kunna fortsätta ta emot mail. Om man har så mycket mail att det inte är praktiskt att ta bort dem genom att använda klienten så är en lämplig metod:

  cd /var/mail/$USER
  mv Maildir Maildir.old && \
  mkdir -p Maildir/{cur,new,tmp} && \
  chmod -R 700 Maildir
  rm -rf Maildir.old

Har man väldigt mycket mail att ta bort är det lämpligt att be root om hjälp med det sista steget, eftersom det då kan göras lokalt på mailserver istället för över NFS.

===Mailinglistor===
Allt om hur du driver mailinglistor på Lysator finns att läsa på en särskild sida om [[E-postlistor]].

===Hostnamn===
Hostname du skall använda för att skicka och ta emot post finns beskrivna i ett särskilt dokument om [[IMAP och POP]]. Om du gör forward från Lysator och har en paranoid brandvägg kan det vara bra att veta att alla utgående uppkopplingar från Lysators mailserver kommer från adressen <tt>mail.lysator.liu.se</tt> 130.236.254.3.

===Authsmtp===
Det går att köra autenticerad SMTP mot Lysators mailserver. Mer om detta i manulen om [[AUTHSMTP]].

[[Category:E-post]]

