const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

http.get(url, res => {
    // res.setEncoding('utf8')

    res.pipe(bl((error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    }))
})