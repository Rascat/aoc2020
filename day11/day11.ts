import { InputHandler } from '../InputHandler';
import * as path from 'path';
import { performance } from 'perf_hooks';

function isEmpty(seat: string): boolean {
    return seat === 'L' || seat === '.' || seat === null;
}

function isOccupied(seat: string): boolean {
    return seat === '#';
}

function updateSeats(updateIndex: Array<[number, number]>, seats: Array<Array<string>>) {
    for (let index of updateIndex) {
        if (seats[index[1]][index[0]] === 'L') seats[index[1]][index[0]] = '#';
        else if (seats[index[1]][index[0]] === '#') seats[index[1]][index[0]] = 'L';
        else throw new Error(`Unknown seat type: ${seats[index[1]][index[0]]}`);
    }
}

function countOccupied(seats: Array<Array<string>>): number {
    let countTotalOccupied: number = 0;
    for (let row of input) {
        for (let seat of row) {
            if (seat === '#') countTotalOccupied++;
        }
    }

    return countTotalOccupied;
}

function countOccupiedVisible(currX: number, currY: number, seats: Array<Array<string>>) {
    let count: number = 0;

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue

            let x = currX + dx;
            let y = currY + dy;

            while ( y >= 0 && y < seats.length && x >= 0 && x < seats[y].length) {
                if (seats[y][x] !== '.') {
                    if (seats[y][x] === '#') count++;
                    break;
                }
                y += dy;
                x += dx;
            }
        }
    }

    return count;
}


let handler = new InputHandler();
let input: Array<Array<string>> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt')).map<Array<string>>(x => x.split(''));

function part1(input: Array<Array<string>>): number {
    let updateIndex: Array<[number, number]> = []; // contains seat indices in a [x, y] format

    while (true) {
        for (let y = 0; y < input.length; y++) { // translates to an y axis pointing downwards
            for (let x = 0; x < input[y].length; x++) { // translates to an x axis pointing to the right

                let upLeftSeat: string = null;
                let upSeat: string = null;
                let upRightSeat: string = null;
                let downLeftSeat: string = null;
                let downSeat: string = null;
                let downRightSeat: string = null;
                let leftSeat: string = null;
                let rightSeat: string = null;
                let currSeat: string = input[y][x];

                if (y > 0) {
                    upSeat = input[y - 1][x];
                }
                if (y < input.length - 1) {
                    downSeat = input[y + 1][x];
                }
                if (x < input[y].length - 1) {
                    rightSeat = input[y][x + 1];
                }
                if (x > 0) {
                    leftSeat = input[y][x - 1];
                }
                if (y > 0 && x < input[y].length - 1) {
                    upRightSeat = input[y - 1][x + 1];
                }
                if (y > 0 && x > 0) {
                    upLeftSeat = input[y - 1][x - 1];
                }
                if (y < input.length - 1 && x < input[y].length - 1) {
                    downRightSeat = input[y + 1][x + 1];
                }
                if (y < input.length - 1 && x > 0) {
                    downLeftSeat = input[y + 1][x - 1];
                }

                if (currSeat === '.') {
                    // do nothing
                } else if (currSeat === 'L') {
                    if (isEmpty(upLeftSeat)
                        && isEmpty(upSeat)
                        && isEmpty(upRightSeat)
                        && isEmpty(leftSeat)
                        && isEmpty(rightSeat)
                        && isEmpty(downLeftSeat)
                        && isEmpty(downSeat)
                        && isEmpty(downRightSeat)) {
                        updateIndex.push([x, y]);
                    }

                } else if (currSeat === '#') {
                    let countOccupied: number = 0;
                    if (isOccupied(upLeftSeat)) countOccupied++;
                    if (isOccupied(upSeat)) countOccupied++;
                    if (isOccupied(upRightSeat)) countOccupied++;
                    if (isOccupied(leftSeat)) countOccupied++;
                    if (isOccupied(rightSeat)) countOccupied++;
                    if (isOccupied(downLeftSeat)) countOccupied++;
                    if (isOccupied(downSeat)) countOccupied++;
                    if (isOccupied(downRightSeat)) countOccupied++;

                    if (countOccupied >= 4) updateIndex.push([x, y]);

                } else {
                    throw new Error(`Unknown seat type: ${currSeat}`);
                }
            }
        }

        if (updateIndex.length === 0) break;

        updateSeats(updateIndex, input);

        updateIndex = [];
    }

    return countOccupied(input);
}


function part2(input: Array<Array<string>>): number {
    let updateIndex: Array<[number, number]> = [];

    while(true) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] === '.') {
                    // do nothing
                } else if (input[y][x] === '#') {
                    let countOccupied = countOccupiedVisible(x, y, input);
                    if (countOccupied >= 5) updateIndex.push([x, y]);
                } else if (input[y][x] === 'L') {
                    let countOccupied = countOccupiedVisible(x, y, input);
                    if (countOccupied === 0) updateIndex.push([x, y])
                }
            }
        }

        if (updateIndex.length === 0) break;

        updateSeats(updateIndex, input);
        updateIndex = [];
    }

    return countOccupied(input);
}

let t0 = performance.now();
console.log(part2(input));
let t1 = performance.now();
console.log(t1 - t0);
