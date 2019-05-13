const express = require('express')
const { injectLogic, checkLogin } = require('./middlewares')
const render = require('./components/render')
const package = require('./package.json')
const { Register, Home } = require('./components')
const bodyParser = require('body-parser')
const session = require('express-session')

debugger
const urlencodedParser = bodyParser.urlencoded({ extended: false })
debugger
const { argv: [, , port = 8080] } = process

const app = express()
debugger
app.set('view engine', 'pug')
app.set('views', 'components')
debugger
app.use(session({
    secret: 'my super secret phrase to encrypt my session',
    resave: true,
    saveUninitialized: true
}))
debugger
app.use(express.static('public'), injectLogic)
debugger
app.get('/', checkLogin('/home'), (req, res) => {
    res.render('landing')
})
debugger
app.get('/register', checkLogin('/home'), (req, res) => {
    res.send(render(new Register().render()))
})

app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req
    debugger
    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
            .catch(({ message }) => {
                res.send(render(new Register().render({ name, surname, email, message })))
            })
    } catch ({ message }) {
        res.send(render(new Register().render({ name, surname, email, message })))
    }
})

app.get('/login', checkLogin('/home'), (req, res) =>{
    debugger
    res.render('login')
}
)

app.post('/login', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { email, password }, logic, session } = req

    try {
        logic.loginUser(email, password)
            .then(() => {
                session.token = logic.__userToken__

                res.redirect('/home')
            })
            .catch(({ message }) => res.render('login', { email, message }))
    } catch ({ message }) {
        res.render('login', { email, message })
    }
})

app.get('/home', checkLogin('/', false), (req, res) => {
    const { logic } = req

    logic.retrieveUser()
        .then(({ name }) => res.send(render(new Home().render({ name }))))
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req

    session.query = query

    logic.searchDucks(query)
        .then(ducks => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ urlWishList: `/home/wishlist/${id}`, urlDetail: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ name, query, ducks }))))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req
    debugger
    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { title, image, description, price }

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ query, name, duck }))))
        })
})

app.get('/home/wishlist/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req
    debugger
    console.log(id)

    logic.toggleFavDuck(id)
    .then(()=>{
        logic.retrieveFavDucks()
        .then(ducks => {
            debugger
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ urlWishList: `/home/wishlist/${id}`, urlDetail: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ name, query, ducks }))))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
    })
})



app.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))