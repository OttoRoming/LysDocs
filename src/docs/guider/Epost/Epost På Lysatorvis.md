# Elektronisk post på Lysatorvis
Detta är en hyfsat detaljerad guide över olika sätt att använda Lysators e-post server.

## E-post konto
För att komma åt mail via [webmail](https://webmail.lysator.liu.se) eller extern e-post klient måste du sätta ett e-post lösenord på [admin/mail](https://admin.lysator.liu.se/mail). 

## Läsa e-post
Alla de olika sätt som du kan komma åt din e-post på!

### Webmail
[webmail.lysator.liu.se](https://webmail.lysator.liu.se) låter dig läsa skriva och organisera din e-post i webbläsaren. Vi kör för tillfället [roundcube](https://roundcube.net/) som webmail-klient.

För att logga in använder du det lösenord du satt i [admin](https://admin.lysator.liu.se/mail). 

### IMAP, POP och SMTP
Med dessa kan du ansluta exempelvis [thunderbird](https://www.thunderbird.net) eller andra mailklienter. Det rekommenderas att använda TLS kryptering om du ska ansluta till dessa. Om du väljer en "okrypterad" anslutningstyp måste du använda STARTTLS för att kunna logga in.

Som användarnamn används ditt vanliga användarnamn.
Som lösenord ska du använda det lösenord du satt för mail i [admin](https://admin.lysator.liu.se/mail).

Portar för att ansluta klienten:
```
	MAP 	    imap.lysator.liu.se 	port 143
	IMAP/TLS 	imap.lysator.liu.se 	port 993
   	POP3 	    pop.lysator.liu.se 	    port 110
	POP3/TLS 	pop.lysator.liu.se 	    port 995
```

### Läsa mail lokalt

#### Mutt

## Mail-mappen

Alla lysators system monterar användarens mail-mapp på `/var/mail/<användarnamn>`. Det finns många gömda filer (dot-files) som kan vara viktiga. Kör `ls -a`.

Följande avsnitt beskriver vad de flesta av dessa filer är och hur de används.

### Vidarebefordring

### Spamhantering, Filtrering och Mappar

## Extra adresser

### Plus syntax
 användarnamn+prylemoj@lysator.liu.se`

### User-domän

`prylemoj@<användarnamn>.user.lysator.liu.se`

