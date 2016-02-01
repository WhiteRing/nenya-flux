'use strict';

let expect = require('expect');
let NenyaFlux = require('../src');


describe ('With NenyaFlux', () => {
  
  describe ('When required', () => {  
    it('Should be a function', function () {
      expect(typeof NenyaFlux).toBe('function');
    });

    it('Should return an object', function () {
      expect(typeof NenyaFlux()).toBe('object');
    });  
    
    it ('Should retrieve create methods for subscriptions and actions', () => {
      expect(typeof NenyaFlux().createSubscription).toBe('function');
      expect(typeof NenyaFlux().createAction).toBe('function');
    });     
  });

  describe ('When creating subscriptions', () => {
    let nf = NenyaFlux();
    let createSubscription = nf.createSubscription;
    
    describe ('With no store', () => {
      it('Should throw an error', (done) => {
        try {
          nf.createSubscription();
        } catch(err) {
          expect(err.toString()).toContain("No store to register");
          done();
        }        
      });      
    });
    
    describe ('With an empty store', () => {
      it('Should throw an error', (done) => {
        try {
          createSubscription({});
        } catch(err) {
          done();
        }        
      });      
    });

    describe ('For a store without update', () => {
      it('Should throw an error', (done) => {
        try {
          createSubscription({hasAction: true});
        } catch(err) {
          // expect(err.toString()).toContain('Store must have an "update" method');
          done();
        }        
      });      
    });

    describe ('For a store without hasAction', () => {
      it('Should throw an error', (done) => {
        try {
          createSubscription({update: () => {}});
        } catch(err) {
          // expect(err.toString()).toContain('Store must have an "hasAction" method');
          done();
        }        
      });      
    });

    describe ('For a store described by a function', () => {
      it('Shouldn\'t throw any error', (done) => {
        try {

          createSubscription(() => {
            let newStore = nf.createStore();
            return newStore;
          });
        } catch(err) {
          console.log(err);
          throw new Error('This shouldn\' be triggered.');
        }        
        done();
      });      
    });
    
  });
  
  describe ('When creating actions', () => {
    let nf = NenyaFlux();
    
    describe ('With no type', () => {
      it('Should throw an error', (done) => {
        try {
          nf.createAction();
        } catch(err) {
          // console.log(err);
          expect(err.toString()).toContain("Please provide a type for the new action to create");
          done();
        }        
      });      
    });
    
    describe ('With a non string type', () => {
      it('Should throw an error', (done) => {
        try {
          nf.createAction(4);
        } catch(err) {
          // console.log(err);
          expect(err.toString()).toContain("Please provide a type for the new action to create");
          done();
        }        
      });      
    });

    describe ('With a string type', () => {
      it('Shouldin\'t throw any error', (done) => {
        try {
          nf.createAction('test');
        } catch(err) {
          console.log(err);
        }        
        done();
      });      
    });

    
  });  
  
});
