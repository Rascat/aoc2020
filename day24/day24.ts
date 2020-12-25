import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Tile {
    directions: Array<string>;
    position: Coordinate;

    constructor(line: string) {
        this.directions = line.match(/(ne|e|se|nw|w|sw)/g);
        this.position = this.translateDirections(this.directions);
    }

    translateDirections(directions: Array<string>): Coordinate {
        let origin: Coordinate = new Coordinate();
        for (let direction of directions) {
            switch (direction) {
                case 'ne': origin = origin.getNorthEast();
                    break;
                case 'e': origin = origin.getEast();
                    break;
                case 'se': origin = origin.getSouthEast();
                    break;
                case 'nw': origin = origin.getNorthWest();
                    break;
                case 'w': origin = origin.getWest();
                    break;
                case 'sw': origin = origin.getSouthWest();
                    break;
                default: throw new Error(`Unknown direction: ${direction}`)
            }
        }

        return origin;
    }
}

class Coordinate {
    // such that x + y + z = o
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        if ((x + y + z) !== 0) {
            throw new Error(`Invalid hex coordinate: [${x},${y},${z}]`)
        }

        this.x = x;
        this.y = y;
        this.z = z;
    }

    getNorthEast(): Coordinate {
        return new Coordinate(this.x + 1, this.y, this.z - 1);
    }

    getEast(): Coordinate {
        return new Coordinate(this.x + 1, this.y - 1, this.z);
    }

    getSouthEast(): Coordinate {
        return new Coordinate(this.x, this.y - 1, this.z + 1)
    }

    getNorthWest(): Coordinate {
        return new Coordinate(this.x, this.y + 1, this.z - 1);
    }

    getWest(): Coordinate {
        return new Coordinate(this.x - 1, this.y + 1, this.z);
    }

    getSouthWest(): Coordinate {
        return new Coordinate(this.x - 1, this.y, this.z + 1);
    }

    toString(): string {
        return `${this.x},${this.y},${this.z}`;
    }

    getAdjacent(): Array<Coordinate> {
        return [
            this.getNorthEast(), this.getEast(), this.getSouthEast(),
            this.getNorthWest(), this.getWest(), this.getSouthWest()
        ];
    }

    static fromString(str: string): Coordinate {
        let values: Array<string> = str.split(',');
        return new Coordinate(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]));
    }
}

function part1(input: Array<string>): number {
    let flipCountMap: Map<string, number> = new Map();

    for (let row of input) {
        let tile: Tile = new Tile(row);

        if (!flipCountMap.has(tile.position.toString())) {
            flipCountMap.set(tile.position.toString(), 1);
        } else {
            flipCountMap.set(tile.position.toString(), flipCountMap.get(tile.position.toString()) + 1);
        }
    }

    return Array
        .from(flipCountMap.values())
        .filter(x => x % 2 == 1)
        .length;
}

function part2(input: Array<string>): number {
    let flipCountMap: Map<string, number> = new Map();

    for (let row of input) {
        let tile: Tile = new Tile(row);

        if (!flipCountMap.has(tile.position.toString())) {
            flipCountMap.set(tile.position.toString(), 1);
        } else {
            flipCountMap.set(tile.position.toString(), flipCountMap.get(tile.position.toString()) + 1);
        }
    }

    let blackTileMap: Map<string, null> = new Map();
    Array.from(flipCountMap.entries())
        .filter(x => (x[1] % 2) == 1)
        .map<string>(x => x[0])
        .forEach(x => blackTileMap.set(x, null));

    for (let i = 0; i < 100; i++) {
        let tilesToUpdate: Set<string> = new Set();

        for (let coordStr of blackTileMap.keys()) {
            let blackTile = Coordinate.fromString(coordStr);
            let neighbors: Array<Coordinate> = blackTile.getAdjacent();
            let countBlackNeighbors: number = 0;

            for (let neighbor of neighbors) {
                if (blackTileMap.has(neighbor.toString())) {
                    // neighboring tile is black
                    countBlackNeighbors++;
                } else {
                    // neighboring tile is white
                    let neighborNeighbors: Array<Coordinate> = neighbor.getAdjacent();
                    let countBlackNeighborNeighbors: number = 0;

                    for (let neighborNeighbor of neighborNeighbors) {
                        if (blackTileMap.has(neighborNeighbor.toString())) {
                            countBlackNeighborNeighbors++;
                        }
                    }

                    if (countBlackNeighborNeighbors == 2) {
                        tilesToUpdate.add(neighbor.toString());
                    }
                }
            }

            if (countBlackNeighbors == 0 || countBlackNeighbors > 2) {
                tilesToUpdate.add(blackTile.toString());
            }
        }

        for (let tileStr of tilesToUpdate.values()) {
            if (blackTileMap.has(tileStr)) {
                blackTileMap.delete(tileStr);
            } else {
                blackTileMap.set(tileStr, null);
            }
        }
    }

    return blackTileMap.size;
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

console.log(part2(input));
