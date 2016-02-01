//
// Usage:
// let nenyaStore = require('store.class').new (s);
// let NenyaStore = require('store.class').class;
//

'use strict';

class NenyaStore {
  constructor (state) {
    this._state = state ? state : {};
    this._actions = {};
    this._subscribers = [];
 }

  getState () {
    return this._state;
  }

  addAction (actionType, method) {
    this._actions[actionType] = method;
  }

  hasAction (type) {
    return typeof this._actions[type] !== 'undefined';
  }

  subscribe (subscriber) {
    this._subscribers[this._subscribers.length] = subscriber;
  }

  update (type, payload) {
    if (typeof this._actions[type] === "undefined") {
      throw new Error ('Action ' + type + ' is undefined.');
    }

    let currentState  = this.getState();
    let currentAction = this._actions[type];

    currentAction(currentState, payload);

    this._state = currentState;  
    this._updateSubscribers();
  }



  _updateSubscribers () {
    let self = this;

    this._subscribers.forEach(function (subscriber) { 
      subscriber(self);
    });
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
