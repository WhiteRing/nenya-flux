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
var _nFlux = null;

module.exports = () => {
  if (_nFlux === null) {
    _nFlux = {
      createStore,
      createAction,
      createSubscription,
      reset,
      NenyaStore
    }

  }

  return _nFlux;
}



function createStore (initialState) {
  return new NenyaStore(initialState); 
}

function createAction (actionType) {
  _validateAction(actionType);
  
  return (payload) => {
    _dispatcher.dispatch(actionType, payload);
  }
}

function createSubscription(nStore) {
  nStore = typeof nStore === 'function' ? nStore() : nStore;

  _validateStore(nStore);

  return _dispatcher.register(nStore);
}

function reset () {
  _dispatcher.reset();
}



function _validateStore(nStore) {
  if (typeof nStore === 'undefined') {
    throw new Error('No store to register.');
  }

  if (!(nStore instanceof NenyaStore)) {
    throw new Error('The store is not a valid NenyaStore.');
  } 
}

function _validateAction(actionType) {
  if (!actionType || typeof actionType !== 'string') {
    throw new Error('Please provide a type for the new action to create.');
  }  
}

