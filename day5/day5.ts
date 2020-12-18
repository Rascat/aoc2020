import { InputHandler } from '../InputHandler';
import * as path from 'path';

class SeatPos {
  row: number;
  seat: number;

  constructor(data: string) {
    let rowBin: string = data.substring(0, 7);
    let seatBin: string = data.substring(7);

    rowBin = rowBin.replace(/F/g, '0').replace(/B/g, '1');
    this.row = parseInt(rowBin, 2);

    seatBin = seatBin.replace(/L/g, '0').replace(/R/g, '1');
    this.seat = parseInt(seatBin, 2);
  }

  getSeatId(): number {
    return (this.row * 8) + this.seat;
  }
}

let handler = new InputHandler();
let input = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

let maxSeat = new SeatPos(input[0]);
for (let entry of input) {
  let seat = new SeatPos(entry);
  if (seat.getSeatId() > maxSeat.getSeatId()) maxSeat = seat;
}


let positions: Array<SeatPos> = [];
for (let entry of input) {
  let seat = new SeatPos(entry);
  positions.push(seat);
}

let sorted_positions = positions.sort((a, b) => {
  if (a.getSeatId() < b.getSeatId()) return -1;
  else if (a > b) return 1;
  return 0
});

let currId = sorted_positions[0].getSeatId();
for (let i of sorted_positions) {
  if ((i.getSeatId() - 1) !== currId) console.log(currId)
  currId = i.getSeatId();
}