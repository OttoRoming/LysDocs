# GPG 

## Skapa nyckel

För att skapa din gpg-nyckel exekvera följande skalinstruktion och 
välj rsa4096 som krypto:

```
gpg --full-generate-key
```

## Lista nycklar

För att lista ut alla nycklar du har skapat och signerat/signerats av
kan du köra

```
gpg --list-keys
```

Du kommer att så något likt detta
```
pub   rsa4096 2022-09-28 [SC] [expires: 2025-09-29]
      912F0440B62D7E48EDBBEB9C5193EFF5C1797529
uid           [ultimate] Samuel Junesjö <wnabee@lysator.liu.se>
sub   rsa4096 2022-09-28 [E] [expires: 2025-09-29]
```

Det första stycket

```
pub   rsa4096 2022-09-28 [SC] [expires: 2025-09-29]
      912F0440B62D7E48EDBBEB9C5193EFF5C1797529
```
innehåller datumet nyckeln skapades och dagen det går ut samt nyckelns
offentliga *fingeravtryck* (<-- OBS.). 

Det andra stycket
```
uid           [ultimate] Samuel Junesjö <wnabee@lysator.liu.se>
```
Innehåller tilliten ägaren sätter på nyckeln, vem ägaren är och vilken epostaddress de har.

Det sista stycket
```
sub   rsa4096 2022-09-28 [E] [expires: 2025-09-29]
```
innehåller information om nyckelns delnycklar. När de skapades och när de går ut.


## Ladda upp nyckel 

För att göra din nyckel tillgänglig för andra måste den finnas på en
nyckelserver. Du kan ladda upp din gpg-nyckel till samma server som
lysator använder med

```
gpg --keyserver keyserver.ubuntu.com --send-keys [Fingeravtryck]
```

## Ladda ner nyckel

För att ladda ner nycklar lokalt kör

```
gpg --recv-keys [Fingeravtryck]
```

## Ladda om nycklar

Om någons nyckel är utgången eller har fått ändrad tillit kan du informera
ditt lokala system om detta genom att använda

```
gpg --refresh-keys
```

## Redigera nycklar

För att redigera nycklar du har privat nyckel till, kör

```
gpg --edit-key [Fingeravtryck]
```
#### Redigera delnyckel

Det går även att redigera delnycklar. När du är i redigeringsgränssnittet
skriv `key [delnyckelnummer]` för att välja delnyckeln. Delnyckelnummret 
hittas lätt som siffran i parantes i den utskrivna nyckelinformationen.

### Utgången nyckel

För att återuppliva en nyckel som gått ut gå in i redigeringsgränssnittet
och skriv `expire` och följ instruktionerna. När du är klar skriv `save` för
att avsluta.

### Felaktig tillit

För att ändra tillit till en nyckel gå in i redigeringsgränssnittet och skriv
`trust`, följ instruktionerna och avsluta med save.

## Signera nyckel

För att signera en nyckel, kör
```
gpg --sign-key [Fingeravtryck]
```

## Vidare läsning

```
man gpg
```
