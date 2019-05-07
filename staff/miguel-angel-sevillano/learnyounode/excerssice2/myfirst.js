
var fs= require('fs')



var buffer =fs.readFileSync(`${process.argv[2]}`)

var result = buffer.toString()
var final= result.split("\n")

console.log(final.length-1)