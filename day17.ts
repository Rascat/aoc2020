import { InputHandler } from './InputHandler';

class Grid {
    // boundaries in which we consider each cell
    bx: [number, number];
    by: [number, number];
    bz: [number, number];

    activeCells: Map<string, null>;

    constructor(layer: Array<string>) {
        this.activeCells = new Map();
        this.bx = [-1, layer[0].length + 1];
        this.by = [-1, layer.length + 1];
        this.bz = [-1, 1];

        for (let x = 0; x < layer[0].length; x++) {
            for (let y = 0; y < layer.length; y++) {
                if (layer[y].charAt(x) === '#') {
                    this.updateMap([x, y, 0]);
                }
            }
        }
    }

    updateMap(cell: [number, number, number]): void {
        // console.log(`Added cell: ${cell}`);

        this.activeCells.set(`${cell[0]}${cell[1]}${cell[2]}`, null);
    }

    deleteCellFromMap(cell: [number, number, number]): void {
        // console.log(`Deleted cell: ${cell}`);

        let deleted: boolean = this.activeCells.delete(`${cell[0]}${cell[1]}${cell[2]}`);
        if (!deleted) throw new Error('Could not delete cell: ' + cell)
    }

    mapHasCell(cell: [number, number, number]): boolean {
        return this.activeCells.has(`${cell[0]}${cell[1]}${cell[2]}`);
    }

    getNeighbors(cell: [number, number, number]): Array<[number, number, number]> {
        let neighbors: Array<[number, number, number]> = [];

        for (let x of [-1, 0, 1]) {
            for (let y of [-1, 0, 1]) {
                for (let z of [-1, 0, 1]) {
                    if (!(x === 0 && y === 0 && z === 0)) {
                        neighbors.push([cell[0] + x, cell[1] + y, cell[2] + z])
                    }
                }
            }
        }

        return neighbors;
    }

    updateGrid() {
        let cellsToUpdate: Array<[number, number, number]> = []

        for (let z = this.bz[0]; z <= this.bz[1]; z++) {
            for (let y = this.by[0]; y <= this.by[1]; y++) {
                for (let x = this.bx[0]; x <= this.bx[1]; x++) {
                    let currentCell: [number, number, number] = [x, y, z];
                    let countActiveNeighbors: number = 0;
                    let neighbors = this.getNeighbors(currentCell);

                    for (let neighbor of neighbors) {
                        if (this.mapHasCell(neighbor)) countActiveNeighbors++;
                    }

                    if (this.mapHasCell(currentCell)) {
                        // cell is active -> set inactive if #active neighbors is smaller than 2 or greater than 3
                        if (countActiveNeighbors < 2 || countActiveNeighbors > 3) {
                            cellsToUpdate.push(currentCell);
                        }
                    } else {
                        // cell is inactive -> set active if #active neighbors is 3
                        if (countActiveNeighbors === 3) {
                            cellsToUpdate.push(currentCell);
                        }
                    }
                }
            }
        }

        for (let cell of cellsToUpdate) {
            if (this.mapHasCell(cell)) {
                this.deleteCellFromMap(cell);
            } else {
                this.updateMap(cell);
            }
        }

        let xFrom = this.bx[0];
        let xTo = this.bx[1];
        let yFrom = this.by[0];
        let yTo = this.by[1];
        let zFrom = this.bz[0];
        let zTo = this.bz[1];

        xFrom--;
        xTo++;
        yFrom--;
        yTo++;
        zFrom--;
        zTo++;

        this.bx = [xFrom, xTo];
        this.by = [yFrom, yTo];
        this.bz = [zFrom, zTo];
    }
}

function test1() {
    let input = `.#.
..#
###`

    let grid = new Grid(input.split('\n'));
    for (let cycle = 0; cycle < 6; cycle++) {
        grid.updateGrid();
    }

    console.log(grid.activeCells.size);
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr('./input/day17_input.txt');


let grid: Grid = new Grid(input);

for (let cycle = 0; cycle < 6; cycle++) {
    grid.updateGrid();
}

console.log(grid.activeCells.size);
