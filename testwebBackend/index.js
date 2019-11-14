const express = require('express')
const TextGen = require('./textgen/TextGen')
const app = express()
const textgen = new TextGen()

app.use(express.static("public"))

app.listen(3000, function() {
    console.log("Listening on port 3000")
    textgen.read("training-files/lotr.txt")
    //let sentence = textgen.generateSentence()
    //console.log(sentence)
})

app.get("/", function(req, res) {
    let sentence = textgen.generateSentence()
    console.log(sentence)
    res.write(sentence)
})