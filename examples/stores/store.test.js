"use strict";

let NStore = require('../../src/store.mod');

let initialState = { counter: 0 };

module.exports = () => {
  let nStore = {};

  nStore.__proto__ = NStore (initialState);

  nStore.addAction('inc', inc);
  nStore.addAction('dec', dec);

  return nStore;
}

function inc (state, payload) {
  state.counter += payload;
}

function dec (state, payload) {
  state.counter -= payload;
}
