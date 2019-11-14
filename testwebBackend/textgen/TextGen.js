const lineReader = require("line-reader")
const fs = require("fs")

module.exports = class TextGen {
    
    constructor() {
        this.MarkovChain = require('./MarkovChain')
        this.chain = new this.MarkovChain()
        this.sentenceCount = 2
    }

    read(path) {
        let s = ""
        var self = this
        lineReader.eachLine(path, function(line, last) {
            s += line + " "
            if (last) {
                //console.log(s)
                self.createMarkovChain(s)
                return false
            }
        })
        
        return true
    }

    makeUpper(word) {
        let temp = word.charAt(0)
        temp = temp.toUpperCase()
        word = temp + word.substring(1)
        return word
    }

    generateSentence() {
        let midSentence = false
        let wordCount = 0
        let minWords = Math.floor(Math.random() * 10 + 3)
        let sentence = ""
        let word = ""
        let currentNode = null

        while (true) {
            let index = 0

            //gets a starting word if starting a new sentence
            if (!midSentence) {
                word = this.chain.getStarterWord()
                currentNode = this.chain.getNode(word)
                //make first word upper case
                word = this.makeUpper(word)
                sentence += word + " "
                midSentence = true
            }

            //randomly change word sometimes
            // if (Math.random() * 10 < 0.1) {
            //     index = Math.floor(Math.random() * this.chain.size)
            //     word = this.chain.getWord(index)
            //     currentNode = this.chain.getNode(word)
            // }

            //gets a random word from the chain in the MarkovNode
            index = Math.floor(Math.random() * currentNode.nextWords.size)
            if (index > currentNode.nextWords.size) index--
            word = currentNode.nextWords.getWord(index)
            currentNode = this.chain.getNode(word)

            //ensure sentence is not too short
            while (wordCount < minWords && currentNode.ender || currentNode.starter) {
                index = Math.floor(Math.random() * this.chain.size)
                word = this.chain.getWord(index)
                currentNode = this.chain.getNode(word)
            }

            //special instructions for special characters
            if (word === "." || word === "!" || word === "," || word === "?" || word === ";" || word === ":") {
                if (sentence.charAt(sentence.length - 1) === ' ') {
                    sentence = sentence.substring(0, sentence.length - 1)
                }
                sentence += word + " "

                //returns the sentence if it is ended
                if (word !== "," && word !==";" && word !== ":") return sentence
            } else if (word === "-" || word === "/") {
                if (sentence.charAt(sentence.length - 1) === ' ') {
                    sentence = sentence.substring(0, sentence.length - 1)
                }
                sentence += word
            } else {
                sentence += word + " "
            }
            wordCount++
        }
    }

    createMarkovChain(line) {
        let word = ""
        let digits = ""
        let lookForDigits = false
        let previous = null

        for (let i = 0; i < line.length; i++) {
            let a = line.charAt(i)

            //build digits by character
            if (a.match("/\d/") || a === "$" && !lookForDigits) {
                lookForDigits = true
                digits += "" + a
                continue
            }
            if (a.match("/\d/") || a === "$" && lookForDigits) {
                digits += "" + a
                continue
            }
            if (!a.match("/\d/") && lookForDigits) {
                lookForDigits = false
                if (!this.chain.contains(digits)) {
                    this.chain.addMarkovNode(digits)
                }
                if (previous != null) {
                    if (previous.word === ".") this.chain.getNode(digits).starter = true
                    previous.addToChain(digits)
                }
                previous = this.chain.getNode(digits)
                digits = ""
            }

            //build words by character
            if (!a.match(/[a-z]/i) && a !== "\'" || i == line.length - 1) {
                if (word != "") {
                    //add completed word

                    //word = word.toLowerCase()
                    if (word.charAt(0) === "\'" || word.charAt(0) === "\"") word = word.substring(1)
                    if (word.charAt(word.length - 1) === '\'') word = word.substring(0, word.length - 1)
                    if (!this.chain.contains(word)) {
                        this.chain.addMarkovNode(word)
                    }
                    if (previous != null) {
                        if (previous.word === ".") this.chain.getNode(word).starter = true
                        previous.addToChain(word)
                    }
                    previous = this.chain.getNode(word)
                    word = ""

                    //add special characters
                    if (a == "\"" || a == "\“" || a == "’" || a == ")" || a == "(") continue
                    if (a != " ") {
                        if (!this.chain.contains(a)) {
                            this.chain.addMarkovNode(a)
                        }
                        previous.addToChain(a, false)
                        previous = this.chain.getNode(a)
                    }
                }
            } else {
                word += "" + a
            }
        }

        // let sentence = this.generateSentence()
        // console.log(sentence)
        // console.log(this.chain.toString())
    }
}