const cardValues = {
    'Ace': {
        value: [1, 11],
    },
    '2': {
        value: 2,
    },
    '3': {
        value: 3,
    },
    '4': {
        value: 4,
    },
    '5': {
        value: 5,
    },
    '6': {
        value: 6,
    },
    '7': {
        value: 7,
    },
    '8': {
        value: 8,
    },
    '9': {
        value: 9,
    },
    '10': {
        value: 10,
    },
    'Jack': {
        value: 10,
    },
    'Queen': {
        value: 10,
    },
    'King': {
        value: 10,
    },
}

function createSuit(suit) {
    return [
        new Card(suit, 'Ace'),
        new Card(suit, '2'),
        new Card(suit, '3'),
        new Card(suit, '4'),
        new Card(suit, '5'),
        new Card(suit, '6'),
        new Card(suit, '7'),
        new Card(suit, '8'),
        new Card(suit, '9'),
        new Card(suit, '10'),
        new Card(suit, 'Jack'),
        new Card(suit, 'Queen'),
        new Card(suit, 'King'),
    ]
}

export class Card {
    constructor(suit, name) {
        for (let k in cardValues[name]) {
            this[k] = cardValues[name][k];
        }
        this.name = name;
        this.suit = suit;
    }
}

export class Deck {
    constructor(decks) {
        let deck = [];
        
        for (let i = 0; i < decks; i++) {
            deck = deck.concat([
                ...createSuit('hearts'),
                ...createSuit('spades'),
                ...createSuit('clubs'),
                ...createSuit('diamonds'),
            ]); 
        }
        
        // Shuffle the deck
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        this.deck = deck;
    }

    splice() {
        return this.deck.splice(...arguments);
    }
}