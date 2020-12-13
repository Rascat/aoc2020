import { InputHandler } from './InputHandler';

var handler = new InputHandler();
var values = handler.getInputAsListOfInt('./day1_input.txt')

task_1: for (let i in values) {
  for (let j in values) {
    if (i === j) continue
    if ((values[i] + values[j]) === 2020) {
      console.log(`${values[i]} * ${values[j]} = ${values[i] * values[j]}`)
      break task_1
    }
  }
}

task_2: for (let i in values) {
  for (let j in values) {
    for (let k in values) {
      if (i === j || j === k || k === i) continue
      if ((values[i] + values[j] + values[k]) === 2020) {
        console.log(`${values[i]} * ${values[j]} * ${values[k]} = ${values[i] * values[j] * values[k]}`)
        break task_2
      }
    }
  }
}