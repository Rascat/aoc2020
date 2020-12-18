import { InputHandler } from '../InputHandler';
import * as path from 'path';

class ForestStrip {
  strip: string[];
  width: number;
  height: number;
  traversePattern: [number, number]
  position: [number, number] = [0, 0];
  treeCount: number = 0;

  constructor(strip: Array<string>, traversePattern: [number, number]) {
    this.strip = strip
    this.width = strip[0].length;
    this.height = strip.length;
    this.traversePattern = traversePattern;
  }

  getX(): number {
    return this.position[0]
  }

  getY(): number {
    return this.position[1]
  }

  updatePosition() {
    let x: number = this.getX();
    let y: number = this.getY();

    x = (x + this.traversePattern[0]) % this.width
    y = y + this.traversePattern[1]

    this.position = [x, y]
  }

  positionIsTree(): boolean {
    return this.strip[this.getY()].charAt(this.getX()) === '#'
  }

  updateTreeCount() {
    this.treeCount++
  }
}

var handler = new InputHandler();
var input = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

let strip0 = new ForestStrip(input, [1, 1]);
let strip1 = new ForestStrip(input, [3, 1]);
let strip2 = new ForestStrip(input, [5, 1]);
let strip3 = new ForestStrip(input, [7, 1]);
let strip4 = new ForestStrip(input, [1, 2]);

while (true) {
  strip0.updatePosition();
  if (strip0.getY() >= strip0.height) break;
  if (strip0.positionIsTree()) strip0.updateTreeCount()
}

while (true) {
  strip1.updatePosition();
  if (strip1.getY() >= strip1.height) break;
  if (strip1.positionIsTree()) strip1.updateTreeCount()
}

while (true) {
  strip2.updatePosition();
  if (strip2.getY() >= strip2.height) break;
  if (strip2.positionIsTree()) strip2.updateTreeCount()
}

while (true) {
  strip3.updatePosition();
  if (strip3.getY() >= strip3.height) break;
  if (strip3.positionIsTree()) strip3.updateTreeCount()
}

while (true) {
  strip4.updatePosition();
  if (strip4.getY() >= strip4.height) break;
  if (strip4.positionIsTree()) strip4.updateTreeCount()
}

console.log(strip0.treeCount)
console.log(strip1.treeCount)
console.log(strip2.treeCount)
console.log(strip3.treeCount)
console.log(strip4.treeCount)
console.log(strip0.treeCount * strip1.treeCount * strip2.treeCount * strip3.treeCount * strip4.treeCount)