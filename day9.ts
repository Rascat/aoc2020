import { InputHandler } from './InputHandler';

let handler = new InputHandler();
let input: Array<number> = handler.getInputAsListOfInt('./input/day9_input.txt');

function part1(input: Array<number>): number {
    let wStart: number = 0;
    let wEnd : number = 24;
    let pointer: number = 25;

    main: while (pointer < input.length) {

        for (let i = wStart; i <= wEnd; i++) {
            for (let j = wStart; j <= wEnd; j++) {

                if (i !== j && input[i] !== input[j]) {
                    if (input[i] + input[j] === input[pointer]) {
                        wStart++;
                        wEnd++;
                        pointer++;
                        continue main;
                    }
                }
            }
        }
        break;
    }
    return input[pointer];
}

function part2(input: Array<number>): number {
    let target: number = 23278925;
    let wStart: number = 0;
    let wEnd: number = 1;

    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i+1; j < input.length; j ++) {
            let range = input.slice(i, j + 1);
            let sum = range.reduce((a, b) => a + b, 0);
            if (sum === target) {
                return Math.min(...range) + Math.max(...range);
            } else if (sum > target) {
                break;
            }
        }
    }
    return -1;
}

console.log(part2(input));
// 23278925