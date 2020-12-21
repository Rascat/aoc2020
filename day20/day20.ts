import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Tile {
    id: number
    up: string
    right: string
    down: string
    left: string

    constructor(data: string) {
        let rows: Array<string> = data.split('\n');
        this.id = parseInt(rows[0].match(/\d+/g)[0]);
        this.up = rows[1];
        this.down = this._reverseStr(rows[rows.length - 1]);

        let rightBorder: string = '';
        let leftBorder: string = '';
        for (let i = 1; i < rows.length; i++) {
            rightBorder = rightBorder.concat(rows[i].charAt(rows[i].length - 1));

        }

        for (let i = rows.length - 1; i > 0; i--) {
            leftBorder = leftBorder.concat(rows[i].charAt(0));
        }
        this.right = rightBorder;
        this.left = leftBorder;
    }

    rotateRight(): void {
        let upTmp = this.up;
        let rightTmp = this.right;
        let downTmp = this.down;
        let leftTmp = this.left;

        this.up = leftTmp;
        this.right = upTmp;
        this.down = rightTmp;
        this.left = downTmp;
    }

    flipYAxis(): void {
        let upTmp = this.up;
        let rightTmp = this.right;
        let downTmp = this.down;
        let leftTmp = this.left;

        this.up = this._reverseStr(upTmp)
        this.right = this._reverseStr(leftTmp);
        this.down = this._reverseStr(downTmp);
        this.left = this._reverseStr(rightTmp);
    }

    matchesUp(other: Tile): boolean {
        return this.up === this._reverseStr(other.down);
    }

    matchesRight(other: Tile): boolean {
        return this.right === this._reverseStr(other.left);
    }

    matchesDown(other: Tile): boolean {
        return this.down === this._reverseStr(other.up);
    }

    matchesLeft(other: Tile): boolean {
        return this.left === this._reverseStr(other.right);
    }

    _reverseStr(str: string): string {
        return str.split('').reverse().join('');
    }
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'), '\n\n')

let tiles: Array<Tile> = [];
let possibleMatches: Map<Tile, Set<Tile>> = new Map();

for (let data of input) {
    let tile = new Tile(data);
    tiles.push(tile);
    possibleMatches.set(tile, new Set());
}


for (let currTile of tiles) {
    for_other_tiles: for (let otherTile of tiles) {
        if (currTile.id === otherTile.id) continue;

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesUp(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesRight(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesDown(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesLeft(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        otherTile.flipYAxis();

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesUp(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesRight(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesDown(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }

        for (let i = 0; i < 4; i++) {
            if (currTile.matchesLeft(otherTile)) {
                possibleMatches.get(currTile).add(otherTile);
                continue for_other_tiles;
            }
            otherTile.rotateRight();
        }
    }
}

let cornerTiles: Array<[Tile, Set<Tile>]> = Array.from(possibleMatches.entries()).filter(x => x[1].size == 2);
let prod = cornerTiles.reduce<number>((a, b) => a * b[0].id, 1);
console.log(prod);

