NPM_TOKEN=$(shell awk -F'=' '{print $$2}' ~/.npmrc)
generate:
	./bin/init.js
gh:
	@echo $(NPM_TOKEN) > npm
	gh secret set NPM_TOKEN < npm
	rm npm
