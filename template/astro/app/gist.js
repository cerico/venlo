const fs = require("fs")
const now = new Date().toDateString();
const iso = new Date().toISOString().replaceAll(':','-')
const title = process.argv[2] || 'Hello world'
const displayDate = (new Date()).toLocaleDateString("en-GB",{day: 'numeric', month:'short'});
const md = `---
title: ${title}
author: ''
publishDate: ${now}
displayDate: ${displayDate}
cover: https://i.ibb.co/swkd4P2/ccc.jpg
description: ${title}
tags:
  - bluey
  - yellow
---

## ${title}

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
