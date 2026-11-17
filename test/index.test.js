'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const tw = require('../src/index.js');

test('capitalize', () => {
  assert.equal(tw.capitalize('hELLO'), 'Hello');
  assert.equal(tw.capitalize(''), '');
});

test('titleCase', () => {
  assert.equal(tw.titleCase('hello big world'), 'Hello Big World');
});

test('camelCase / snakeCase / kebabCase', () => {
  assert.equal(tw.camelCase('hello world-foo_bar'), 'helloWorldFooBar');
  assert.equal(tw.snakeCase('helloWorld Foo'), 'hello_world_foo');
  assert.equal(tw.kebabCase('Hello World'), 'hello-world');
});

test('slugify strips punctuation and accents', () => {
  assert.equal(tw.slugify('  Héllo, Wörld!  '), 'hello-world');
  assert.equal(tw.slugify('---'), '');
});

test('truncate', () => {
  assert.equal(tw.truncate('Hello wonderful world', 10), 'Hello w...');
  assert.equal(tw.truncate('short', 10), 'short');
  assert.equal(tw.truncate('abcdef', 2), '..');
  assert.throws(() => tw.truncate('abc', -1), RangeError);
});

test('reverse handles emoji', () => {
  assert.equal(tw.reverse('abc'), 'cba');
  assert.equal(tw.reverse('a😀b'), 'b😀a');
});

test('isPalindrome', () => {
  assert.equal(tw.isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.equal(tw.isPalindrome('hello'), false);
  assert.equal(tw.isPalindrome(''), false);
});

test('wordCount and countVowels', () => {
  assert.equal(tw.wordCount('  one two   three '), 3);
  assert.equal(tw.wordCount(''), 0);
  assert.equal(tw.countVowels('Education'), 5);
});

test('readingTime', () => {
  const text = Array(450).fill('word').join(' ');
  assert.deepEqual(tw.readingTime(text), { words: 450, minutes: 3, text: '3 min read' });
  assert.equal(tw.readingTime('').minutes, 0);
});

test('wordFrequency', () => {
  const result = tw.wordFrequency('the cat and the hat and the bat', 2);
  assert.deepEqual(result, [
    { word: 'the', count: 3 },
    { word: 'and', count: 2 },
  ]);
});

test('non-string input throws TypeError', () => {
  assert.throws(() => tw.slugify(123), TypeError);
  assert.throws(() => tw.wordCount(null), TypeError);
});