import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Tree {
    jolt: number;
    children: Array<Tree> = [];

    constructor(jolt: number) {
        this.jolt = jolt;
    }

    addChild(child: Tree): void {
        this.children.push(child);
    }
}


function getCompatibleAdapters(currJolt: number, adapters: Array<number>): Array<number> {
    let compatAdapters: Array<number> = [];
    for (let adapter of adapters) {
        if (adapter === currJolt + 1 || adapter === currJolt + 2 || adapter === currJolt + 3) {
            compatAdapters.push(adapter);
        }
    }

    return compatAdapters;
}

function getCompatibleAdaptersInverse(currJolt: number, adapters: Array<number>): Array<number> {
    let compatAdapters: Array<number> = [];
    for (let adapter of adapters) {
        if (adapter === (currJolt - 1) || adapter === (currJolt - 2) || adapter === (currJolt - 3)) {
            compatAdapters.push(adapter);
        }
    }

    return compatAdapters;
}

function part1(input: Array<number>): number {
    let count1JoltDiff = 0;
    let count2JoltDiff = 0;
    let count3JoltDiff = 0;
    let currJolt = 0;

    while (getCompatibleAdapters(currJolt, input).length !== 0) {
        let compatAdapters = getCompatibleAdapters(currJolt, input)
        let minCompatAdapter = Math.min(...compatAdapters);

        if (minCompatAdapter - currJolt === 1) {
            count1JoltDiff++
        } else if (minCompatAdapter - currJolt === 2) {
            count2JoltDiff++;
        } else if (minCompatAdapter - currJolt === 3) {
            count3JoltDiff++;
        } else {
            throw new Error(`Wrong adapter difference: ${minCompatAdapter - currJolt}`)
        }

        currJolt = minCompatAdapter;
    }

    currJolt += 3;
    count3JoltDiff++;

    return count1JoltDiff * count3JoltDiff;
}

let handler = new InputHandler;
let input: Array<number> = handler.getInputAsListOfInt(path.join(__dirname, 'input.txt'));

function buildTree(jolt: number, input: Array<number>): Tree {
    let tree = new Tree(jolt);
    let adapters = getCompatibleAdapters(jolt, input);
    
    for (let adapter of adapters) {
        tree.addChild(buildTree(adapter, input));
    }

    return tree;
}

function countBranches(jolt: number, input: Array<number>, knownBranches: Map<number, number>): number {
    if (knownBranches.has(jolt)) return knownBranches.get(jolt);

    let adapters = getCompatibleAdaptersInverse(jolt, input);
    if (adapters.length === 0) return 1;

    let sum  = 0;
    for (let adapter of adapters) {
        sum += countBranches(adapter, input, knownBranches);
    }
    knownBranches.set(jolt, sum);
    return sum;
}

let maxJolt = Math.max(...input);
let knownBranches = new Map<number, number>();

console.log(countBranches(maxJolt, input, knownBranches));


