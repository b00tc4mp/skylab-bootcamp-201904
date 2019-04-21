'use strict'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: { id } } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)

                done()
            })
        })

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function (response) {
                    expect(response).toBeDefined()

                    const { status, error } = response

                    expect(status).toBe('KO')
                    expect(error).toBe(`user with username \"${username}\" already exists`)

                    done()
                })
            })
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })
    })

    describe('authenticate', () => {

        beforeEach(done => userApi.create(name,surname,username, password, done))

        it('should succeed on correct user data', done => {
            userApi.authenticate(username, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: {id,token} } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(token.length).toBeGreaterThan(0)

                done()
            })
        })
        it('should fail on wrong username', done => {
            const username = 'mmmm@gmail.com'
            userApi.authenticate(username, password, function (response) {
                expect(response).toBeDefined()

                const { status,error } = response

                expect(status).toBe('KO')
                expect(error).toBe(`user with username \"${username}\" does not exist`)

                done()
            })
        })
        it('should fail on wrong password', done => {
            const password = '234456'
            userApi.authenticate(username, password, function (response) {
                expect(response).toBeDefined()

                const { status,error } = response

                expect(status).toBe('KO')
                expect(error).toBe(`username and/or password wrong`)

                done()
            })
        })

    })

    describe('retrive', () =>{

        beforeEach(done => userApi.create(name,surname,username, password, done));
        it('shoul succed retriving user data',done =>{
            
            userApi.authenticate(username, password,function (response){

                localStorage.setItem('token',response.data.token)
                localStorage.setItem('id',response.data.id)
                userApi.retrieve(localStorage.getItem('id'),localStorage.getItem('token'),function (response2){
                let data = response2;
                expect(data.status).toBe('OK')
                done();
                })
            });

        })

    })
    describe('update', () =>{

        beforeEach(done => userApi.create(name,surname,username, password, done));
        it('shoul succed updating user data',done =>{
            
            userApi.authenticate(username, password,function (response){

                sessionStorage.setItem('token',response.data.token)
                sessionStorage.setItem('id',response.data.id) 
                let option = {"age":34}
                userApi.update(sessionStorage.getItem('id'),sessionStorage.getItem('token'),option,function (response2){
                let data = response2;
                expect(data.status).toBe('OK')
                done();
                })
            });

        })

    })


    
})