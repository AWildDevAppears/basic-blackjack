export const AI = {
    BASIC: {
        holdAt: 17,
    },
    HIGH: {
        holdAt: 18,
    },
    LOW: {
        holdAt: 16,
    }
};

export class Competitor {
    hand = [];
    
    constructor(name, AI) {
        this.name = name;
        this.AI = AI || AI.NONE;
    }

    countHand() {
        let totalOne = 0;
        let totalTwo = 0;

        this.hand.forEach((card) => {
            if (Array.isArray(card.value)) {
                totalOne += card.value[0];
                totalTwo += card.value[1];
            } else {
                totalOne += card.value;
                totalTwo += card.value;
            }
        });

        return [totalOne, totalTwo];
    }

    bestHand() {
        const [totalOne, totalTwo] = this.countHand();

        if (totalOne > 21) {
            return totalTwo;
        }
        if (totalTwo > 21) {
            return totalOne;
        }

        if (21 - totalOne > 21 - totalTwo) {
            return totalTwo;
        }
        return totalOne;
    }

    play(onHit) {
        if (!this.AI) return;
        let playing = true;

        while (playing) {
            if (this.bestHand() < this.AI.holdAt) {
                onHit()
            } else {
                playing = false;
            }
        }
    }
}