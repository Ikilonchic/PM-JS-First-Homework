const { 
    PersonGenderError,
    Person,
    PersonLog
} = require('../src/Person');


describe('Person class', () => {
    let person = new Person;

    test("start class' genders should have MAN, WOMAN, NOT_DEFINED", () => {
        expect(Person.GENDER).toEqual({
            NOT_DEFINED: 0,
            MAN: 1,
            WOMAN: 2,
        });
    });

    test('addGender static method should expect only string', () => {
        try {
            Person.addGender(2);
        } catch (e) {
            expect(e).toEqual(new PersonGenderError('Invalid gender name value'));
        }
    });

    test('addGender static method add only unique genders', () => {
        try {
            Person.addGender('MAN');
        } catch (e) {
            expect(e).toEqual(new PersonGenderError('This gender already exists'));
        }

        Person.addGender('BI');
        expect(Person.GENDER).toEqual({
            NOT_DEFINED: 0,
            MAN: 1,
            WOMAN: 2,
            BI: 3
        });
    });

    test('default instance name should be "NoName"', () => {
        expect(person.name).toBe('NoName');
    });

    test('default instance gender should be Person.GENDER.NOT_DEFINED name', () => {
        expect(person.gender).toBe('NOT_DEFINED');
    });

    test('instance should set gender that contains in Person.GENDER', () => {
        try {
            person.gender = Person.GENDER.TRANS
        } catch (e) {
            expect(e).toEqual(new PersonGenderError('This gender is not registered'))
        }

        person.gender = Person.GENDER.MAN;
        expect(person.gender).toBe('MAN');
    });
});

describe('PersonLog class', () => {
    let personLog;

    beforeEach(() => {
        personLog = new PersonLog;
    });

    test('instance should log all changes in properties in format "${prop}: ${oldValue} -> ${newValue}"', () => {
        personLog.name = 'Nikita';
        personLog.gender = Person.GENDER.WOMAN;

        expect(personLog.logs).toEqual([
            'name: NoName -> Nikita',
            'gender: NOT_DEFINED -> WOMAN'
        ]);
    });

    test('instance should log errors in format "${error.name}: ${newValue} invalid for "${prop}" property"', () => {
        personLog.gender = Person.GENDER.TRANS;

        expect(personLog.logs).toEqual([
            'PersonGenderError: undefined invalid for "gender" property'
        ]);
    });

    test('instance should throw an error when creating a new property', () => {
        try {
            personLog.age = 23;
        } catch (e) {
            expect(e).toEqual(new Error(`No "age" field in object`));
        }
    })
});
