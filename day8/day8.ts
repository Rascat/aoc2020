import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Instruction {
    operation: string;
    arg: number

    constructor(data: string) {
        this.operation = data.substring(0, 3);
        this.arg = parseInt(data.substring(4));
    }
}

let handler = new InputHandler();
let input = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

let instructions: Array<Instruction> = input.map<Instruction>(x => new Instruction(x))

function part1(instructions: Array<Instruction>): number {
    let acc: number = 0;
    let pointer: number = 0;
    let callStack: Array<number> = []

    while (true) {
        let instruction: Instruction = instructions[pointer];
        
        if (instruction.operation === 'acc') {
            acc += instruction.arg;
            pointer++;
        } else if (instruction.operation === 'jmp') {
            pointer += instruction.arg;
        } else if (instruction.operation === 'nop') {
            pointer++;
        } else {
            throw Error(`Unknown operation ${instruction.operation}`);
        }

        if (callStack.indexOf(pointer) !== -1) break;
        else callStack.push(pointer);
    }
    return acc;
}

function runSwapped(instructions: Array<Instruction>, swapIndex: number): number {
    let acc: number = 0;
    let pointer: number = 0;
    let callStack: Array<number> = []

    while (true) {
        let instruction: Instruction = instructions[pointer];
        
        if (instruction.operation === 'acc') {
            acc += instruction.arg;
            pointer++;
        } else if (instruction.operation === 'jmp') {
            if (pointer === swapIndex) {
                pointer++;
            } else {
                pointer += instruction.arg;
            }
        } else if (instruction.operation === 'nop') {
            if (pointer === swapIndex) {
                pointer += instruction.arg
            } else {
                pointer++
            }
        } else {
            throw Error(`Unknown operation ${instruction.operation}`);
        }

        if (pointer === instructions.length) break;
        else callStack.push(pointer);
    }
    return acc;
}

function terminatesIfSwapped(instructions: Array<Instruction>, swapIndex: number): boolean {
    let acc = 0;
    let pointer: number = 0;
    let callStack: Array<number> = []

    while (true) {
        let instruction: Instruction = instructions[pointer];
        
        if (instruction.operation === 'acc') {
            acc += instruction.arg;
            pointer++;
        } else if (instruction.operation === 'jmp') {
            if (pointer === swapIndex) {
                pointer++;
            } else {
                pointer += instruction.arg;
            }
        } else if (instruction.operation === 'nop') {
            if (pointer === swapIndex) {
                pointer += instruction.arg
            } else {
                pointer++
            }
        } else {
            throw Error(`Unknown operation ${instruction.operation}`);
        }

        if (callStack.indexOf(pointer) !== -1) return false;
        else if (pointer === instructions.length) return true;
        else callStack.push(pointer);
    }
}

function part2(instructions: Array<Instruction>): number {

    let swapIndex: number;

    for (let i in instructions) {

        if (instructions[i].operation === 'acc') {
            // do nothing
        } else if (instructions[i].operation === 'nop' || instructions[i].operation == 'jmp') {
            if (terminatesIfSwapped(instructions, parseInt(i))) {
                swapIndex= parseInt(i);
                break;
            }
        } 
    }

    return runSwapped(instructions, swapIndex);
}


console.log(part2(instructions));