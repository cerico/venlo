tldr:
	@echo Available commands
	@echo ------------------
	@for i in `grep -v "\t" Makefile | grep "a*:" | tr -d \:`; do echo make $$i; done
start:
	npm run dev
build:
	npm run build
netlify:
	netlify init
gist:
	node gist.js
debugcss:
	sed -i "" -e s/^\\/\\/\ \\@use\ \'debug\'\;/\\@use\ \'debug\'\;/g src/styles/defaults.scss
undebugcss:
	sed -i "" -e s/^\\@use\ \'debug\'\;/\\/\\/\ \\@use\ \'debug\'\;/g src/styles/defaults.scss
