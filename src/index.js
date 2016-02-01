'use strict';

//
// Usage:
//   let nFlux = require('nenya-flux')();
//   let store = nFlux.createStore();
//   let storeSubscription = nFlux.createSubscription(store);
//   let myAction = nFlux.createAction(action);
// 

let NDispatcher = require('./dispatcher.mod');
let NenyaStore = require('./store.class');

let _dispatcher = NDispatcher();

module.exports = () => {
  return {
    createStore,
    createAction,
    createSubscription
  }
};



function createStore (initialState) {
  return new NenyaStore(initialState); 
}

function createAction (actionType) {
  validateAction(actionType);
  
  return (payload) => {
    _dispatcher.dispatch(actionType, payload);
  }
}

function createSubscription(nStore) {
  nStore = typeof nStore === 'function' ? nStore() : nStore;

  validateStore(nStore);

  return _dispatcher.register(nStore);
}

function validateStore(nStore) {
  if (typeof nStore === 'undefined') {
    throw new Error('No store to register.');
  }

  if (!(nStore instanceof NenyaStore)) {
    throw new Error('The store is not a valid NenyaStore.');
  } 
}

function validateAction(actionType) {
  if (!actionType || typeof actionType !== 'string') {
    throw new Error('Please provide a type for the new action to create.');
  }  
}

