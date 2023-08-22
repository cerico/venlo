# README

This is an example README file with code snippets

## ZSH

Below is an example of a zsh alias

```zsh title="~/.zsh/aliases
batt () {
  [[ $1 = "clear" ]] && echo -n > ~/.batt
  if (pmset -g batt | grep Internal | grep estimate > /dev/null); then
    batt=$(pmset -g batt | grep Internal |awk -F' ' '{print $3,$4}' | tr -d \;)
  else
    batt=$(pmset -g batt | grep Internal |awk -F' ' '{print $3,$4,$5,$6}' | tr -d \;)
  fi
  last=`tail -n 1 ~/.batt | awk -F " " '{ print $3}'`
  this=`echo $batt | awk -F " " '{ print $2}'`
  date=`date "+%H:%M"`
  cat ~/.batt
  echo $date $batt
  [[ $last = 'charged' ]] && [[ $this = 'charged' ]] && return
  [[ $1 = "cron" ]] && echo $date $batt >> ~/.batt
}
```

## ASTRO

Below is an example of an satro component

```astro title="src/components/MyComponent.astro"
---
import { getCollection } from "astro:content";
import Layout from "../../layouts/readme.astro";

export async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<Layout>
  <Content />
</Layout>

```

## MAKEFILE

Below is an example of a Makefile

```makefile
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

repo:
	gh repo create alison --public
	git remote add origin git@github.com:cerico/alison.git
```

## YAML

Below is an example of a yaml file

```yaml
---
- name: Before everything
  hosts: localhost
  roles:
    - { role: before, tags: [always] }

- name: Setup MacBook and debian
  hosts: [macbook, debian]
  roles:
    - { role: whoami, tags: [always] }
    - { role: install, tags: [install, setup, info] }
    - { role: aliases, tags: [aliases, install, setup, info] }
    - { role: terminal, tags: [terminal, setup, info] }
    - { role: rails, tags: [rails, info] }
    - { role: vscode, tags: [vscode, setup, info] }

- name: Setup debian machines
  hosts: [debian]
  roles:
    - { role: install, tags: [debian] }
    - { role: terminal, tags: [debian] }
    - { role: aliases, tags: [debian] }
    - { role: nginx, tags: [debian, nginx] }

- name: Setup macbook
  hosts: macbook
  roles:
    - { role: desktop, tags: [desktop, setup, info] }

- name: After everything
  hosts: localhost
  roles:
    - { role: afterwards, tags: [always] }
```

Link in main section [further reading](docs/detail.md)

Links inside a list

- [technical specs](docs/detail.md)
- [design details](docs/detail.md)
- [roadmap](docs/detail.md)
- [further reading](docs/detail.md)
