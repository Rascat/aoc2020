import { InputHandler } from './InputHandler';


function part1(input: string): number {
    let stack: Array<number> = input.split(',').map(x => parseInt(x));

    while(stack.length < 2020) {
        let lastNumber: number = stack[stack.length - 1];
    
        let nextNumber: number = 0;
        for (let i = stack.length - 2; i >= 0; i--) {
            let prevNumber: number = stack[i];
            if (prevNumber === lastNumber) {
                nextNumber = (stack.length - 1) - i;
                break;
            }
        }
        stack.push(nextNumber);
    }
    return stack[stack.length -1];
}

function part2(input: string): number {
    let initialNumbers: Array<number> = input.split(',').map(x => parseInt(x));

    let lastOccurrenceMap: Map<number, number> = new Map();
    for (let i = 0; i < initialNumbers.length - 1; i++) {
        lastOccurrenceMap.set(initialNumbers[i], i + 1);
    }

    let numberIndex: number = initialNumbers.length;
    let lastNumber: number = initialNumbers[initialNumbers.length - 1];
    let nextNumber: number;

    while(numberIndex < 30000000) {

        if (lastOccurrenceMap.has(lastNumber)) {
            nextNumber = numberIndex - lastOccurrenceMap.get(lastNumber);
        } else {
            nextNumber = 0;
        } 

        lastOccurrenceMap.set(lastNumber, numberIndex);
        lastNumber = nextNumber;
        numberIndex++;
    }

    return lastNumber;
}

let handler = new InputHandler();
let input: string = handler.readFile('./input/day15_input.txt');

console.log(part2(input));
