import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Production {
    id: number;
    substitutions: Array<Array<Production>> | string;

    constructor(rules: Array<string>, id: number = 0) {
        this.id = id;
        this.substitutions = [];

        let rule: string = rules.filter(x => parseInt(x.substring(0, x.indexOf(':'))) === id)[0];
        rule = rule.substring(rule.indexOf(':') + 1);

        if (rule.match(/(a|b)/g)) {
            this.substitutions = rule.match(/(a|b)/g)[0];

        } else {
            let substitutionsStr: Array<string> = rule.split(' | ');

            for (let subStr of substitutionsStr) {
                let productions: Array<Production> = [];
                let prodIds: Array<string> = subStr.match(/\d+/g);

                for (let prodId of prodIds) {
                    productions.push(new Production(rules, parseInt(prodId),));
                }

                this.substitutions.push(productions);
            }
        }
    }
}

function substituteProduction(production: Production): Array<string> {
    if (typeof production.substitutions === 'string') {
        return [production.substitutions]

    } else if (production.substitutions.length === 1) {
        let substitute = production.substitutions[0];
        let cartProd: Array<string> = [''];

        for (let prod of substitute) {
            cartProd = cartesian(cartProd, substituteProduction(prod));
        }

        return cartProd

    } else {
        let altProductions: Array<string> = [];

        for (let subs of production.substitutions) {
            let cartProd: Array<string> = [''];

            for (let prod of subs) {
                cartProd = cartesian(cartProd, substituteProduction(prod));
            }

            altProductions = altProductions.concat(cartProd)
        }

        return altProductions;
    }
}

function cartesian(a: string[], b: string[]): Array<string> {
    let combinations = [].concat(...a.map(a => b.map(b => [].concat(a, b))));
    return combinations.map<string>(x => x.reduce((a: string, b: string) => a.concat(b), ''));
}

function test() {
    let handler = new InputHandler();
    let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'test.txt'), '\n\n');
    let beginning: Production = new Production(input[0].split('\n'));
    let language = substituteProduction(beginning);

    if (language.includes('ababbb') && language.includes('abbbab') && !language.includes('bababa') && !language.includes('aaabbb') && !language.includes('aaaabbb')) {
        console.log('Test successful');
    } else {
        console.log('Test failed');
    }
}

function part1(input: Array<string>): number {
    let beginning: Production = new Production(input[0].split('\n'));
    let language = substituteProduction(beginning);
    
    return input[1].split('\n').filter(x => language.includes(x)).length;
}

function part2(input: Array<string>): number {
    let rules: Array<string> = input[0].split('\n');
    let wordsToTest = input[1].split('\n');

    let prod42: Production = new Production(rules, 42);
    let prod31: Production = new Production(rules, 31)

    let l42 = substituteProduction(prod42);
    let l31 = substituteProduction(prod31);

    let partLength = l42[0].length

    console.log(partLength);
    
    
    // let l0 = substituteProduction(prod0);

    console.log(`Amount of words to test: ${wordsToTest.length}`);
    // console.log(`Amount of valid words in p1: ${validWordsP1.length}`);

    let validWords: Array<string> = [];
    outer: for (let word of wordsToTest) {
        let count31FromRight: number = 0;
        let count42FromRight: number = 0;
        let count42FromLeft: number = 0;
        let n31: boolean = true;
        let n42: boolean = false;
        let star42: boolean = false;
        let valid = true;
        console.log(`Word: ${word}`);

        for (let i = word.length - partLength; i > 0;  i -= partLength) {
            let part = word.substring(i, i + partLength);
            console.log(`Part ${part}`);
            

            if (l31.includes(part)) count31FromRight++;
            if (l42.includes(part)) count42FromRight++;

            // if (l31.includes(part) && n31) count31FromRight++;
            // else if (l42.includes(part)) {
            //     n31 = false;
            //     count42FromRight++
            // } else continue outer;
        }
        console.log(`Count 42: ${count42FromRight}, Count 31: ${count31FromRight}`);
        

        if (count31FromRight >= 1 && count42FromRight > count31FromRight) validWords.push(word);
    }
    
    return validWords.length;
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'test2.txt'), '\n\n');

console.log(part2(input));
