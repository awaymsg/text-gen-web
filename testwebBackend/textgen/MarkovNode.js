module.exports = class MarkovNode {
    
    constructor(word, propNoun) {
        this.MarkovChain = require('./MarkovChain')
        this.word = word
        this.starter = false
        this.ender = false
        this.next = null
        this.nextWords = new this.MarkovChain()
    }

    addToChain(s, propNoun) {
        this.nextWords.addMarkovNode(s)
    }

    hasWord(s) {
        if (word === s) return true
        return false
    }
}