import { InputHandler } from '../InputHandler';
import * as path from 'path';


class Grid3D {
    activeCells: Map<string, Array<[number, number, number]>>;

    constructor(layer: Array<string>) {
        this.activeCells = new Map();

        for (let y = 0; y < layer.length; y++) {
            for (let x = 0; x < layer[0].length; x++) {

                if (layer[y].charAt(x) === '#') {
                    this.setActive([x, y, 0]);
                }
            }
        }
    }

    setActive(cell: [number, number, number]): void {
        this.activeCells.set(this.cellToString(cell), this.getNeighbors(cell));
    }

    setInactive(cell: [number, number, number]): void {
        let deleted: boolean = this.activeCells.delete(this.cellToString(cell));
        if (!deleted) throw new Error('Could not delete cell: ' + cell)
    }

    cellIsActive(cell: [number, number, number]): boolean {
        return this.activeCells.has(this.cellToString(cell));
    }

    getNeighbors(cell: [number, number, number]): Array<[number, number, number]> {
        let neighbors: Array<[number, number, number]> = [];

        for (let x of [-1, 0, 1]) {
            for (let y of [-1, 0, 1]) {
                for (let z of [-1, 0, 1]) {
                    if (!(x === 0 && y === 0 && z === 0)) {
                        neighbors.push([cell[0] + x, cell[1] + y, cell[2] + z]);
                    }
                }
            }
        }

        return neighbors;
    }

    getActiveCells(): Array<[number, number, number]> {
        let activeCells: Array<[number, number, number]> = [];
        for (let cellStr of this.activeCells.keys()) {
            activeCells.push(this.cellFromString(cellStr));
        }

        return activeCells;
    }

    cellToString(cell: [number, number, number]): string {
        return `${cell[0]},${cell[1]},${cell[2]}`;
    }

    cellFromString(cellStr: string): [number, number, number] {
        let values = cellStr.split(',');
        return [parseInt(values[0]), parseInt(values[1]), parseInt(values[2])];
    }

    updateGrid() {
        let cellsToUpdate: Set<string> = new Set();

        for (let activeCell of this.getActiveCells()) {
            let countActiveNeighbors: number = 0;
            let neighbors = this.getNeighbors(activeCell);

            for (let neighbor of neighbors) {
                if (this.cellIsActive(neighbor)) {
                    countActiveNeighbors++;
                }
                else {
                    let countActiveNeighborsNeighbors: number = 0;
                    let neighborsNeighbors = this.getNeighbors(neighbor);

                    for (let neighborsNeighbor of neighborsNeighbors) {
                        if (this.cellIsActive(neighborsNeighbor)) {
                            countActiveNeighborsNeighbors++;
                        }
                    }

                    if (countActiveNeighborsNeighbors === 3) {
                        cellsToUpdate.add(this.cellToString(neighbor));
                    }
                }
            }

            if (countActiveNeighbors < 2 || countActiveNeighbors > 3) {
                cellsToUpdate.add(this.cellToString(activeCell));
            }
        }

        for (let cell of cellsToUpdate.values()) {
            if (this.cellIsActive(this.cellFromString(cell))) {
                this.setInactive(this.cellFromString(cell));
            } else {
                this.setActive(this.cellFromString(cell));
            }
        }
    }
}

class Grid4D {
    activeCells: Map<string, Array<[number, number, number, number]>>;

    constructor(layer: Array<string>) {
        this.activeCells = new Map();

        for (let y = 0; y < layer.length; y++) {
            for (let x = 0; x < layer[0].length; x++) {

                if (layer[y].charAt(x) === '#') {
                    this.setActive([x, y, 0, 0]);
                }
            }
        }
    }

    setActive(cell: [number, number, number, number]): void {
        this.activeCells.set(this.cellToString(cell), this.getNeighbors(cell));
    }

    setInactive(cell: [number, number, number, number]): void {
        let deleted: boolean = this.activeCells.delete(this.cellToString(cell));
        if (!deleted) throw new Error('Could not delete cell: ' + cell)
    }

    cellIsActive(cell: [number, number, number, number]): boolean {
        return this.activeCells.has(this.cellToString(cell));
    }

    getNeighbors(cell: [number, number, number, number]): Array<[number, number, number, number]> {
        let neighbors: Array<[number, number, number, number]> = [];

        for (let x of [-1, 0, 1]) {
            for (let y of [-1, 0, 1]) {
                for (let z of [-1, 0, 1]) {
                    for (let w of [-1, 0, 1]) {
                        if (!(x === 0 && y === 0 && z === 0 && w === 0)) {
                            neighbors.push([cell[0] + x, cell[1] + y, cell[2] + z, cell[3] + w]);
                        }
                    }
                }
            }
        }

        return neighbors;
    }

    getActiveCells(): Array<[number, number, number, number]> {
        let activeCells: Array<[number, number, number, number]> = [];
        for (let cellStr of this.activeCells.keys()) {
            activeCells.push(this.cellFromString(cellStr));
        }

        return activeCells;
    }

    cellToString(cell: [number, number, number, number]): string {
        return `${cell[0]},${cell[1]},${cell[2]},${cell[3]}`;
    }

    cellFromString(cellStr: string): [number, number, number, number] {
        let values = cellStr.split(',');
        return [parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseInt(values[3])];
    }

    updateGrid() {
        let cellsToUpdate: Set<string> = new Set();

        for (let activeCell of this.getActiveCells()) {
            let countActiveNeighbors: number = 0;
            let neighbors = this.getNeighbors(activeCell);

            for (let neighbor of neighbors) {
                if (this.cellIsActive(neighbor)) {
                    countActiveNeighbors++;
                }
                else {
                    let countActiveNeighborsNeighbors: number = 0;
                    let neighborsNeighbors = this.getNeighbors(neighbor);

                    for (let neighborsNeighbor of neighborsNeighbors) {
                        if (this.cellIsActive(neighborsNeighbor)) {
                            countActiveNeighborsNeighbors++;
                        }
                    }

                    if (countActiveNeighborsNeighbors === 3) {
                        cellsToUpdate.add(this.cellToString(neighbor));
                    }
                }
            }

            if (countActiveNeighbors < 2 || countActiveNeighbors > 3) {
                cellsToUpdate.add(this.cellToString(activeCell));
            }
        }

        for (let cell of cellsToUpdate.values()) {
            if (this.cellIsActive(this.cellFromString(cell))) {
                this.setInactive(this.cellFromString(cell));
            } else {
                this.setActive(this.cellFromString(cell));
            }
        }
    }
}

function part1(input: Array<string>): number {
    let grid: Grid3D = new Grid3D(input);

    for (let cycle = 0; cycle < 6; cycle++) {
        grid.updateGrid();
    }

    return grid.activeCells.size;
}

function part2(input: Array<string>): number {
    let grid: Grid4D = new Grid4D(input);

    for (let cycle = 0; cycle < 6; cycle++) {
        grid.updateGrid();
    }

    return grid.activeCells.size
}

function test1() {
    let input = `.#.
..#
###`

    let grid = new Grid3D(input.split('\n'));
    for (let cycle = 0; cycle < 6; cycle++) {
        grid.updateGrid();
    }

    console.log(grid.activeCells.size);
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

console.log(part2(input));
