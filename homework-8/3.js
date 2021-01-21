const assert = require('assert');


function extendWith(obj1, obj2) {
    return {
        ...obj2,
        ...obj1,
    }
}


assert.deepStrictEqual(extendWith({
        flatWhite: ['doppio', 'hot', 'milk'],
        isValid: true 
    }, 
    {
        isValid: false,
        additionalProp: { thisIsGoodProp: 123 }
    }
),
{
    flatWhite: ['doppio', 'hot', 'milk'],
    isValid: true,
    additionalProp: { thisIsGoodProp: 123 }
});

assert.deepStrictEqual(extendWith({
        isValid: false,
        myMax: 9990
    },
    {
        isValidos: false,
        myMin: 8999
    }
),
{
    isValid: false,
    myMax: 9990,
    isValidos: false,
    myMin: 8999
});


console.log('Looks good');
