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
    let stack: Array<number> = input.split(',').map(x => parseInt(x));

    let lastOccurrenceMap: Map<number, number> = new Map();
    for (let i = 0; i < stack.length - 1; i++) {
        lastOccurrenceMap.set(stack[i], i + 1);
    }

    while(stack.length < 30000000) {
        let lastNumber: number = stack[stack.length - 1];
    
        let nextNumber: number;
        if (lastOccurrenceMap.has(lastNumber)) {
            nextNumber = stack.length - lastOccurrenceMap.get(lastNumber);
        } else {
            nextNumber = 0;
        } 

        lastOccurrenceMap.set(lastNumber, stack.length);
        stack.push(nextNumber);
    }
    return stack[stack.length -1];
}

let handler = new InputHandler();
let input: string = handler.readFile('./input/day15_input.txt');

console.log(part2(input));
