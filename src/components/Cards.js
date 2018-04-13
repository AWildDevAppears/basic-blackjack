import React, { Component } from 'react';

export default class Cards extends Component {
    state = {
        hand: this.props.for.hand,
    }

    render() {
        return (
            <div>
                <h3>{ this.props.for.name }</h3>
                <ul>
                    { this.state.hand.map((card) => (
                        <li className="card" key={ card.name + card.suit }>
                            <i className="card__suit card__suit--top" className={ card.suit }></i>
                            <div className="card__name">{ card.name } of { card.suit }</div>
                            <i className="card__suit card__suit--bottom" className={ card.suit }></i>
                        </li>
                    ))  }
                </ul>

                <h2>{this.outputHandCount()}</h2>
            </div>
        );
    }

    isOver(val) {
        return val > 21;
    }

    outputHandCount() {
        const hand = this.props.for.bestHand();

        if (hand === 21) {
            return 'BlackJack';
        }

        if (this.isOver(hand)) {
            return 'You lose';
        }
        
        return `Total: ${hand}`;
    }
}
