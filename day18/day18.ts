import { InputHandler } from '../InputHandler';
let path = require('path');
let parser1 = require('./parser1.js');
let parser2 = require('./parser2.js');

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'day18_input.txt'));

function part1(input: Array<string>): number {
    let sum: number = 0;
    for (let exp of input) {
        sum += parser1.parse(exp);
    }
    return sum
}

function part2(input: Array<string>): number {
    let sum: number = 0;
    for (let exp of input) {
        sum += parser2.parse(exp);
    }
    return sum;
}

console.log(part2(input));
