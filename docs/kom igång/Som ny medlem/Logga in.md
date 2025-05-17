---
weight: -90
---

# Logga in på Lysator

Lysator tillhandahåller ett antal [CPU-Servrar](/tjänster/CPU-servrar/) som är tänkta som kan användas av föreningens medlemmar, förutom arbetsstationerna i föreningens lokaler är dessa den främsta accesspunkten till lysators system. 

## SSH

För att nå CPU-servrarna kan man använda sig av SSH. 

### På Linux och BSD

Installera en SSH-klient med pakethanteraren för din distribution (t.ex.
openSSH). Du kan sedan koppla upp dig till exempelvis `milou` med
```
ssh [användarnamn]@milou.lysator.liu.se
```
När du blir bedd om att ange lösenord anger du ditt Lysatorlösenord.

### På Windows

En populär SSH-klientmjukvara är PuTTY. Installera programmet och exekvera
det. För att koppla upp dig till `milou` skriver du in
`[användarnamn]@milou.lysator.liu.se` i `Host Name` och klickar på `Open`.
När du blir bedd om att ange lösenord anger du ditt Lysatorlösenord.

## I terminalen

Om uppkopplingen gått väl kommer du nu ha ett textgränssnitt för att interagera med CPU:n. Du är nu redå att börja [utforska din hemkatalog](/kom igång/Som ny medlem/Utforska din hemkatalog/).
