'use strict';

let expect = require('expect');
let NenyaStore = require('../src/store.class');

describe ('NenyaStore', () => {
  it ('should be a class', () => {
    expect (NenyaStore).toBeA ('function');
    //expect (NenyaStore.new).toBeA ('function');
    //expect (NenyaStore.class).toBeA ('NenyaStore');
    
  });

  it ('can be extended', () => {
    class TestStore extends NenyaStore {

    }

    let testStore = new NenyaStore ({c:0});

    testStore.addAction ('i', (state, data) => {
      state.c += data.v;
    });

    testStore.update ('i', {v: 5});

    let ev = 5;
    let cs = testStore.getState();
  
    expect (cs.c).toBe (ev);
  }) 
});

