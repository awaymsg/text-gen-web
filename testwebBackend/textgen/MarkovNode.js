const MarkovChain = require('./MarkovChain')

module.exports = class MarkovNode {
    
    constructor(word) {
        this.word = word
        this.starter = false
        this.ender = false
        this.next = null
        this.nextWords = new MarkovChain()
    }

    addToChain(s) {
        this.nextWords.addMarkovNode(s)
    }

    hasWord(s) {
        if (word === s) return true
        return false
    }
}