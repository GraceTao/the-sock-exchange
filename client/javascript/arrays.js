let fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// for (let i=0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }

// let j=0;
// while (j < fruits.length) {
//     console.log(fruits[j]);
//     j++
// }

// let k=0;
// do {
//     console.log(fruits[k]);
//     k++;
// } while (k < fruits.length);

// for (let fruit of fruits) {
//     console.log(fruit);
// }

// fruits.forEach(fruit => console.log(fruit));

let upperCaseFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperCaseFruits);