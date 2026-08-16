serve:
  uv run zensical serve

# Kontrollera att inga sidor saknas i navigationen
check:
  python3 scripts/check_nav.py

sync:
  uv venv
  uv pip install -r requirements.txt
