/**
 * Essentials of Parsing.
 *
 * Lecture 8: Predictive recursive descent.
 *
 * by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 * MIT Style License (C) 2020
 */

// -------------------------------------------------

/**
 * E
 *   : T E’
 *   ;
 */
function E() {
  return T() && _E();
}

/**
 * E’
 *   : + T E’
 *   | ε
 *   ;
 */
function _E() {
  // + T E’
  if (lookahead() === '+') {
    return term('+') && T() && _E();
  }
  // ε
  return true;
}

// -------------------------------------------------

/**
 * T
 *   : F T’
 *   ;
 */
function T() {
  return F() && _T();
}

/**
 * T’
 *   : * F T’
 *   | ε
 *   ;
 */
function _T() {
  // * F T’
  if (lookahead() === '*') {
    return term('*') && F() && _T();
  }
  // ε
  return true;
}

// -------------------------------------------------

/**
 * F
 *   : NUMBER
 *   ;
 */
function F() {
  return term('a');
}

// -------------------------------------------------
// Token manipulations:

let cursor = 0;
let source;

/**
 * Returns a token at cursor (lookahead).
 */
function lookahead() {
  return source[cursor];
}

/**
 * Expects a token, and increases the cursor.
 */
function term(expected) {
  return source[cursor++] === expected;
}

/**
 * Initializes the parsing string and cursor.
 *
 * Attempts to parse a string starting from the main symbol.
 */
function parse(s) {
  source = s;
  cursor = 0;
  return E() && cursor === s.length;
}

// -------------------------------------------------
// Tests:

const assert = require('assert');

assert.equal(parse('a'), true);
assert.equal(parse('a+a'), true);
assert.equal(parse('a+a+a'), true);
assert.equal(parse('a*a+a'), true);
assert.equal(parse('a*a*a+a*a+a'), true);

console.log('[PASS]');