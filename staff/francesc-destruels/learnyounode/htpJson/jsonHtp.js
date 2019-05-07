const http = require('http')
const url = require('url')
const port = process.argv[2] // Puerto que usara como request

function answerTime(time, boolean) {
    if (!boolean) {
        const hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
        const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
        const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()

        return { "hour": hour, "minute": minutes, "second": seconds }

    } else {
        const unixtime = time.getTime()

        return { "unixtime": unixtime }
    }
}

const server = http.createServer((req, res) => { // creamos un server que no es mas algo que pilla una request y emite una respuesta
    if (req.method !== 'GET') res.end('GET or nothing') 
    let data = url.parse(req.url, true)
    let time = new Date(data.query.iso)
    let answer

    console.log(data)

    if (data.pathname === '/api/parsetime') {
        answer = answerTime(time)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(answer))

    } else if (data.pathname === '/api/unixtime') {
        answer = answerTime(time, true)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(answer))

    } else {
        res.writeHead(404)
        res.end()
    }
})

server.listen(port)




