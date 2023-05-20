NPM_TOKEN=$(shell awk -F'=' '{print $$2}' ~/.npmrc)
tldr:
	@echo Available commands
	@echo ------------------
	@for i in `grep '^[[:alpha:]]*:' Makefile | awk -F ":" '{print $$1}'`; do echo make $$i; done
generate:
	./bin/init.js
gh:
	@echo $(NPM_TOKEN) > npm
	gh secret set NPM_TOKEN < npm
	rm npm
deploy_key:
	gh secret set DEPLOY_KEY < ~/.ssh/kawajevo/deploy_rsa
