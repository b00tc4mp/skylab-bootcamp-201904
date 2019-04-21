'use strict'

describe('validate', () => {


    it('should fail on incorrect name ',()=>{
        let a = function(){return "hi"}
        
          expect( function(){ validate.arguments([
                { name: 'name', value:undefined,type: 'string', notEmpty: true },
                { name: 'surname', value: 'angel', type: 'string', notEmpty: true },
                { name: 'email', value: 'hola@gmail.com', type: 'string', notEmpty: true },
                { name: 'password', value: '1234', type: 'string', notEmpty: true },
                { value: a, type: 'function' }])}).toThrowError(`name is not optional`)

    })
    it('should fail on incorrect function ',()=>{
        let a = function(){return "hi"}
        
          expect( function(){ validate.arguments([
                { name: 'name', value:' Miguel',type: 'string', notEmpty: true },
                { name: 'surname', value: 'angel', type: 'string', notEmpty: true },
                { name: 'email', value: 'hola@gmail.com', type: 'string', notEmpty: true },
                { name: 'password', value: '1234', type: 'string', notEmpty: true },
                { value: undefined, type: 'function' }])}).toThrowError(`undefined is not optional`)

    })
    it('should fail on incorrect e-mail ',()=>{
       
        
          expect( function(){ validate.email('hola.com')}).toThrowError(`hola.com is not an e-mail`)

    })

})