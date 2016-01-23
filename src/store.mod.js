"use strict";

let _state       = {};
let _actions     = [];
let _subscribers = [];

module.exports = (initialState) => {
  init(initialState);

  return {
    addAction,
    hasAction,
    getState,
    subscribe,
    update,
    updateSubscribers
  };
};



function init (initialState) {
  if (initialState) {
    _state = initialState;
  }
}

function addAction (actionType, method) {
  _actions[actionType] = method;
}

function hasAction (actionType) { return typeof _actions[actionType] !== 'undefined'; }

function getState () { return JSON.parse(JSON.stringify(_state)); }

function subscribe (subscribers) {
  _subscribers = _subscribers.concat(subscribers);
}

function update (actionType, payload) {
  if (typeof _actions[actionType] === "undefined") {
    throw new Error ('Action ' + actionType + ' is undefined.');
  }

  let currentState  = getState();
  let currentAction = _actions[actionType];

  currentAction(currentState, payload);

  // TODO: use imutable states ?
  
  _state = currentState;
  
  updateSubscribers();
}



function updateSubscribers () {
  _subscribers.forEach(function (subscriber) { 
    subscriber(this);
  });
}

/* 

TODO Maybe move this methods to another module that stores states

function undo () {}

function redo () {}

function stash () {}

function commit () {}

*/
