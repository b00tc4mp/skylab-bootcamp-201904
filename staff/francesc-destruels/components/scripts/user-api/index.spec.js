'use strict'

describe('user api', () => {
    const name = 'Fran'
    const surname = 'D'
    let username
    const password = '123'

    beforeEach(() => username = `fran-${Math.random()}@gmail.com`)

    describe('create', () => {
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

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            true && it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function (response) {
                    expect(response).toBeDefined()

                    const { status, error } = response

                    expect(status).toBe('KO')
                    expect(error).toBe(`user with username \"${username}\" already exists`)

                    done()
                })
            })
        })

        true && it('should fail on undefined name', () => {
            const name = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        true && it('should fail on null name', () => {
            const name = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        true && it('should fail on empty name', () => {
            const name = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        true && it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        true && it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        true && it('should fail on null surname', () => {
            const surname = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        true && it('should fail on empty surname', () => {
            const surname = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        true && it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        true && it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        true && it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        true && it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        true && it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        true && it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        true && it('should fail on null password', () => {
            const password = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        true && it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        true && it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })
    })

    describe('authenticate', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))

        true && it('should succeed on correct user data', done => {
            userApi.authUser(username, password, function (response) {
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
        true && it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        true && it('should fail on null username', () => {
            const username = null

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        true && it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        true && it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        true && it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        true && it('should fail on null password', () => {
            const password = null

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        true && it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        true && it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.authUser(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })
    })

    describe('retrieve', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))
        true && it('should succeed on correct user data', done => {

            userApi.authUser(username, password, function (response) {
                expect(response).toBeDefined()

                const { data: { id, token } } = response

                userApi.retrieveUser(token, id, function (response) {

                    expect(response).toBeDefined()

                    const { status, data: { name:__name, surname:__surname, username:__username} } = response

                    expect(status).toBe('OK')
                    expect(typeof __name).toBe('string')
                    expect(typeof __surname).toBe('string')
                    expect(typeof __username).toBe('string')
                    expect(__name.length).toBeGreaterThan(0)
                    expect(__username.length).toBeGreaterThan(0)
                    expect(__surname.length).toBeGreaterThan(0)

                    expect(__name).toBe(name)
                    expect(__surname).toBe(surname)
                    expect(__username).toBe(username)

                    done()
                })
            })
        })
    })

    describe('retrieve error', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))
        true && it('should succeed on correct user data', done => {

            userApi.authUser(username, password, function (response) {
                expect(response).toBeDefined()

                let { data: { id, token } } = response

                token = "sadadasdasd"

                userApi.retrieveUser(token, id, function (response) {

                    expect(response).toBeDefined()
                    const { status, error } = response

                    expect(status).toBe('KO')
                    expect(error).toBe(`invalid token`)

                    done()
                })
            })
        })
    })
})