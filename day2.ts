import { InputHandler } from './InputHandler';

class PasswordRule {
  range: [number, number];
  char: string;
  password: string;

  constructor(range: string, char: string, password: string) {
    let rangeFromTo = range.split('-').map(x => +x);
    this.range = [rangeFromTo[0], rangeFromTo[1]]
    this.char = char.substring(0, 1);
    this.password = password;
  }

  countCharInPassword(): number {
    let matchArr = this.password.match(new RegExp(this.char, 'g'))

    if (matchArr !== null) return matchArr.length
    else return 0
  }

  isValidSledRental(): boolean {
    return this.countCharInPassword() >= this.range[0] && this.countCharInPassword() <= this.range[1]
  }

  isValidToboggan(): boolean {
    let charA = this.password.substring(this.range[0] - 1, this.range[0])
    let charB = this.password.substring(this.range[1] - 1, this.range[1])

    return (charA === this.char && charB !== this.char) || (charA !== this.char && charB === this.char)
  }
}

var handler = new InputHandler();
var input = handler.getInputAsListOfStr('./day2_input.txt');
var countValidRental = 0
var countValidToboggan = 0

for (let entry of input) {
  let row = entry.split(' ')
  let rule = new PasswordRule(row[0], row[1], row[2])
  if (rule.isValidSledRental()) countValidRental++
  if (rule.isValidToboggan()) countValidToboggan++
}

console.log('Valid Sled rental passwords: ' + countValidRental)
console.log('Valid Toboggan passwords: ' + countValidToboggan)
