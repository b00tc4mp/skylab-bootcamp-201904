'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'

        beforeEach(() => email = `manuelbarzi-${Math.random()}@gmail.com`)

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password, function (error) {
                    expect(error).toBeUndefined()

                    done()
                })
            })

            describe('on already existing user', () => {
                beforeEach(done => logic.registerUser(name, surname, email, password, done))

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password, function (error) {
                        expect(error).toBeDefined()
                        expect(error instanceof Error).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" already exists`)

                        done()
                    })
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, () => { })).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

        })
        describe('Login', () => {
           
            beforeEach(done => logic.registerUser(name, surname, email, password, done))
            
            it('should login on correct data', done=>{
                let email2 = email;
                let password2 = password;
               logic.loginUser(email2,password2,function(error){
                expect(error).toBeUndefined()
 
                done()

               })

            })

            it('should fail on incorrect email', done=>{
                let email2 ='kk@gmail.com';
                let password2 = password;
                logic.loginUser(email2, password2, function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof Error).toBeTruthy()

                    expect(error.message).toBe(`user with username \"${email2}\" does not exist`)

                    done()
               })

            })
            it('should fail on incorrect password', done=>{
                let email2 = email;
                let password2 = '2345667';
                logic.loginUser(email2, password2, function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof Error).toBeTruthy()

                    expect(error.message).toBe(`username and/or password wrong`)

                    done()
               })

            })
        });
       
    }),

        
    describe('ducks', () => {
        describe('search ducks', () => {
            it('should succeed on correct query', (done) => {
                logic.searchDucks('yellow', (ducks) => {
                   
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(13)

                    done()
                })

                
            })
        })
        describe('retrieveDuck', () => {
            it('should succeed on correct detail', (done) => {
                logic.retrieveDuck('5c3853aebd1bde8520e66e1b', (ducks) => {
                   
                    expect(ducks).toBeDefined()
                    done()
                })

                
            })
        })
    })
})