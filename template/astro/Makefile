tldr:
	@echo Available commands
	@echo ------------------
	@for i in `grep '^[[:alpha:]]*:' Makefile | tr -d \:`; do echo make $$i; done
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
netlify:
	netlify init
gist:
	node gist.js
debugcss:
	sed -i "" -e s/^\\/\\/\ \\@use\ \'debug\'\;/\\@use\ \'debug\'\;/g src/styles/defaults.scss
undebugcss:
	sed -i "" -e s/^\\@use\ \'debug\'\;/\\/\\/\ \\@use\ \'debug\'\;/g src/styles/defaults.scss
