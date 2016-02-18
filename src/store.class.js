//
// Usage:
// let nenyaStore = require('store.class').new (s);
// let NenyaStore = require('store.class').class;
//

'use strict';

class NenyaStore {
  constructor (state) {
    this._initialState  = state ? state : {};
    this._actions       = {};
    this._subscribers   = {};
    
    this.resetState();
  }



  getState () {
    return this._state;
  }
  
  resetState () {
    this._state = this._initialState;
  }



  addAction (actionType, method) {
    this._actions[actionType] = method;
  }

  hasAction (type) {
    return typeof this._actions[type] !== 'undefined';
  }

  resetActions () {
    this._actions = {};
  }



  subscribe (subscriber, actions) {
    var self = this;
    
    // self._subscribers[this._subscribers.length] = subscriber;
    
    if (typeof actions === 'undefined' || actions.length === 0) {
      actions = Object.keys(self._actions);
    }

    actions.map((type) => {
      if (typeof self._subscribers[type] === 'undefined') {
        self._subscribers[type] = [];
      }
      self._subscribers[type].push(subscriber);
    });
  }

  update (type, payload) {
    if (typeof this._actions[type] === "undefined") {
      throw new Error ('Action ' + type + ' is undefined.');
    }
    let currentState  = this.getState();
    let currentAction = this._actions[type];

    currentAction(currentState, payload);

    this._state = currentState;  
    this._updateSubscribers(type);
  }
  
  
  
  resetSubscribers () {
    this._subscribers = {};    
  }

  _updateSubscribers (type) {
    let self = this;
    
    if (typeof this._subscribers[type] === 'undefined' || this._subscribers[type].length === 0) {
      console.log('No subscribers for action ' + type);
      return;
    }

    this._subscribers[type].forEach((subscriber) => subscriber(self));
  }
}



module.exports = NenyaStore;



/*{
  new: (initialState) => {
    return new NenyaStore (initialState);
  },
  class: NenyaStore
};
*/
