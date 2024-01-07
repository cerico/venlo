tldr:
	@echo Available commands
	@echo ------------------
	@grep '^[[:alpha:]][^:[:space:]]*:' Makefile | cut -d ':' -f 1 | sort -u | sed 's/^/make /'
start:
	npm run dev
build:
	npm run build
cucumber: build
	npm run test:cucumber
playwright: build
	npm run test:playwright
vitest:
	npm run test:vitest
test: cucumber playwright vitest
	@echo running all tests
netlify:
	netlify init
gist:
	node gist.js
debugcss:
	sed -i "" -e s/^\\/\\/\ \\@use\ \'debug\'\;/\\@use\ \'debug\'\;/g src/styles/defaults.scss
undebugcss:
	sed -i "" -e s/^\\@use\ \'debug\'\;/\\/\\/\ \\@use\ \'debug\'\;/g src/styles/defaults.scss
%:
	@$(MAKE) tldr
