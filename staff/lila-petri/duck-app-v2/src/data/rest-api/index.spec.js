import restApi from '.'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'

describe('api rest', () => {
    const name = 'Lila'
    const surname = 'Petri'
    let email
    const password = '123'

    beforeEach(() => email = `lila-${Math.random()}@gmail.com`)

    describe('register', () => {
        
        it('should succeed on correct user data', () =>
            restApi.registerUser(name, surname, email, password)
                .then(response => {
                    expect(response).toBeDefined()
                    const { message, error } = response
                    expect(error).toBeUndefined()
                    expect(message).toBe('Ok, user registered.')


                })
        )

        describe('on already existing user', () => {
            beforeEach(() => restApi.registerUser(name, surname, email, password))

            it('should fail on retrying to register', () =>
                restApi.registerUser(name, surname, email, password)
                    .then(response => {
                        expect(response).toBeDefined()

                        const { error } = response

                        expect(error).toBe(`user with username \"${email}\" already exists`)
                    })
            )
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null email', () => {
            const email = null

            expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty useemailrname', () => {
            const email = ''

            expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'username is empty')
        })

        // TODO password fail cases
    })

    describe('authenticate user', () => {

        beforeEach(() =>
            restApi.registerUser(name, surname, email, password)
                .then(() => {})
        )

        it('should succeed on correct user credential', () =>
            restApi.authenticateUser(email, password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { token } = response

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const [, payloadB64,] = token.split('.')
                    const payloadJson = atob(payloadB64)
                    const payload = JSON.parse(payloadJson)

                    expect(typeof payload.id).toBe('string')
                    expect(payload.id.length).toBeGreaterThan(0)

                  
                })
        )

        it('should fail on non-existing user', () =>
        restApi.authenticateUser(email = 'unexisting-user@mail.com', password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { error } = response
                    expect(error).toBe(`user with username \"${email}\" does not exist`)
                })
        )
    })

    describe('retrieve user', () => {
        let token

        beforeEach(() =>{
            
            return restApi.registerUser(name, surname, email, password)
                .then(() =>{ 
                    
                    return restApi.authenticateUser(email, password)

                })
                .then(response => {
                    
                    token = response.token
                })
        })

        it('should succeed on correct user id and token', () =>
            restApi.retrieveUser(token)
                .then(response => {

                    expect(response.name).toBe(name)
                    expect(response.surname).toBe(surname)
                    expect(response.email).toBe(email)
                    expect(response.password).toBeUndefined()
                })
        )

        it('should fail on incorrect token', () => {
            const token = 'wrong-token'

            return restApi.retrieveUser(token)
                .then(response => {
                    const {error} = response
                    expect(error).toBe(`invalid token`)
                })
        })
    })

    xdescribe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = userApi.__url__

            userApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            userApi.create(username, password, { name, surname })
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

        afterEach(() => userApi.__url__ = url)
    })

    xdescribe('when server responds too late', () => {
        const timeout = 1

        beforeEach(() => userApi.__timeout__ = timeout)

        it('should fail on too long wait', () =>
            userApi.create(username, password, { name, surname })
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof TimeoutError).toBeTruthy()
                    expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                })
        )

        afterEach(() => userApi.__timeout__ = 0)
    })

    xdescribe('update user', () => {
        let token, _data

        beforeEach(() => {
            _data = { array: [1, "2", true], hello: 'world', object: { key: 'value' } }

            return restApi.registerUser(name, surname, username, password)
                .then(response => {

                    return restApi.authenticateUser(username, password)
                })
                .then(response => token = response.data.token)
        })

        xit('should succeed on correct data', () =>
            restApi.updateUser(token, name, surname, password)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => restApi.retrieveUser(token))
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()

                    expect(data.array).toEqual(_data.array)
                    expect(data.hello).toBe(_data.hello)
                    expect(data.object).toEqual(_data.object)
                })
        )

        it('should succeed on correct data re-updating', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => {
                    _data.array = [2, 'b', false]
                    _data.hello = 'mundo'
                    _data.object = { property: 'something' }

                    return userApi.update(_id, token, _data)
                })
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id, token))
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()

                    expect(data.array).toEqual(_data.array)
                    expect(data.hello).toBe(_data.hello)
                    expect(data.object).toEqual(_data.object)
                })
        )
    })
    describe('search ducks', () => {
        let token

        beforeEach(() =>{
            
            return restApi.registerUser(name, surname, email, password)
                .then(() =>{ 
                    
                    return restApi.authenticateUser(email, password)

                })
                .then(response => {
                    
                    token = response.token
                })
        })
        it('should succeed on correct query', () =>
            restApi.searchDucks(token,'yellow')
                .then(ducks => {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(13)
                })
        )
    })
    describe('search duck', () => {
        let token, duckId

        beforeEach(() =>{
            
            return restApi.registerUser(name, surname, email, password)
                .then(() =>{ 
                    
                    return restApi.authenticateUser(email, password)

                })
                .then(response => {
                    token = response.token
                    return restApi.searchDucks(token,'yellow')
                })
                .then (response=> duckId=response[0].id)
        })
        it('should succeed on correct id', () =>
            restApi.searchDucks(token, duckId)
                .then(ducks => {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(13)
                })
        )
    })
    
        // TODO other cases
   
})