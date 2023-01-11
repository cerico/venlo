NPM_KEY=$(shell awk -F'=' '{print $$2}' ~/.npmrc)
publish:
	npm publish
generate:
	./bin/init.js
gh:
	@echo $(NPM_KEY) > npm
	gh secret set NPM_KEY < npm
	rm npm
