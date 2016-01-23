'use strict';

let _stores = [];

module.exports = () => {
  return {
    register,
    dispatch
  };
};

function register (nStore) {
  _validateStore (nStore);
  
  _stores[_stores.length] = nStore;
  
  return (subscribers) => {
    subscribers = subscribers.constructor === Array ? subscribers : [subscribers];
    
    // TODO: Decide the final order here
    
    subscribers.forEach(function (subscriber) {
      subscriber(nStore);
    });
    
    nStore.subscribe(subscribers);    
  }
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
