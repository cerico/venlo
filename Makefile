NPM_TOKEN=$(shell awk -F'=' '{print $$2}' ~/.npmrc)
tldr:
	@echo Available commands
	@echo ------------------
	@grep '^[[:alpha:]][^:[:space:]]*:' Makefile | cut -d ':' -f 1 | sort -u | sed 's/^/make /'
generate: build
	npm run dev
gh:
	@echo $(NPM_TOKEN) > npm
	gh secret set NPM_TOKEN < npm
	rm npm
dev:
	npm run dev
build:
	npm run build
deploy_key:
	gh secret set DEPLOY_KEY < ~/.ssh/kawajevo/deploy_rsa
%:
	@$(MAKE) tldr
