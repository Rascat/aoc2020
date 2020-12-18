import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Bag {
    _color: string;
    _children: Array<[number, string]> = []

    constructor(data: string) {
        let firstTwoWordsExp = /^(\w+ \w+)/g;
        let containsExp = /(\d+ \w+ \w+)/g

        this._color = data.match(firstTwoWordsExp)[0];
        let contains = data.match(containsExp) || [];
        for (let entry of contains) {
            let amount = parseInt(entry.substring(0, 1));
            let color = entry.substring(2);
            this._children.push([amount, color]);
        }
    }

    get color(): string {
        return this._color;
    }

    get children(): Array<[number, string]> {
        return this._children;
    }
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));
let bags: Array<Bag> = input.map<Bag>(x => {return new Bag(x)});

function part1(bags: Array<Bag>): number {
    let knownContainers: Set<String> = new Set();
    let active: boolean = true;
    while (active) {
        active = false;
        for (let bag of bags) {
            let subBags: Array<[number, string]> = bag.children
            for (let sub of subBags) {
                if (!knownContainers.has(bag.color) && (sub[1] === 'shiny gold' || (knownContainers.has(sub[1])))) {
                    knownContainers.add(bag.color);
                    console.log(`Added ${bag.color}`)
                    active = true;
                }
            }
        }
    }

    return knownContainers.size;
}

function part2(bags: Array<Bag>): number {
    return computeBagCount('shiny gold', bags)
}

function getBagByColor(color: string, bags: Array<Bag>): Bag {
    for (let bag of bags) {
        if (bag.color === color) return bag;
    }

    throw Error(`Could not find bag with color ${color}`);
}

function computeBagCount(color: string, bags: Array<Bag>): number {
    let currentBag: Bag = getBagByColor(color, bags);

    if (currentBag.children.length === 0) {
        return 0;
    }
    else {
        let count: number = 0;
        for (let child of currentBag.children) {
            count += child[0] + (child[0] * computeBagCount(child[1], bags))
        }
        return count;
    }
}

console.log(part2(bags));