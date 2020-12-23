import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Game1 {
    circle: Array<number>;
    currentCup: number;
    destination: number;
    circleLength: number;

    constructor(circleStr: string) {
        this.circle = circleStr.split('').map<number>(x => parseInt(x));
        this.circleLength = this.circle.length;
        this.currentCup = this.circle[0];
    }


    followingThreeCups(cup: number): Array<number> {
        if (cup === null || cup === undefined) {
            throw new Error(`Error must be a valid number. Was ${cup}`)
        }

        let index = this.circle.indexOf(cup); // 6
        let result: Array<number> = [];
        if (index <= this.circle.length - 4) {
            result = result.concat(this.circle.splice(index + 1, 3));
        } else {
            let res = index - (this.circle.length - 4);
            result = result.concat(this.circle.splice(index + 1, 3));
            result = result.concat(this.circle.splice(0, res));
        }

        if (!(result.length === 3)) {
            throw new Error(`Should return three elements. Instead returned: ${result}`)
        }

        return result;
    }

    updateDestination(): void {
        for (let i = 1; i < 10; i++) {
            let destination = (10 + (this.currentCup - i)) % 10;

            if (this.circle.includes(destination)) {
                this.destination = destination;
                return;
            }
        }
        throw new Error('Could not find destination cup for current cup: ' + this.currentCup);
    }

    placeThreeCupsAfterCup(cup: number, threeCups: Array<number>) {
        let index: number = this.circle.indexOf(cup)
        this.circle.splice(index + 1, 0, ...threeCups);
    }

    updateCurrentCup() {
        let index = this.circle.indexOf(this.currentCup);
        this.currentCup = this.circle[(index + 1) % this.circleLength]
    }

    move(): void {
        let followingCups: Array<number> = this.followingThreeCups(this.currentCup);
        // console.log(followingCups);
        this.updateDestination();
        this.placeThreeCupsAfterCup(this.destination, followingCups);
        console.log(this);

        this.updateCurrentCup();
    }

    get solution(): string {
        let indexOf1 = this.circle.indexOf(1);
        let index = (indexOf1 + 1) % this.circle.length;
        let solution = '';
        while (index !== indexOf1) {
            solution = solution + this.circle[index]
            index = (index + 1) % this.circle.length;
        }

        return solution;
    }
}

class Game2 {
    circle: Array<number>;
    currentCup: number;
    destination: number;
    circleLength: number;

    constructor(circleStr: string) {
        this.circle = circleStr.split('').map<number>(x => parseInt(x));
        let maxCup = Math.max(...this.circle);
        for (let cup = maxCup + 1; cup <= 1_000_000; cup++) {
            this.circle.push(cup)
        }
        this.circleLength = this.circle.length;
        this.currentCup = this.circle[0];
    }


    followingThreeCups(cup: number): Array<number> {
        if (cup === null || cup === undefined) {
            throw new Error(`Error must be a valid number. Was ${cup}`)
        }

        let index = this.circle.indexOf(cup);
        let result: Array<number> = [];
        if (index <= this.circle.length - 4) {
            result = result.concat(this.circle.splice(index + 1, 3));
        } else {
            let res = index - (this.circle.length - 4);
            result = result.concat(this.circle.splice(index + 1, 3));
            result = result.concat(this.circle.splice(0, res));
        }

        if (!(result.length === 3)) {
            throw new Error(`Should return three elements. Instead returned: ${result}`)
        }

        return result;
    }

    updateDestination(): void {
        for (let i = 1; i < this.circleLength + 1; i++) {
            let destination = (10 + (this.currentCup - i)) % 10;

            if (this.circle.includes(destination)) {
                this.destination = destination;
                return;
            }
        }
        throw new Error('Could not find destination cup for current cup: ' + this.currentCup);
    }

    placeThreeCupsAfterCup(cup: number, threeCups: Array<number>) {
        let index: number = this.circle.indexOf(cup)
        this.circle.splice(index + 1, 0, ...threeCups);
    }

    updateCurrentCup() {
        let index = this.circle.indexOf(this.currentCup);
        this.currentCup = this.circle[(index + 1) % this.circleLength]
    }

    move(): void {
        let followingCups: Array<number> = this.followingThreeCups(this.currentCup);
        // console.log(followingCups);
        this.updateDestination();
        this.placeThreeCupsAfterCup(this.destination, followingCups);
        // console.log(this);

        this.updateCurrentCup();
    }

    get solution(): number {
        let indexOf1 = this.circle.indexOf(1);
        let i = (indexOf1 + 1) % this.circleLength;
        let j = (indexOf1 + 2) % this.circleLength;

        return this.circle[i] * this.circle[j];
    }
}

function part1(input: string): string {
    let game: Game1 = new Game1(input);

    for (let i = 0; i < 100; i++) {
        game.move();
    }
    
    return game.solution;
}

function part2(input: string): number {
    let game: Game2 = new Game2(input);

    for (let i = 0; i < 10_000_000; i++) {
        // console.log(i);
        
        game.move();
        console.log(game.currentCup);
        
    }

    return game.solution;
}

let handler = new InputHandler();
let input: string = handler.readFile(path.join(__dirname, 'test.txt'));

console.log(part2(input));




