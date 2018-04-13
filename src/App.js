import React, { Component } from 'react';

import { Deck } from './models/Deck';
import { Competitor, AI } from './models/Competitor';

import Cards from './components/Cards';

import './App.css';

class App extends Component {
    state = {
        deck: new Deck(1),
        competitors: {
            'player': new Competitor('player', false),
            'basic': new Competitor('basic player', AI.BASIC),
            'high': new Competitor('high player', AI.HIGH),
            'low': new Competitor('low player', AI.LOW),
        },
        winner: '',   
    }

    componentDidMount() {
        for (let k in this.state.competitors) {
            this.deal(2, k);
        }
    }
    
    render() {
        return (
            <div className="App">
                { Object.values(this.state.competitors).map((competitor) => <Cards key={competitor.name} for={competitor} />) }

                { this.showHitButton() }
                <button onClick={ () => this.compareHands() }>Stand</button>

                { this.showWinner() }
            </div>
        );
    }

    deal(amount, to) {
        const competitors = this.state.competitors;
        const competitor = competitors[to];

        for (let i = 0; i < amount; i++) {
            competitor.hand.push(this.state.deck.splice(0, 1)[0]);
        }

        competitors[to] = competitor;

        this.setState({
            ...this.state,
            competitors,
        });
    }

    showWinner() {
        if (!this.state.winner) {
            return '';
        }

        if (Array.isArray(this.state.winner)) {
            return (
                <div>
                    <h2>Draw!</h2>
                    <ul>
                        { this.state.winner.map((winner) => <li>{ winner.name }</li>) }
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <h2>Winner!</h2>
                <p>{ this.state.winner.name }</p>
            </div>
        )
    }

    showHitButton() {
        if (this.state.winner) {
            return false;
        } 

        return this.state.competitors['player'].bestHand() < 21 ? 
            (<button onClick={ () => this.deal(1, 'player')}>Hit</button>) : 
            '';
    }

    compareHands() {
        let winner;

        for (let k in this.state.competitors) {
            const competitor = this.state.competitors[k];
            competitor.play(() => this.deal(1, k))
        }

        const validCompetitors = this.filterCompetitorsOver21();

        validCompetitors.forEach((competitor) => {
            if (!winner) {
                winner = competitor;
                return;
            } 

            const winnerHand = Array.isArray(winner) ? winner[0].bestHand() : winner.bestHand();
            const competitorHand = competitor.bestHand(); 

            if (competitorHand > winnerHand) {
                winner = competitor;
            } else if (competitorHand === winnerHand) {
                if (Array.isArray(winner)) {
                    winner.push(competitor);
                } else {
                    winner = [
                        winner,
                        competitor,
                    ];
                }
            }
        });
        this.setState({
            ...this.state,
            winner,
        });
    }

    filterCompetitorsOver21() {
        return Object.values(this.state.competitors).filter((competitor) => {
            return competitor.bestHand() <= 21
        });
    }
}

export default App;
