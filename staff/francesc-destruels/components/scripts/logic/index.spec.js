describe('logic', () => {
    const name = 'Fran'
    const surname = 'Des'
    let email
    const password = '123'
    const confirmPassword = '123'


    beforeEach(() => email = `frandes-${Math.random()}@gmail.com`)
    describe('register', () => {
        it('should succeed on correct user data', done => {
            logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                expect(error).toBeUndefined()

                done()
            })
        })

        describe('on already existing user', () => {
            beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))

            it('should fail on retrying to register', done => {
                logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof Error).toBeTruthy()

                    expect(error.message).toBe('existing user')

                    done()
                })
            })
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
        })

        it('should fail on null email', () => {
            const email = null

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
        })

        it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
        })

        it('should fail on non-email email', () => {
            const nonEmail = 'non-email'

            expect(() => logic.registerUser(name, surname, nonEmail, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
        })
    })


    describe('authenticate', () => {
        beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))

        true && it('should succeed on correct user data', done => {
            logic.login(email, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: { id, token } } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(typeof token).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(token.length).toBeGreaterThan(0)
                done()
            })
        })

        true && it('should fail on undefined email', () => {
            const email = undefined

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, 'incorrect email')
        })

        true && it('should fail on null email', () => {
            const email = null

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, 'incorrect email')
        })

        !true && it('should fail on empty email', () => {
            const email = ''

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })

        !true && it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })

        true && it('should fail on undefined password', () => {
            const password = undefined

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })

        true && it('should fail on null password', () => {
            const password = null

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })

        true && it('should fail on empty password', () => {
            const password = ''

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })

        true && it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
        })
    })

    describe('authenticate fail', () => {
        beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))

        true && it('should fail on bad request', done => {
            const email = 'xxxxx@cccc.com'

            logic.login(email, password, function (answer) {
                expect(answer.error).toBeDefined()

                done()
            })
        })
    })

    describe('retrieve', () => {
        beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))
        true && it('should succeed on correct user data', done => {

            logic.login(email, password, function (response) {
                expect(response).toBeDefined()

                const { data: { id, token } } = response

                this.__id__ = id
                this.__token__ = token

                logic.retrieveUser(token, id, function (response) {
                    expect(response).toBeDefined()

                    const { status, data: { name: __name, surname: __surname, username: __username } } = response

                    expect(status).toBe('OK')
                    expect(typeof __name).toBe('string')
                    expect(typeof __surname).toBe('string')
                    expect(typeof __username).toBe('string')
                    expect(__name.length).toBeGreaterThan(0)
                    expect(__username.length).toBeGreaterThan(0)
                    expect(__surname.length).toBeGreaterThan(0)

                    expect(__name).toBe(name)
                    expect(__surname).toBe(surname)
                    expect(__username).toBe(email)

                    done()
                })
            })
        })
    })

    describe('retrieve error', () => {
        beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))
        true && it('should fail on incorrect token', done => {

            logic.login(email, password, function (response) {
                expect(response).toBeDefined()

                const { data: { id, token } } = response

                this.__id__ = id
                this.__token__ = "sdfsfsfsdf"

                logic.retrieveUser(__token__, id, function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof Error).toBeTruthy()

                    done()
                })
            })
        })
    })
})    