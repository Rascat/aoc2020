import { InputHandler } from '../InputHandler';
import * as path from 'path';

class Recipe {
    ingredients: Array<string>;
    allergens: Array<string>;

    constructor(data: string) {
        this.ingredients = data.substring(0, data.indexOf('(') - 1).split(' ');
        this.allergens = data.substring(data.indexOf('contains') + 9).match(/\w+/g);

    }
}

let handler = new InputHandler();
let input: Array<string> = handler.getInputAsListOfStr(path.join(__dirname, 'input.txt'));

let recipes: Array<Recipe> = input.map<Recipe>(x => new Recipe(x));

let allergensTotal: Set<string> = new Set();
recipes.forEach(x => x.allergens.forEach(y => allergensTotal.add(y)));

let candidates: Map<string, Set<string>> = new Map();

for (let allergen of allergensTotal) {
    let recipesWithAllergen: Array<Recipe> = recipes.filter(x => x.allergens.includes(allergen));
    let intersection: Set<string> = new Set();

    outer: for (let ingredient of recipesWithAllergen[0].ingredients) {
        for (let recipe of recipesWithAllergen) {
            if (!recipe.ingredients.includes(ingredient)) continue outer;
        }
        intersection.add(ingredient);
    }

    candidates.set(allergen, intersection)
}

let ambiguous: boolean = true;
while(ambiguous) {
    
    for (let entry of candidates.entries()) {
        
        if (entry[1].size === 1) {
            let ingredientWithAllergen: string = Array.from(entry[1].values())[0];

            for (let keyToUpdate of candidates.keys()) {
                if (keyToUpdate !== entry[0]) {
                   candidates.get(keyToUpdate).delete(ingredientWithAllergen);
                }
            }
        }
    }


    for (let ingredientSet of candidates.values()) {
        if (ingredientSet.size === 1) ambiguous = false;
        else {
            ambiguous = true;
            break;
        } 
    }
}

let ingredientsWithAllergens: Array<string> = Array.from(candidates.values()).map<string>(x => Array.from(x.values())[0])

console.log(ingredientsWithAllergens);


let ingredientsTotal: Array<string> = [];
recipes.forEach(x => ingredientsTotal = ingredientsTotal.concat(x.ingredients))

console.log(ingredientsTotal.length);

let ingredientsWithoutAllergens = ingredientsTotal.filter(x => !ingredientsWithAllergens.includes(x));

console.log(ingredientsWithoutAllergens.length);

let sortedAllergens = Array.from(candidates.entries()).sort((a, b) => {
    if (a[0] > b[0]) return 1;
    else if (a[0] < b[0]) return -1;
    else return 0
});

console.log(sortedAllergens);

let dangerous: string = sortedAllergens.map<string>(x => Array.from(x[1].values())[0]).join(',');
console.log(dangerous);




