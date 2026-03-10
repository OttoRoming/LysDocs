# Lysdocs

Skapa gärna merge-request om du vill bidra!

Mer information går att hitta på <https://squidfunk.github.io/mkdocs-material/>

## Sätta upp utvecklingsmiljö

### Med `uv`

[`uv`](https://docs.astral.sh/uv/) är en BLAZINGLY snabb pakethanterare för Python.

1. Installera [`uv`](https://docs.astral.sh/uv/getting-started/installation/).

2. Inuti detta repo, kör
    ```sh
    uv venv
    uv pip install -r requirements.txt
    ```

3. För att börja servera sidan
    ```sh
    uv run mkdocs serve --livereload
    ```

### Med python venv

1. Hämta hem detta repo till godtycklig mapp
2. I toppkatalogen på detta repo kör `python3 -m venv venv`
3. Kör `source venv/bin/activate` för att aktivera python miljön.
4. Kör `pip install -r requirements.txt` för att installera alla beroenden.
5. Kör kommandot `mkdocs serve --livereload` för att serva sidan lokalt.
