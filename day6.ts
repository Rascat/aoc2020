import { InputHandler } from './InputHandler';

let handler = new InputHandler();
let input = handler.getInputAsListOfStr('day6_input.txt', '\n\n');

function part1(input: Array<string>): number {
  let count: number = 0;

  for (let group of input) {
    let answers: string = group.replace(/\n/g, '');
    let uniqAnswers = Array.from(new Set(answers));
    count += uniqAnswers.length;
  }

  return count;
}

function part2(input: Array<string>): number {
  let count: number = 0;
  let alphabet: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ,'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  for (let group of input) {
    let persons: Array<string> = group.split('\n');
    let countSame: number = 0;

    alph: for (let letter of alphabet) {
      for (let person of persons) {
        if (person.indexOf(letter)  !== -1) {} // do nothing
        else continue alph;
      }

      countSame++;
    }

    count += countSame;
  }

  return count;
}

console.log(part2(input));
