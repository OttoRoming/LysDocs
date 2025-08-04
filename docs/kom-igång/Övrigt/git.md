# Git

## Om Git

Git är ett *versionshanteringssystem* som låter dig spara versioner av dina filer på ett säkert sätt och backa upp dem till en server. I de flesta fall där programkod eller datorkonfiguration finns är det vanligt att man använder ett versionshanteringssystem för att spara ändringar och sammarbeta på projekt.

## Git på Lysator

Lysator har en git-server [git.lysator.liu.se](https://git.lysator.liu.se) som är öppen för allmänheten. Här håller de flesta av Lysators diverse projekt och arbetsgrupper sina git-förråd. 

Just denna git-server kör [GitLab Community Edition](https://gitlab.com/rluna-gitlab/gitlab-ce) som framända. 

!!!note "GitLab-kontot är separat!"
	Eftersom Lysators git-server är öppen för allmänheten så är detta ett av de få ställen på Lysators system där ditt Lysator-konto inte gäller. Du måste skapa ett nytt konto, föreslagsvis med samma användarnamn som på övriga Lysator-system.
	
## Att använda Git
Lite kort om att använda Git generellt.

### Grundläggande kommandon

*   **`git init`**:  Skapar ett nytt git-förråd i din nuvarande katalog. Innan du kan använda Git behöver du initialisera ett förråd i din projektmapp. Det går också bra att skapa ett nytt projekt på GitLab och klona projektet till din dator.

*  **`git clone <URL>`**: Används för att hämta ner en lokal kopia av ett projekt på en git-server. När du har klonat ett projekt behöver du inte initialisera det eller konfigurera en *remote*. Det är redan gjort.

*   **`git add .`**:   Git spårar inte automatiskt alla ändringar.  `git add .` lägger till *alla* filer i projektet som är ändrade eller nya och gör de redo för commit. Du kan också använda `git add <filnamn>` för att lägga till en specifik fil.

*   **`git commit -m "Beskrivande meddelande"`**:  En `commit` är som en ögonblicksbild av ditt projekt vid en viss tidpunkt. `-m "Beskrivande meddelande"` lägger till ett meddelande som förklarar vad du ändrat.  Bra meddelanden gör det lättare att se vad man gjort i efterhand.

*   **`git push`**: `git push` skickar dina commits från ditt lokala repository till en *remote* (git-server).  Det gör att andra kan se dina ändringar, dra ner dem och arbeta vidare på dem.  Du behöver konfigurera en *remote* först (vanligtvis via `git remote add origin <URL>`). Om du klonat projektet från GitLab så kommer *remote* redan att vara satt.

*   **`git pull`**: För att hämta den senaste versionen av projektet.

Det här är bara grunderna. Det finns många fler kommandon och koncept i Git, men det här borde ge dig en bra start!

(Pssst! Varje höst håller vi UppLYSning om Git, Linux och annat som är bra att veta om datorer. Håll utkik!)


