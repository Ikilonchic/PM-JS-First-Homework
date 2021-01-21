const assert = require('assert');


function extendWithEndless(...objects) {
    return objects.reduce((prev, value) => {
        return {
            ...prev,
            ...value,
        }
    }, {})
}

assert.deepStrictEqual(extendWithEndless({
        flatWhite: ['doppio', 'hot', 'milk'],
        isValid: true
    },
    {
        isValid: false,
        additionalProp: { thisIsGoodProp: 123 }
    },
    {
        prop3: true
    },
    {
        prop4: true
    },
    {
        isValid: [false, false]
    }),
{
    flatWhite: ['doppio', 'hot', 'milk'],
    isValid: [false, false],
    additionalProp: {
        thisIsGoodProp: 123
    },
    prop3: true,
    prop4: true
});


console.log('Looks good');
