/**
 * Essentials of Parsing. Lecture 6: Backtracking parser
 *
 * by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 * MIT Style License (C) 2020
 */

// --------------------------
// E: T + E | T

function E() {
  return (saveCursor(), E1()) || (backtrack(), saveCursor(), E2());
}

function E1() { return T() && term('+') && E(); }
function E2() { return T(); }

// --------------------------
// T: F * T | F

function T() {
  return (saveCursor(), T1()) || (backtrack(), saveCursor(), T2());
}

function T1() { return F() && term('*') && T(); }
function T2() { return F(); }

// --------------------------
// F: 'a'

function F() { return term('a'); }

// --------------------------
// Token manipulations:

let cursor = 0;
let savedCursor = cursor;
let source;

function term(expected) {
  return source[cursor++] === expected;
}

function saveCursor() { savedCursor = cursor; }
function backtrack() { cursor = savedCursor; }

function parse(s) {
  source = s;
  cursor = 0;
  return E() && cursor === s.length;
}

const assert = require('assert');

assert.equal(parse('a'), true);
assert.equal(parse('a+a'), true);
assert.equal(parse('a*a+a'), true);

console.log('[PASS]');