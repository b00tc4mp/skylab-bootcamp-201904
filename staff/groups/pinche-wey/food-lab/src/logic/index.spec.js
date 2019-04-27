import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import recipeApi from '../data/recipe-api';

describe('logic', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let confirmEmail
        const password = '123'
        const confirmPassword = '123'
        const confirmAge = true
        const confirmConditions = true

        beforeEach(() => {
            confirmEmail = email = `manuelbarzi-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('register user', () => {
            it('should succeed on correct user data', () =>
                logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
                    .then(response => expect(response).toBeUndefined())
            )

            describe('on already existing user', () => {
                beforeEach(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions))

                it('should fail on retrying to register', () =>
                    logic.registerUser(name, surname, email, password)
                        .then(() => { throw Error('should not reach this point') })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error instanceof LogicError).toBeTruthy()

                            expect(error.message).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions))).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('login user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => id = response.data.id)
            )

            it('should succeed on correct user credential', () =>
                logic.loginUser(email, password)
                    .then(() => {
                        const { __userId__, __userToken__ } = logic

                        expect(typeof __userId__).toBe('string')
                        expect(__userId__.length).toBeGreaterThan(0)
                        expect(__userId__).toBe(id)

                        expect(typeof __userToken__).toBe('string')
                        expect(__userToken__.length).toBeGreaterThan(0)

                        const [, payloadB64,] = __userToken__.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(payload.id).toBe(id)

                        expect(logic.isUserLoggedIn).toBeTruthy()
                    })
            )

            it('should fail on non-existing user', () =>
                logic.loginUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            )

            it('should succeed on correct user id and token', () =>
                logic.retrieveUser()
                    .then(user => {
                        expect(user.id).toBeUndefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user id', () => {
                logic.__userId__ = '5cb9998f2e59ee0009eac02c'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })
        })

        describe('toggle fav duck', () => {
            let id, token, duckId

            beforeEach(() => {
                duckId = `${Math.random()}`

                return userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            })

            it('should succeed adding fav on first time', () =>
                logic.toggleFavDuck(duckId)
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(1)
                        expect(favs[0]).toBe(duckId)
                    })
            )

            it('should succeed removing fav on second time', () =>
                logic.toggleFavDuck(duckId)
                    .then(() => logic.toggleFavDuck(duckId))
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(0)
                    })
            )

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.toggleFavDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })

        describe('retrieve fav ducks', () => {
            let id, token, _favs

            beforeEach(() => {
                _favs = []

                return duckApi.searchDucks('')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _favs[i] = ducks.splice(randomIndex, 1)[0].id
                        }

                        return userApi.create(email, password, { name, surname, favs: _favs })
                    })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            })

            it('should succeed adding fav on first time', () =>
                logic.retrieveFavDucks()
                    .then(ducks => {
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            const isFav = _favs.some(fav => fav === id)

                            expect(isFav).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    })
            )
        })
    })

    describe('recipes', () => {
        describe('search recipes', () => {
            it('should succeed on correct query and selector', () =>
                logic.searchRecipes('tomato','filter.php?i=')
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()
                        //expect(recipes.length).toBe(13)
                    })

                // TODO other cases
            )
        })

        describe('search recipes', () => {
            it('should succeed on correct query and selector', () =>
                logic.retriveRandomRecipes()
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()
                        //expect(recipes.length).toBe(13)
                    })

                // TODO other cases
            )
        })

        describe('search recipes', () => {
            it('should succeed on correct query and selector', () =>
                logic.retrieveRecipe("52772")
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()
                        //expect(recipes.length).toBe(13)
                    })

                // TODO other cases
            )
        })
    })
})