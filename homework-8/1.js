const assert = require('assert');


function multiplyBy(multiplier, ...multiplied) {
    return multiplied.map(value => value * multiplier);
}


assert.deepStrictEqual(multiplyBy(2, 3, 4, 5), [6, 8, 10]);

assert.deepStrictEqual(multiplyBy(10, 20, 40, 100, 200, 3), [200, 400, 1000, 2000, 30]);


console.log('Looks good');
