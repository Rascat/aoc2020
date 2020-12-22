import { InputHandler } from '../InputHandler';
import * as path from 'path'

class Player {
    deck: Array<number>;

    constructor(deck: Array<number>) {
        this.deck = deck
    }

    static fromString(str: string): Player {
        let rows: Array<string> = str.split('\n');
        // ignore first row
        rows.splice(0, 1)

        return new Player(rows.map<number>(x => parseInt(x)));
    }

    drawTopCard(): number {
        return this.deck.splice(0, 1)[0];
    }

    addCardsToDeck(higher: number, lower: number): void {
        this.deck.push(higher);
        this.deck.push(lower)
    }

    get score(): number {
        let mult = 1;
        let score = 0;
        for (let i = this.deck.length - 1; i >= 0; i--) {
            score += this.deck[i] * mult;
            mult++;
        }

        return score;
    }
}

function recursiveCombat(player1: Player, player2: Player, game: number = 1): boolean {
    
    let configurations: Array<string> = [];
    let countRound: number = 1

    while (true) {
        
        let configuration: string = player1.deck.join(',') + '@' + player2.deck.join(',');

        if (configurations.includes(configuration)) {
            
            return true;
        }

        configurations.push(configuration);

        let topP1: number = player1.drawTopCard();
        let topP2: number = player2.drawTopCard();
        
        if (topP1 <= player1.deck.length && topP2 <= player2.deck.length) {
            let deck1Copy: Array<number> = player1.deck.slice(0, topP1);
            let deck2Copy: Array<number> = player2.deck.slice(0, topP2);
            
            if (recursiveCombat(new Player(deck1Copy), new Player(deck2Copy), game + 1)) {
                player1.addCardsToDeck(topP1, topP2);
                
            } else {
                player2.addCardsToDeck(topP2, topP1);
            }
        } else {
            if (topP1 > topP2) {
                player1.addCardsToDeck(topP1, topP2);
            } else {
                player2.addCardsToDeck(topP2, topP1);
            }
        }

        if (player1.deck.length === 0) {

            return false;
        }

        if (player2.deck.length === 0) {

            return true;
        }

        countRound++;
    }
}

function part1(input: Array<string>): number {
    let player1 = Player.fromString(input[0]);
    let player2 = Player.fromString(input[1]);
    let score: number;
    while (true) {
        let topP1 = player1.drawTopCard();
        let topP2 = player2.drawTopCard();

        if (topP1 > topP2) {
            player1.addCardsToDeck(topP1, topP2)
        } else {
            player2.addCardsToDeck(topP2, topP1);
        }

        if (player1.deck.length === 0) {
            console.log('Player2 won');

            score = player2.score;
            break;
        }

        if (player2.deck.length === 0) {
            console.log('Player1 won');

            score = player1.score;
            break;
        }
    }

    return score;
}

function part2(input: Array<string>): void {
    let player1 = Player.fromString(input[0]);
    let player2 = Player.fromString(input[1]);

    if(recursiveCombat(player1, player2)) {
        console.log(`Player1 won with ${player1.score} points.`);
        
    } else {
        console.log(`Player2 won with ${player2.score} points`);
        
    }
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'), '\n\n');

part2(input);






