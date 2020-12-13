import { InputHandler } from './InputHandler';
import { performance } from 'perf_hooks';

function part1(input: Array<string>): number {
    let minArrivalTime: number = parseInt(input[0]);
    let activeBusses: Array<number> = input[1]
        .split(',')
        .filter(x => x !== 'x')
        .map<number>(x => parseInt(x));

    let idArrivalTimePairs: Array<[number, number]> = [];

    for (let bus of activeBusses) {
        let departure: number = 0;

        while (departure < minArrivalTime) {
            departure += bus;
        }

        idArrivalTimePairs.push([bus, departure]);
    }

    idArrivalTimePairs = idArrivalTimePairs.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0
    })

    return (idArrivalTimePairs[0][1] - minArrivalTime) * idArrivalTimePairs[0][0]
}

function mulInv(a: bigint, b: bigint): bigint {
    let b0: bigint = BigInt(b);
    let x0: bigint = BigInt(0);
    let x1: bigint = BigInt(1);

    if (b === BigInt(1)) return BigInt(1);

    while (a > 1) {
        let q: bigint = a / b;
        let amb: bigint = a % b;
        a = b;
        b = amb;
        let xqx: bigint = x1 - q * x0;
        x1 = x0;
        x0 = xqx;
    }

    if (x1 < 0) x1 += b0;

    return x1;
}

function absmod(a: bigint, n: bigint): bigint {
    while(a < 0) {
        a += n;
    }
    return a % n;
}

function chineseRemainderTheorem(moduli: bigint[], values: bigint[]): bigint {
    let prod: bigint = moduli.reduce<bigint>((a, b) => a * b, BigInt(1));

    let p: bigint = BigInt(0);
    let sm: bigint = BigInt(0);
    for (let i = 0; i < moduli.length; i++) {
        p = prod / moduli[i];
        sm += values[i] * mulInv(p, moduli[i]) * p;
    }

    return sm % prod;
}

function part2(input: string): bigint {
    let ids: Array<string> = input.split(',');
    let moduli: bigint[] = [];
    let remainder: bigint[] = [];

    for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== 'x') {
            let mod: bigint = BigInt(ids[i]);
            moduli.push(mod);
            remainder.push(BigInt(absmod(mod - BigInt(i), mod)))
        }
    }

    let result: bigint = chineseRemainderTheorem(moduli, remainder);

    return result;
}

let handler = new InputHandler();
let input = handler.getInputAsListOfStr('./input/day13_input.txt');
let testInput1 = '7,13,x,x,59,x,31,19';
let testInput2 = '17,x,13,19';
let testInput3 = '67,7,59,61';
let testInput4 = '67,x,7,59,61';
let testInput5 = '67,7,x,59,61';
let testInput6 = '1789,37,47,1889';

console.log(part2(input[1]));
