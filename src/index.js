'use strict';

///
/// Usage:u
///   let nFlux = require('nenya-flux')();
///   let storeSubscription = nFlux.createSubscription(store);
///   let myAction = nFlux.createAction(action);
/// 

let NDispatcher = require('./dispatcher.mod');
let NStore = require('./store.mod');
let _dispatcher = NDispatcher();

module.exports = () => {
  return {
    store: NStore,
    createAction,
    createSubscription
  }
};



function createSubscription (nStore) {
  nStore = typeof nStore === 'function' ? nStore() : nStore;
  
  return _dispatcher.register(nStore);
}

function createAction (actionType) {
  _validateAction(actionType);
  
  return (payload) => {
    _dispatcher.dispatch(actionType, payload);
  }
}



function _validateAction (actionType) {
  if (!actionType || typeof actionType !== 'string') {
    throw new Error('Please provide a type for the new action to create.');
  }  
}

