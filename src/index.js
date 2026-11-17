'use strict';

function assertString(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string but received ${typeof str}`);
  }
}

// Split into lowercase words (handles spaces, dashes, underscores, camelCase)
function splitWords(str) {
  assertString(str);
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function capitalize(str) {
  assertString(str);
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function titleCase(str) {
  return splitWords(str).map(capitalize).join(' ');
}

function camelCase(str) {
  return splitWords(str)
    .map((w, i) => (i === 0 ? w : capitalize(w)))
    .join('');
}

function snakeCase(str) {
  return splitWords(str).join('_');
}

function kebabCase(str) {
  return splitWords(str).join('-');
}

// "Héllo, Wörld!" -> "hello-world"
function slugify(str) {
  assertString(str);
  const clean = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return splitWords(clean).join('-');
}

function truncate(str, maxLength, suffix = '...') {
  assertString(str);
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError('maxLength must be a non-negative integer');
  }
  if (str.length <= maxLength) return str;
  if (maxLength <= suffix.length) return suffix.slice(0, maxLength);
  return str.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}

function reverse(str) {
  assertString(str);
  return Array.from(str).reverse().join('');
}

function isPalindrome(str) {
  assertString(str);
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned.length > 0 && cleaned === reverse(cleaned);
}

function wordCount(str) {
  assertString(str);
  const matches = str.match(/\S+/g);
  return matches ? matches.length : 0;
}

function countVowels(str) {
  assertString(str);
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

function readingTime(str, wpm = 200) {
  assertString(str);
  if (!(wpm > 0)) throw new RangeError('wpm must be greater than 0');
  const words = wordCount(str);
  const minutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / wpm));
  return { words, minutes, text: `${minutes} min read` };
}

function wordFrequency(str, limit = 5) {
  assertString(str);
  const counts = new Map();
  for (const w of splitWords(str)) counts.set(w, (counts.get(w) || 0) + 1);
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}

module.exports = {
  capitalize,
  titleCase,
  camelCase,
  snakeCase,
  kebabCase,
  slugify,
  truncate,
  reverse,
  isPalindrome,
  wordCount,
  countVowels,
  readingTime,
  wordFrequency,
};