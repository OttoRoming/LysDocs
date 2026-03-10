serve:
  uv run mkdocs serve --livereload

sync:
  uv venv
  uv pip install -r requirements.txt
