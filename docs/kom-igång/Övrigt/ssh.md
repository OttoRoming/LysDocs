---
weight: 0
---

# SSH
SSH står för Secure SHell och är ett smidigt sätt att utföra ditt terminalarbete
på distans. Det är, till skillnad från telnet, lite svårare att avlyssna. Den
vanligaste implementationen av både server och klient är OpenSSH. Windows har en
inbyggd SSH-klient via PowerShell.

## Grunderna

För att ansluta till lysatordatorn _milou_ med användarnamnet _bar_ skriver du:
```sh
  ssh bar@milou.lysator.liu.se
```

Om du har samma användarnamn lokalt som på Lysators system
skriver du helt enkelt i din terminal:
```sh
  ssh milou.lysator.liu.se
```

För att ansluta till lysatordatorn _milou_ med användarnamnet
_bar_ på port 17 (istället för port 22 som är standard)
skriver du:
```sh
  ssh -p 17 bar@milou.lysator.liu.se
```

För att ansluta till lysatordatorn _milou_ och enbart utföra kommandet `gazonk
-gurka` och därefter koppla från skriver du:
```sh
  ssh milou.lysator.liu.se 'gazonk -gurka'
```

[man-sidan](https://www.man7.org/linux/man-pages/man1/ssh.1.html) för ssh är
ytterst informativ och kan med fördel studeras noggrant. Den kan även nås via:
```sh
  man ssh
```

## Authorized keys (eller hur du ansluter utan att behöva mata in lösenord hela tiden)
Om man har en dator man litar på kan man lägga till denna dators publika nyckel
i `.ssh/authorized_keys` på sitt lysatorkonto. Det går då att logga in utan
att behöva skriva in lösenordet. Å andra sidan kan man, om man vill, sätta ett
lösenord på sin nyckel.

Börja med att generera ett nyckelpar, ifall du inte redan har ett sådant:
```sh
  ssh-keygen # (Följ instruktionerna)
```

När detta är klart bör du ha en fil i katalogen `.ssh` under din hemkatalog som
heter `id_ed25519.pub`. Denna bör innehålla en lång textsträng som du kopierar
och lägger i filen `.ssh/authorized_keys` (skapa om den inte finns) i din
lysatorhemkatalog. Alternativt kan du följande med ditt användarnamn och din
utvalda server.:
```sh
  ssh-copy-id namn@server
```

Nu ska du kunna logga in utan att behöva skriva in lösenord från den datorn du
just skapade ett nyckelpar på. Ifall detta inte fungerar kan det vara så att du
behöver ändra läsbehörigheterna på din hemkatalog så att andra användare inte
kan läsa dina nycklar. Det kan exempelvis göras med:
```sh
  chmod 700 $HOME
```

**Viktigt!** Skulle denna dator bli stulen eller liknande är det ytterst viktigt att
du raderar raden ur authorized_keys, eftersom det annars är en fribiljett in i
lysators system...

## Tunnla med SSH
SSH kan även användas för att tunnla exempelvis datatrafik med. Ett bra exempel
på tillämpningsområde är för att tunnla SMTP för att skicka epost med lysators
smtp-server eller för att läsa Usenet Newshemifrån, fast mot lysators server.

För det tidigare bör något i stil med `ssh -NL 9999:mail.lysator.liu.se:25
vindbrygga.lysator.liu.se` eventuellt fungera och ge dig en "smtp-server" på
localhost, port 9999.

För det senare fungerar `ssh -NL 9999:news.lysator.liu.se:119
vindbrygga.lysator.liu.se` (Du ansluter sedan mot localhost, port 9999 och all
trafik dit routas till news-servern).
