const logic = require('.')
require('../common/utils/array-random.polyfill')
const { User, Note } = require('../data/models')
const mongoose = require('mongoose')

const url = 'mongodb://localhost/notes-api-test'

describe('user data', () => {
    let users

    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    let users_

    beforeEach(async () => {

        await User.deleteMany()

        users_ = new Array(Math.random(100)).fill().map(() => ({
            name: `${names.random()}-${Math.random()}`,
            surname: `Grillo-${Math.random()}`,
            email: `grillo-${Math.random()}@mail.com`,
            password: `123-${Math.random()}`
        }))

    })

    describe('create', () => {
        it('should succeed on correct data', async () => {
            const name = 'Manuel', surname = 'Barzi', email = 'manuelbarzi@gmail.com', password = '123'

            await logic.registerUser(name, surname, email, password)

            let user = await User.findOne({ email: "manuelbarzi@gmail.com" })

            expect(user._id).toBeDefined

            console.log(user)

            const _users = await User.find({})

            expect(_users).toHaveLength(1)

            const [_user] = _users


            console.log(_user)


            // expect(_user).toMatchObject(user)
        })
    })

    // describe('list Notes', () => {

    //     beforeEach(() => {
    //         (async () => {
    //             let x = 0
    //             while ( x < users_.length){
    //                 await User.create(users_[x])
    //                 x = x + 1
    //             }
    //         })()
    //     })

    //     it('should succeed and return items if users exist', async () => {

    //         const _users = await userData.listUsers()

    //         console.log(_users)

    //         expect(_users).toHaveLength(users_.length)
    //         expect(_users).toEqual(users_)
    //     })
    // })

    describe('retrieve', () => {
        let marlon

        beforeEach(async () => {

            marlon = new User({
                name: 'Marlon',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await marlon.save()
        })

        it('should succeed on an already existing user', async () => {
            const _user = await logic.retrieveUser(marlon._id.toString())

            expect(_user.id).toBeUndefined()
            expect(_user.name).toEqual(marlon.name)
            expect(_user.surname).toEqual(marlon.surname)
            expect(_user.email).toEqual(marlon.email)
        })
    })

    describe('auth', () => {
        let pepito

        beforeEach(async () => {

            pepito = new User({
                name: 'xxx',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await pepito.save()
        })

        it('should succeed on correct data', async () => {

            const cosa = await logic.authenticateUser(pepito.email, pepito.password)

            expect(cosa).toBeDefined()

            expect(cosa).toEqual(pepito._id)
        })
    })

    describe('update', () => {
        let pepito

        beforeEach(async () => {

            pepito = new User({
                name: 'xxx',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await pepito.save()
        })

        it('should succeed on correct data', async () => {
            const trans = { name: 'aaa', email: 'e', password: 'p' }

            const cosa = await logic.updateUser(pepito._id.toString(), trans)

            expect(cosa).toBeDefined()

            expect(cosa._id).toEqual(pepito._id)

            expect(cosa).toMatchObject(trans)

            expect(Object.keys(cosa).length).toEqual(Object.keys(trans).length + 3)

        })
    })

    describe('delete', () => {
        // TODO
    })

    describe('add notes', () => {
        let pepito

        beforeEach(async () => {

            pepito = new User({
                name: 'xxx',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await pepito.save()
        })

        it('should succeed on create a private note to the user', async () => {
            let boca

            boca = new User({
                name: 'Esa',
                surname: 'Barzi',
                email: 'manuelbasdfsdfrzi@gmail.com',
                password: '123'
            })

            await boca.save()

            const note = "adios con el corazon"

            const cosa = await logic.addNote(boca._id.toString(), note)

            expect(cosa).toBeDefined()

            expect(cosa).toEqual("all good")
        })
        
        it('should succeed on create a no  private note to the user', async () => {

            const note = "heloooolololololololo"

            const cosa = await logic.addNote(pepito._id.toString(), note, true)

            expect(cosa).toBeDefined()

            expect(cosa).toEqual("all good")
        })

        
    })

    describe('retrieve private notes', () => {
        let juani

        beforeEach(async () => {

            juani = new User({
                name: 'xxx',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await juani.save()

            juani.notes.push({ text: "ajajajajja", author: juani.id})

            await juani.save()
        })

        fit('should succeed on create a no  private note to the user', async () => {

            const toSee = await logic.retrieveUserNotes(juani._id.toString())

            expect(toSee).toBeDefined()
            
            expect(toSee[0].date).toBeDefined()
            
            expect(toSee[0].text).toBeDefined()
        })
        
    })

    describe('retrieve public notes', () => {
        let consuelo

        beforeEach(async () => {

            consuelo = new User({
                name: 'xxx',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            })

            await consuelo.save()

            consuelo.notes.push({ text: "ajajajajja", author: consuelo.id})

            await consuelo.save()
        })

        fit('should succeed on create a no  private note to the user', async () => {

            const toSee = await logic.retrievePublicNotes(consuelo._id.toString())

            expect(toSee).toBeDefined()
            
            expect(toSee[0].date).toBeDefined()
            
            expect(toSee[0].text).toBeDefined()
            
            expect(toSee[0].author).toBeDefined()
        })
        
    })



    afterAll(async () => {
        // await User.deleteMany({})
        await mongoose.disconnect()
    })
})