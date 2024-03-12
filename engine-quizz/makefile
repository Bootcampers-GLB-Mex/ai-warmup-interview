PYTHON = python3
VENV = .venv
PIP = pip

env: env/bin/activate

env/bin/activate:
	@echo "Using Python $(PYTHON)"
	test -d $(VENV) || $(PYTHON) -m venv $(VENV)
	. $(VENV)/bin/activate; pip install --upgrade pip;
	touch $(VENV)/bin/activate

	