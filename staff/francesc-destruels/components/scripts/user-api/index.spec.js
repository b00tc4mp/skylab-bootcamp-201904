'use strict'

describe('user api', () => {
    const name = 'Fran'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `fran-${Math.random()}@gmail.com`)

    describe('register', () => {

        describe('register', () => {
            true && it('should succeed on correct user data', done => {
                userApi.create(name, surname, username, password, function (response) {
                    expect(response).toBeDefined()
    
                    const { status, data: { id } } = response
    
                    expect(status).toBe('OK')
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
    
                    done()
                })
            })
    
            !true && it('Should fail by do not sending Name', function () {
                expect(function() { userApi.create(undefined, surname, username, password, function () {
                    console.log(`Hello`)
                })}).toThrowError('undefined is not a string')
            })
    
            !true && it('Should fail by do not sending Surname', function () {
                expect(function() { userApi.create(name, undefined, username, password, function () {
                    console.log(`Hello`)
                })}).toThrowError('undefined is not a valid surname')
            })
    
            !true && it('Should fail by do not sending E-mail', function () {
                expect(function() { userApi.create(name, surname, undefined, password, function () {
                    console.log(`Hello`)
                })}).toThrowError('undefined is not a valid e-mail')
            })
    
            !true && it('Should fail by do not sending Password', function () {
                expect(function() { userApi.create(name, surname, username, undefined, function () {
                    console.log(`Hello`)
                })}).toThrowError('undefined is not a valid e-mail')
            })

            !true && it('Should fail by do not sending Password', function () {
                expect(function() { userApi.create(name, surname, username, password, undefined)}).toThrowError('Callback is not a function')
            })

            describe('on already existing user', () => {
                beforeEach(done => userApi.create(name, surname, username, password, done))
    
                !true && it('should fail on retrying to register', done => {
                    userApi.create(name, surname, username, password, function (response) {
                        expect(response).toBeDefined()
    
                        const { status, error } = response
    
                        expect(status).toBe('KO')
                        expect(error).toBe(`user with username \"${username}\" already exists`)
    
                        done()
                    })
                })
            })
        })
    })
})


