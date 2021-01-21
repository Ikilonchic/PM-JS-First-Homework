const assert = require('assert');


function flatWhite(arr) {
    return arr.reduce((prev, value) => {
        value instanceof Array ? prev.push(...value) : prev.push(value);
        return prev;
    }, []);
}


assert.deepStrictEqual(flatWhite(['doppio', ['hot'], 'milk']), ['doppio', 'hot', 'milk']);

assert.deepStrictEqual(flatWhite([['espresso', 'hot'], 'milk']), ['espresso', 'hot', 'milk']);


console.log('Looks good');
