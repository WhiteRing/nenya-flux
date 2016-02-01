"use strict";

let NStore = require('../../src/store.class');

let initialState = { counter: 0 };



module.exports = () => {
  let counterStore = new NStore(initialState);

  counterStore.addAction('inc', inc);
  counterStore.addAction('dec', dec);

  return counterStore;
}



function inc (state, payload) {
  state.counter += payload;
}

function dec (state, payload) {
  state.counter -= payload;
}

