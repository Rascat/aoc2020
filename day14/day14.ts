import { InputHandler } from '../InputHandler';
import * as path from 'path';

class V1Emulator {

    memory: Map<number, number>;
    mask: string;

    constructor() {
        this.memory = new Map();
        this.mask = '';
    }

    applyInstruction(instruction: string): void {
        let keyValue: Array<string> = instruction.split(' = ');
        if (keyValue[0] === 'mask') this.updateMask(keyValue[1]);
        else {
            let address: number = parseInt(keyValue[0].match(/\d+/g)[0]);
            let value: number = parseInt(keyValue[1]);
            let maskedValue = this.applyMask(value);
            this.memory.set(address, maskedValue);
        }
    }

    updateMask(mask: string) {
        this.mask = mask;
    }

    applyMask(value: number): number {
        let valueBin: string = value.toString(2).padStart(36, '0');

        for (let i = 0; i < this.mask.length; i++) {
            if (this.mask[i] === 'X') continue;
            else {
                valueBin = valueBin.substring(0, i) + this.mask[i] + valueBin.substring(i + 1);
            }
        }
        return parseInt(valueBin, 2);
    }
}

class V2Emulator {
    memory: Map<number, number>;
    mask: string;

    constructor() {
        this.memory = new Map();
        this.mask = '';
    }

    applyInstruction(instruction: string): void {
        let keyValue: Array<string> = instruction.split(' = ');
        if (keyValue[0] === 'mask') this.updateMask(keyValue[1]);
        else {
            let address: number = parseInt(keyValue[0].match(/\d+/g)[0]);
            let addressBin: string = address.toString(2).padStart(36, '0');
            let value: number = parseInt(keyValue[1]);
            let addressSpace: Array<number> = this.computeAddrSpace(addressBin).map<number>(x => this.applyMaskToAddress(x));

            for (let address of addressSpace) {
                this.memory.set(address, value);
            }
        }
    }

    applyMaskToAddress(address: number): number {
        let addressBin = address.toString(2).padStart(36, '0');
        for (let i = 0; i < this.mask.length; i++) {
            if (this.mask[i] === '1') addressBin = this.updateCharAt(addressBin, i, '1');
        }

        return parseInt(addressBin, 2);
    }

    countX(mask: string): number {
        return (mask.match(/X/g) || []).length;
    }

    updateMask(mask: string) {
        this.mask = mask;
    }

    computeAddrSpace(addr: string): Array<number> {
        let xIndex: Array<number> = [];
        let addrSpace: Array<number> = [];
        for (let i = 0; i < this.mask.length; i++) {
            if (this.mask[i] === 'X') xIndex.push(i);
        }

        let vars: number = 2 ** (this.countX(this.mask));


        for (let i = 0; i < vars; i++) {
            let iBin: string = i.toString(2).padStart(xIndex.length, '0');
            let newAddr = addr;
            for (let j = 0; j < xIndex.length; j++) {
                newAddr = this.updateCharAt(newAddr, xIndex[j], iBin[j]);
            }

            addrSpace.push(parseInt(newAddr, 2))
        }

        return addrSpace;
    }

    updateCharAt(str: string, index: number, char: string): string {
        return str.substring(0, index) + char + str.substring(index + 1);
    }
}

function part1(input: Array<string>): number {
    let emulator = new V1Emulator();
    for (let instruction of input) {
        emulator.applyInstruction(instruction);
    }

    let mem = emulator.memory;
    let sum = 0;
    for (let val of mem.values()) {
        sum += val;
    }

    return sum;
}

function part2(input: Array<string>): number {
    let emulator = new V2Emulator();


    for (let instruction of input) {
        emulator.applyInstruction(instruction)
    }

    let sum: number = 0;
    for (let value of emulator.memory.values()) {
        sum += value;
    }

    return sum;
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));
console.log(part2(input));