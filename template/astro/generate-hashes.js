'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const { sha256 } = require('js-sha256')

const html = fs.readFileSync('dist/index.html');
const headersFile = 'dist/_headers'

const attributes = [];
const $ = cheerio.load(html);

$('script').each(function(i) {
  const self = $(this);
  attributes[i] = {
    base64: `'sha256-${Buffer.from(sha256.arrayBuffer(self.html())).toString('base64')}'`
  };
});

const hashes = `${attributes.map(e => e.base64).join(' ')};`

fs.readFile(headersFile, 'utf8', function(err, data) {
  const searchString = 'Content-Security-Policy';
  const re = new RegExp('^.*' + searchString + '.*$', 'gm');
  if (data?.match(re)) {
    const orig = data.match(re)[0].slice(0,-1)
    const full = `${orig} ${hashes}`
    const formatted = data.replace(re, full);
  
    fs.writeFile(headersFile, formatted, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  } else {
    console.log("no security policy found")
  }
})
