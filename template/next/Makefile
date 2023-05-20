tldr:
	@echo Available commands
	@echo ------------------
	@for i in `grep '^[[:alpha:]]*:' Makefile | tr -d \:`; do echo make $$i; done
start:
	npm run dev
vercel:
	vercel git connect
netlify:
	netlify init
