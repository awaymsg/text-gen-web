const express = require('express')
const TextGen = require('./textgen/TextGen')
const app = express()
let textgen = new TextGen()

app.use(express.static("frontend/dist/"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000, function() {
    console.log("Listening on port 3000")
    textgen.read("training-files/lotr.txt")
})

app.get("/", function(req, res) {
    res.sendFile("frontend/dist/index.html", {root: __dirname})
})

app.get("/gen-sentence", function(req, res) {
    let sentence = textgen.generateSentence()
    //console.log(sentence)
    res.send(sentence)
})

app.post("/change-file", function(req, res) {
    textgen = new TextGen()
    if (req.body.data === "lotr") {
        textgen.read("training-files/lotr.txt")
    }
    else if (req.body.data === "got") {
        textgen.read("training-files/got.txt")
    }
})

// app.post("/change-got", function(req, res) {
//     textgen = new TextGen()
//     textgen.read("training-files/got.txt")
// })