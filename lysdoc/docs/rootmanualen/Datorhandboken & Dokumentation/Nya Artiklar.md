# Lägg till och redigera nya artiklar till datorhandboken

## Utvecklingsmiljön

1. Klona ner handboksrepot [härifrån](https://git.lysator.liu.se/littlefox/lysdoc) med
`
git clone https://git.lysator.liu.se/littlefox/lysdoc.git
`
2. Navigera till toppen av den nedhämtade katalogen och kör
`
python3 -m venv venv
`
3. Kör 
`
source venv/bin/activate
`
för att aktivera python miljön.
4. Kör 
`
pip install -r requirements.txt
`
för att installera alla beroenden.
5. Byt mapp till
`
lysdocs/
`
6. Kör kommandot 
`
mkdocs serve
`
för att serva sidan lokalt.
7. Mer information om mkdocks går att hitta på <https://squidfunk.github.io/mkdocs-material/>

## Sidredigering

1. Checka ut en egen gren med 
`git checkout -b *<namn på din gren>*`.
2. Gör dina önskade ändringar, spara dem med `git add *<filnamn>*` och `git commit`.
3. Tryck upp dina önskade ändringar till gitlab med `git push` och logga in på <https://git.lysator.liu.se/littlefox/lysdoc> för att skapa en merge request.
4. Din request ses över och mergas till eller nekas från master.

## Skapa nya sidor

1. Se ovan instruktioner.
2. Skapa din markdown fil på önskad plats.
3. Öppna `docs/tillstånd.md` 
4. Lägg till 
```
<td style="background-color:[röd/orange/grön]"><a href="../sök/väg/till/filen">filnamnet</a></td>
```
under relevant kategori. 

## Skapa nya kategorier
1. Lägg till en mapp under `docs/guider` eller `docs/rootmanual` namngiven efter din önskade kategori.
2. lägg till den på statushemsidan genom att lägga till
```
<tr>
<th><a href="../väg/till/mapp">mappnamnet</a></th>
[Status på och sökväg till din fil]
</tr>
```
i `docs/tillstånd.md`
