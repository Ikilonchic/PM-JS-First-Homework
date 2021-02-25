const Caller = require('../src/Caller');

describe('Caller class', () => {
    let callerOne = new Caller,
        callerTwo = new Caller,
        totalCountOfCalls = 0;

    test('start value of callCount function should be zero', () => {
        expect(callerOne.callCount()).toBe(0);
    });

    test('should be the number of calls to the "callMe" function', () => {
        let countOfCalls = 5;

        for (let i = 0; i < countOfCalls; i++) {
            callerOne.callMe();
            totalCountOfCalls++;
        }

        expect(callerOne.callCount()).toBe(countOfCalls);
    });

    test('should be the number of calls to the callMe function from all instances', () => {
        let countOfCalls = 5;

        for (let i = 0; i < countOfCalls; i++) {
            callerOne.callMe();
            callerTwo.callMe();
            totalCountOfCalls += 2;
        }

        expect(callerOne.callCount()).toBe(totalCountOfCalls);
    });
});