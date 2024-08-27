let fs = require('fs')

let animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' },
]

// MAP - log all animal names
let names = animals.map((el) => el.name)
console.log(names);

// FIND - log first occurence of 'dog'
let firstDog = animals.find(el => el.species == 'dog')
console.log(firstDog)

// FILTER - filter all dogs
let allDogsNames = animals.filter(el => el.species == 'dog')
console.log(allDogsNames);



// REDUCE

var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
]

let orderSum = orders.reduce((sum, el) => sum + el.amount, 0)
console.log(orderSum);
