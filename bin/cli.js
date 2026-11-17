#!/usr/bin/env node
'use strict';

const tw = require('../src/index.js');

const commands = {
  slugify: tw.slugify,
  camel: tw.camelCase,
  snake: tw.snakeCase,
  kebab: tw.kebabCase,
  title: tw.titleCase,
  reverse: tw.reverse,
  palindrome: (t) =>
    tw.isPalindrome(t) ? 'Yes, it is a palindrome' : 'No, it is not a palindrome',
  words: (t) => String(tw.wordCount(t)),
  vowels: (t) => String(tw.countVowels(t)),
  time: (t) => tw.readingTime(t).text,
};

function help() {
  console.log(`textwiz - text utilities from your terminal

Usage:
  textwiz <command> <text...>

Commands:
  ${Object.keys(commands).join(', ')}

Examples:
  textwiz slugify "Hello World, Again!"
  textwiz camel "make me camel case"
  textwiz palindrome "A man, a plan, a canal: Panama"`);
}

const [cmd, ...rest] = process.argv.slice(2);

if (!cmd || cmd === '--help' || cmd === '-h') {
  help();
  process.exit(0);
}

if (!commands[cmd]) {
  console.error(`Unknown command: ${cmd}\n`);
  help();
  process.exit(1);
}

const text = rest.join(' ');
if (!text) {
  console.error('Please provide some text.');
  process.exit(1);
}

console.log(commands[cmd](text));