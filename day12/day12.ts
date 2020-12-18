import { InputHandler } from '../InputHandler';
import * as path from 'path';

let testData: Array<string> = ['F10', 'N3', 'F7', 'R90', 'F11']

class Instruction { 
    action: string;
    value: number;

    constructor(pair: string) {
        this.action = pair.substring(0, 1);
        this.value = parseInt(pair.substring(1));
    }
}

class Ship {
    direction: number; // 0 := North, 1 := East, 2 := South, 3 := West
    position: [number, number]; // [x, y]

    constructor(){
        this.direction = 1;
        this.position = [0, 0];
    }

    applyInstruction(instruction: Instruction): void {
        if ('NESW'.indexOf(instruction.action) !== -1) {
            this.moveAbsolute(instruction);
        } else if ('LR'.indexOf(instruction.action) !== -1) {
            this.updateDirection(instruction);
        } else if (instruction.action === 'F') {
            this.moveRelative(instruction)
        } else {
            throw new Error(`Unknown instruction ${instruction}`)
        }
    }

    moveAbsolute(instruction: Instruction): void {
        let x: number = this.position[0];
        let y : number = this.position[1];

        if (instruction.action === 'N') y += instruction.value;
        else if (instruction.action === 'E') x += instruction.value;
        else if (instruction.action === 'S') y -= instruction.value;
        else if (instruction.action === 'W') x -= instruction.value;
        else throw new Error(`Unknown direction: ${instruction}`);

        console.log(`Move absolute from ${this.position} to ${[x, y]}`)
        this.position = [x, y];
    }

    updateDirection(instruction: Instruction): void {
        if (instruction.action === 'L') {
            this.direction = (4 + (this.direction - (instruction.value / 90))) % 4;
            console.log(`Turn left to ${this.direction}`);
        } else if (instruction.action === 'R') {
            this.direction = (this.direction + (instruction.value / 90)) % 4;
            console.log(`Turn right to ${this.direction}`);
        } else {
            throw new Error(`Unknown direction: ${instruction}`);
        }
    }

    moveRelative(instruction: Instruction): void {
        let x: number = this.position[0];
        let y: number = this.position[1];
        if (this.direction === 0) {
            y += instruction.value;
        } else if (this.direction === 1) {
            x += instruction.value;
        } else if (this.direction === 2) {
            y -= instruction.value;
        } else {
            x -= instruction.value;
        }

        console.log(`Move relative from ${this.position} to ${[x, y]}`)

        this.position = [x, y];
    }
}

class WaypointShip {
    waypoint: [number, number]; // 0 := North, 1 := East, 2 := South, 3 := West
    position: [number, number]; // [x, y]

    constructor(){
        this.waypoint = [10, 1];
        this.position = [0, 0];
    }

    applyInstruction(instruction: Instruction): void {
        if ('NESW'.indexOf(instruction.action) !== -1) {
            this.moveWaypoint(instruction);
        } else if ('LR'.indexOf(instruction.action) !== -1) {
            this.rotateWaypoint(instruction);
        } else if (instruction.action === 'F') {
            this.moveTowardsWaypoint(instruction)
        } else {
            throw new Error(`Unknown instruction ${instruction}`)
        }
    }

    moveWaypoint(instruction: Instruction): void {
        let x: number = this.waypoint[0];
        let y : number = this.waypoint[1];

        if (instruction.action === 'N') y += instruction.value;
        else if (instruction.action === 'E') x += instruction.value;
        else if (instruction.action === 'S') y -= instruction.value;
        else if (instruction.action === 'W') x -= instruction.value;
        else throw new Error(`Unknown direction: ${instruction}`);

        console.log(`Move waypoint from ${this.position} to ${[x, y]}`)
        this.waypoint = [x, y];
    }

    rotateWaypoint(instruction: Instruction): void {
        if (instruction.action === 'L') {
            let turns = instruction.value / 90;
            for (let i = 0; i < turns; i++) {
                // swap x and y
                let x: number, y: number;
                [y, x] = this.waypoint;
                // swap sign of x
                x *= -1
                console.log(`Rotate waypoint from ${this.waypoint} to ${[x, y]}`);
                this.waypoint = [x, y]
            }
        } else if (instruction.action === 'R') {
            let turns = instruction.value / 90;
            for (let i = 0; i < turns; i++) {
                // swap x and y
                let x: number, y: number;
                [y, x] = this.waypoint;
                // swap sign of y
                y *= -1
                console.log(`Rotate waypoint from ${this.waypoint} to ${[x, y]}`);
                this.waypoint = [x, y]
            }
        } else {
            throw new Error(`Unknown direction: ${instruction}`);
        }
    }

    moveTowardsWaypoint(instruction: Instruction): void {
        let x: number = this.position[0];
        let y: number = this.position[1];

        for (let i = 0; i < instruction.value; i++) {
            x += this.waypoint[0];
            y += this.waypoint[1];
        }
        console.log(`Move toward waypoint from ${this.position} to ${[x, y]}`)
        
        this.position = [x, y];
    }
}


let handler = new InputHandler();
let input = handler.getInputAsListOfStr(path.join(__dirname, './input.txt'));

let instructions: Array<Instruction> = input.map<Instruction>(x => new Instruction(x));
let ship = new WaypointShip();

for (let instruction of instructions) {
    ship.applyInstruction(instruction);
}

console.log(ship.position);
console.log(Math.abs(ship.position[0]) + Math.abs(ship.position[1]));