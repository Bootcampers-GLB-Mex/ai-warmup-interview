PYTHON = python3
VENV = .venv
PIP = pip

env: env/bin/activate

env/bin/activate:
	@echo "Using Python $(PYTHON)"
	test -d $(VENV) || $(PYTHON) -m venv $(VENV)
	. $(VENV)/bin/activate; pip install --upgrade pip;
	touch $(VENV)/bin/activate

install: env
	. $(VENV)/bin/activate; $(PIP) install -r libs/requirements.txt

run: env
	. $(VENV)/bin/activate; $(PYTHON) src.main:app

run_app: env
	. $(VENV)/bin/activate; $(PYTHON) -m uvicorn src.main:app --reload
