NPM_TOKEN=$(shell awk -F'=' '{print $$2}' ~/.npmrc)
tldr:
	@echo Available commands
	@echo ------------------
	@for i in `grep -v "\t" Makefile | grep "a*:" | tr -d \:`; do echo make $$i; done
generate:
	./bin/init.js
gh:
	@echo $(NPM_TOKEN) > npm
	gh secret set NPM_TOKEN < npm
	rm npm
