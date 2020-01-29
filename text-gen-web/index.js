const express = require('express')
const TextGen = require('./textgen/TextGen')
const AWS = require('aws-sdk')
const Fs = require('fs')

const app = express()
let textgenLotr = new TextGen()
let textgenGot = new TextGen()

app.use(express.static("frontend/dist/"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000, function() {
    textgenLotr.read("training-files/lotr.txt")
    textgenGot.read("training-files/got.txt")
    console.log("Listening on port 3000")
})

app.get("/", function(req, res) {
    res.sendFile("frontend/dist/index.html", {root: __dirname})
})

app.get("/astar.html", function(req, res) {
    res.sendFile("frontend/dist/astar.html", {root: __dirname})
})

app.post("/generate-text", function(req, res) {
    let sentence = "";
    if (req.body.data === "lotr") {
        sentence = textgenLotr.generateSentence()
    }
    else if (req.body.data === "got") {
        sentence = textgenGot.generateSentence()
    }
    res.send(sentence)
})

app.post("/read-sentence", function(req, res) {
    const Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    })

    let params = {
        Text: req.body.data,
        OutputFormat: 'mp3',
        VoiceId: 'Amy'
    }

    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                Fs.writeFile("./frontend/dist/text.mp3", data.AudioStream, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    res.send(true)
                })
            }
        }
    })
})

// app.post("/change-file", function(req, res) {
//     textgen = new TextGen()
//     if (req.body.data === "lotr") {
//         textgen.read("training-files/lotr.txt")
//         lotr = true
//     }
//     else if (req.body.data === "got") {
//         textgen.read("training-files/got.txt")
//         lotr = false
//     }
// })
