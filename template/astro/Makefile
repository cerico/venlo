start:
	npm run dev
build:
	npm run build
netlify:
	netlify init
preview:
	npm run build
	echo LAN address: `ifconfig | grep -A 4 en0 | grep -w inet | awk -F' ' '{print $$2}'`:9000
	open http://`ifconfig | grep -A 4 en0 | grep -w inet | awk -F' ' '{print $$2}'`:9000
	cd dist && python3 -m http.server 9000
gist:
	node gist.js
