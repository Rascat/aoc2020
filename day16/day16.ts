import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Field {
    name: string;
    ranges: [[number, number], [number, number]]


    constructor(fieldStr: string) {

        let colonIndex: number = fieldStr.indexOf(':');
        this.name = fieldStr.substring(0, colonIndex);
        let ranges: Array<string> = fieldStr.substring(colonIndex + 2).split(' or ');
        let range1: number[] = ranges[0].split('-').map<number>(x => parseInt(x));
        let range2: number[] = ranges[1].split('-').map<number>(x => parseInt(x));

        this.ranges = [[range1[0], range1[1]], [range2[0], range2[1]]];

    }
}

class Ticket {
    values: Array<number>;

    constructor(input: string) {
        this.values = input.split(',').map<number>(x => parseInt(x));
    }

    getInvalidValues(fields: Array<Field>): Array<number> {
        let invalid: Array<number> = [];

        val_loop: for (let val of this.values) {
            for (let field of fields) {
                if ((field.ranges[0][0] <= val && val <= field.ranges[0][1]) || (field.ranges[1][0] <= val && val <= field.ranges[1][1])) {
                    continue val_loop;
                }
            }
            invalid.push(val);
        }

        return invalid;
    }

    isValid(fields: Array<Field>): boolean {
        val_loop: for (let val of this.values) {
            for (let field of fields) {
                if ((field.ranges[0][0] <= val && val <= field.ranges[0][1]) || (field.ranges[1][0] <= val && val <= field.ranges[1][1])) {
                    continue val_loop;
                }
            }
            return false;
        }
        return true;
    }
}

function part1(input: Array<string>): number {
    let fields: Array<Field> = input[0].split('\n').map<Field>(x => new Field(x))
    let ticketsData: Array<string> = input[2].split('\n');
    ticketsData.splice(0, 1)
    let tickets: Array<Ticket> = ticketsData.map<Ticket>(x => new Ticket(x));
    let invalidValues: Array<number> = tickets.reduce<number[]>((a, b) => a.concat(b.getInvalidValues(fields)), [])

    return invalidValues.reduce((a, b) => a + b, 0);
}

function part2(input: Array<string>): number {
    let fields: Array<Field> = input[0].split('\n').map<Field>(x => new Field(x))
    let ticketsData: Array<string> = input[2].split('\n');
    ticketsData.splice(0, 1)
    let nearbyTickets: Array<Ticket> = ticketsData.map<Ticket>(x => new Ticket(x)).filter(x => x.isValid(fields));
    let yourTicket: Ticket = new Ticket(input[1].split('\n')[1]);
    console.log(yourTicket);

    let allTickets: Array<Ticket> = nearbyTickets.concat(yourTicket);

    let candidates: Array<Array<Field>> = [];
    for (let i = 0; i < fields.length; i++) {
        candidates[i] = fields;
    }

    for (let i = 0; i < candidates.length; i++) {
        for (let ticket of allTickets) {
            for (let field of fields) {
                if (!((field.ranges[0][0] <= ticket.values[i] && ticket.values[i] <= field.ranges[0][1])
                    || (field.ranges[1][0] <= ticket.values[i] && ticket.values[i] <= field.ranges[1][1]))) {
                    candidates[i] = candidates[i].filter(c => c.name !== field.name)
                }
            }
        }
    }

    while (candidates.reduce<number>((a, b) => a + b.length, 0) > candidates.length) {
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].length === 1) {
                let knownField = candidates[i][0];
                for (let j = 0; j < candidates.length; j++) {
                    if (j !== i) {
                        candidates[j] = candidates[j].filter(x => x.name !== knownField.name)
                    }
                }
            }
        }
    }

    let departureIndices: Array<number> = [];
    for (let i = 0; i < candidates.length; i++) {
        if (candidates[i][0].name.startsWith('departure')) departureIndices.push(i)
    }

    let prod: number = 1;
    for (let index of departureIndices) {
        prod *= yourTicket.values[index]
    }

    return prod;
}


function test1() {
    let ruleStr = 'class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50'
    let ticketsData = ['7,3,47', '40,4,50', '55,2,20', '38,6,12']

    let fields: Array<Field> = ruleStr.split('\n').map<Field>(x => new Field(x));
    let tickets: Array<Ticket> = ticketsData.map<Ticket>(x => new Ticket(x));

    console.log(tickets.reduce<number[]>((a, b) => a.concat(b.getInvalidValues(fields)), []));
}

function test2() {
    let input = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

console.log(part2(input.split('\n\n')));
}


let handler = new InputHandler();
let input = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'), '\n\n');

console.log(part2(input));
