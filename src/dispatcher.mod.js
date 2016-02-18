'use strict';

let NenyaStore = require('./store.class');

let _stores = [];

module.exports = () => {
  return {
    register,
    reset,
    dispatch
  };
};

function register (nStore) {
  if (!(nStore instanceof NenyaStore)) {
    throw new Error('The store to register is not a valid NenyaStore.');
  }

  let sw = _validateStore (nStore);

  _stores[_stores.length] = nStore;
  
  return (subscriber, actionsToSubscribe, initializeSubscriber) => {
    actionsToSubscribe = typeof actionsToSubscribe === 'undefined' ? [] : 
    actionsToSubscribe.constructor === Array ? actionsToSubscribe : [actionsToSubscribe];
        
    if (initializeSubscriber) { 
      subscriber(nStore);
    }
        
    nStore.subscribe(subscriber, actionsToSubscribe);
  }
}

function reset (type) {
  if (typeof type === 'undefined') {
    _stores.forEach((store) => {
      store.resetActions();
      store.resetSubscribers();
      store.resetState();
    });
    
    return;
  }
  
  if (type === 'flush') {
    _stores = [];
    return;
  }  
  
  _stores.forEach((store) => {
    switch (type) {
      case 'actions': 
        store.resetActions();
        break;
      case 'subscribers': 
        store.resetSubscribers();
        break;
      case 'state': 
        store.resetState();
        break;
    }
  });
}

function dispatch (action, payload) {
  if (_stores.length > 0) {
    _stores.forEach((store) => {
      if (store.hasAction(action)) {
        store.update(action, payload);
      }
    });
  }
}

function _validateStore (nStore) {
  if (!nStore) {
    throw new Error ('No store to register.');
  }
  
  if (!nStore.update || typeof nStore.update !== 'function') {
    throw new Error ('Store must have an "update" method.');
  }
  
  if (!nStore.hasAction || typeof nStore.hasAction !== 'function') {
    throw new Error ('Store must have an "hasAction" method.');
  }
  
  return true;
}
