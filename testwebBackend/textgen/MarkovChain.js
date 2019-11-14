const MarkovNode = require('./MarkovNode').default

module.exports = class MarkovChain {

    constructor() {
        this.head = null;
        this.size = 0;
    }

    addMarkovNode(s) {
        let newNode = new MarkovNode(s);
        if (s === "." || s === "!" || s === "?") newNode.ender = true;
        if (this.head == null) this.head = newNode;
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
        console.log(this.size)
    }

    isEmpty() {
        if (this.head == null) return true;
        return false;
    }

    moveToFront(previous, current) {
        previous.next = current.next
        current.next = this.head
        this.head = current
    }

    getWord(index) {
        if (index >= this.size) {
            console.log("s: " + this.size)
            console.log(index)
            throw "Index Out of Bounds"
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current.word;
    }

    contains(s) {
        if (this.head == null) return false
        if (this.head.word === s) return true

        let current = head.next
        let previous = head
        while (current != null) {
            if (current.word === s) {
                moveToFront(previous, current)
                return true
            }
            previous = current
            current = current.next
        }
        return false
    }

    getNode(s) {
        let current = this.head
        while (current != null) {
            if (current.word === s) {
                return current
            }
            current = current.next
        }
        throw "List not contain this word."
    }

    toString() {
        let current = this.head
        let s = ""
        while (current != null) {
            s += current.word + "[" + current.nextWords.size + "] - "
            for (let i = 0; i < current.nextWords.size; i++) {
                s += current.nextWords.getWord(i) + " "
            }
            s += "\n"
            current = current.next
        }
        return s
    }

    getStarterWord() {
        let starterWords = new MarkovChain()
        let current = this.head
        while (current != null) {
            if (current.starter) {
                starterWords.addMarkovNode(current.word);
            }
            current = current.next;
        }

        let index = Math.floor(Math.random() * starterWords.size);
        return starterWords.getWord(index);
    }
}