TEMPLATES := $(wildcard templates/*.typ)
TEMPLATE_STAMP := templates/.stamp

TYP_FILES := $(shell find docs/ -name "*.typ")
SVG_FILES := $(TYP_FILES:.typ=.generated.svg)

all: $(SVG_FILES)

$(TEMPLATE_STAMP): $(TEMPLATES)
	@echo "Templates changed."
	@touch $@

%.generated.svg: %.typ $(TEMPLATE_STAMP)
	@echo "Generating $@"
	@typst compile $< --root . $@

clean:
	@echo "Cleaning up generated diagrams..."
	rm -f $(SVG_FILES) $(TEMPLATE_STAMP)

.PHONY: all clean
