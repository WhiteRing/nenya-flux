'use strict';

let NenyaFlux = require('../src');
let nFlux = NenyaFlux();
let CounterStore = require('./stores/store.test');
let cs = CounterStore();
let counterSubscription = nFlux.createSubscription(cs);

console.log("--- Test NenyaFlux ---");
console.log(cs);

function testSubscriber (store) {
//  store.update('inc', 25);
//  store.update('dec', 15);
  
  console.log('Test subscriber');
  let s = cs.getState();
  console.log(s);
}

counterSubscription(testSubscriber);

let aInc = nFlux.createAction('inc');
let aDec = nFlux.createAction('dec');

aInc(25);
aDec(5);
