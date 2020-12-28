import { InputHandler } from '../InputHandler';
import * as path from 'path';

function transform(loopSize: number, sn: number = 7): number {
    let value: number = 1;
    let prime = 20201227;
    for (let i = 0; i < loopSize; i++) {
        value *= sn;
        value = value % prime;
    }

    return value;
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));
let cardPubKey: number = parseInt(input[0]);
let doorPubKey: number = parseInt(input[1]);

let loopCount = 1;
let value = 1;
let sn = 7;
while(true) {
    value = (value * sn) % 20201227;
    if (value === cardPubKey) break;
    loopCount++
}

console.log(transform(loopCount, doorPubKey));
