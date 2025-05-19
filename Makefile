PY_FILES := $(shell find . -name "*.dg.py")
PNG_FILES := $(PY_FILES:.dg.py=.dg.png)

all: $(PNG_FILES)

%.dg.png: %.dg.py
	@echo "Generating $@"
	@cd $(dir $<) && python $(notdir $<)

clean:
	@echo "Cleaning up generated diagrams..."
	@rm -f $(PNG_FILES)

.PHONY: all clean
