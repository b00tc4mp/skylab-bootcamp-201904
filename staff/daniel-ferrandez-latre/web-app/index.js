const express = require('express')
const bodyParser = require('./body-parser')
// const errorHandler = require('./error-handlers')

//const { argv: [, , port] } = process

const port = 8000

const app = express()

app.use(express.static('public'))

let user = {}

function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="icon" type="image/png" href="https://static1.squarespace.com/static/52da1c11e4b021f2d934845a/t/5a53e828f9619a28e2231bbe/1515448366097/favicon.png">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`
}

app.get('/register', (req, res) =>
    res.send(render(`<form method="post" action="/register">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Register</button>
        </form>`))
)

app.post('/register', bodyParser, (req, res) => {

    const { username, password } = req.body



    user.username = username
    user.password = password
    if(user.name === undefined  ||user.password === undefined) {
        res.send(render(`<p>NOOOOO, no no no nooooo. Now proceed to <a href="/register">login</a></p>`))
    }



    res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`))
})

app.get('/login', (req, res) =>
    res.send(render(`<form method="post" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Login</button>
        </form>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) {
        user.isLoged = true
        res.redirect('/home')}
    else res.send(render(`<p>Wrong credentials.</p>`))
})

user.IsLogged && app.get('/home', (req, res) =>
    res.send(render(`<h1>Hola, ${user.username}!`))
)

app.listen(port)