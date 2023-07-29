tldr:
	@echo Available commands
	@echo ------------------
	@grep '^[[:alpha:]][^:[:space:]]*:' Makefile | cut -d ':' -f 1 | sort -u | sed 's/^/make /'
start:
	npm run dev
vercel:
	vercel git connect
netlify:
	netlify init
