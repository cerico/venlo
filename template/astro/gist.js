const fs = require("fs")
const now = new Date().toDateString();
const iso = new Date().toISOString()
const displayDate = (new Date()).toLocaleDateString("en-GB",{day: 'numeric', month:'short'});
const md = `---
title: Hello world
author: ''
publishDate: ${now}
displayDate: ${displayDate}
cover: https://i.ibb.co/swkd4P2/ccc.jpg
description: hello world example
tags:
  - bluey
  - yellow
---

## Hello world

Here is a starter post with an example codeblock.


\`\`\`js
const makeRequest = (verb, endPoint, data) => {
  return fetch(endPoint, {
    headers: headers(),
    credentials: 'include',
    method: verb,
    body: JSON.stringify(data)
  })
}
\`\`\`
`

let output = md
fs.writeFileSync(`./src/pages/gists/gist-${iso}.mdx`, output)
