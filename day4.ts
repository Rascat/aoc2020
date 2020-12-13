import { InputHandler } from './InputHandler';

class Document {
  byr: number;
  hcl: string;
  iyr: number;
  eyr: number;
  hgt: string;
  ecl: string;
  pid: string;
  cid: string;

  constructor(data: string) {
    let values = data.split(' ')
    for (let entry of values) {
      let key: string = entry.substring(0, 3);
      let value: string = entry.substring(4);

      if (key === 'byr') this.byr = parseInt(value);
      else if (key === 'hcl') this.hcl = value;
      else if (key === 'iyr') this.iyr = parseInt(value);
      else if (key === 'eyr') this.eyr = parseInt(value);
      else if (key === 'hgt') this.hgt = value;
      else if (key === 'ecl') this.ecl = value;
      else if (key === 'pid') this.pid = value;
      else if (key === 'cid') this.cid = value;
      else throw `Unknown key: ${key}. Value is: ${value}`;
    }
  }

  isValid(): boolean {
    return this.checkByr()
      && this.checkHcl()
      && this.checkIyr()
      && this.checkEyr()
      && this.checkHgt()
      && this.checkEcl()
      && this.checkPid()
  }

  checkByr(): boolean {
    return this.byr !== undefined && this.byr >= 1920 && this.byr <= 2002;
  }

  checkIyr(): boolean {
    return this.iyr !== undefined && this.iyr >= 2010 && this.iyr <= 2020;
  }

  checkEyr(): boolean {
    return this.eyr !== undefined && this.eyr >= 2020 && this.eyr <= 2030;
  }

  checkHgt(): boolean {
    if (this.hgt === undefined) return false;

    let measure = this.hgt.substring(this.hgt.length - 2)
    if (measure === 'cm') {
      let size: number = parseInt(this.hgt.substring(0, this.hgt.length - 2))
      if (!(size >= 150 && size <= 193)) return false;

    } else if (measure = 'in') {
      let size: number = parseInt(this.hgt.substring(0, this.hgt.length - 2))
      if (!(size >= 59 && size <= 76)) return false;

    } else {
      return false;
    }

    return true;
  }

  checkHcl(): boolean {
    if (this.hcl === undefined) return false;
    if (this.hcl.match(/#[0-9a-f]{6}/g) === null) return false;

    return true;
  }

  checkEcl(): boolean {
    if (this.ecl === undefined) return false;

    return this.ecl === 'amb' || this.ecl === 'blu' || this.ecl === 'brn' || this.ecl === 'gry'
      || this.ecl === 'grn' || this.ecl === 'hzl' || this.ecl === 'oth';
  }

  checkPid(): boolean {
    if (this.pid === undefined) return false;

    return this.pid.length === 9;
  }

}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr('day4_input.txt', '\n\n').map(x => x.replace(/\n/g, ' '));

let countValid: number = 0;

for (let row of input) {
  let document = new Document(row);
  if (document.isValid()) countValid++;
}

console.log(countValid);
