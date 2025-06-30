# Ta bort en användare

Användarhantering sker på trocca.ad.
För att nå trocca hemmifrån behöver du [slå på en proxy](/annat/proxy\ via\ lysator) till lysators system.

Därefter kan du påbörja borttagningen av en användare:

1. Navigera till `trocca.ad.lysator.liu.se` och logga in.
2. Navigera till användaren i det grafiska gränssnittet.
3. Sätt `Login shell` till `/usr/bin/nologin`, tryck sedan `save`
4. Öppna `Actions`-menyn och tryck `disable` (om inte användaren bett om att bli fullständigt borttagen, tryck då `delete` detta går inte att ångra).
5. Ssh:a till `mail.lysator.liu.se` och bli root.
6. Kör 
```
/opt/scripts/disallow-mail-login <username>
```
samt
```
mysql mailconf
delete from CryptPassword where id = (select id from members where login = '<ANVÄNDARNAMN>');
```
