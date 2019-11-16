const express = require('express')
const TextGen = require('./textgen/TextGen')
const AWS = require('aws-sdk')
const Fs = require('fs')

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
                Fs.writeFile("./speach/text.mp3", data.AudioStream, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    res.send("127.0.0.1" + __dirname + "/speach/text.mp3")
                })
            }
        }
    })
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
