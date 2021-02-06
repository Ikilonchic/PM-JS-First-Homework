class PersonGenderError extends Error {
    // PersonGenderError's constructor ...

    constructor(message) {
        super(message);
        this.name = 'PersonGenderError';
    };
};

class Person {
    // Person's static ...

    static #GENDER_LIST = {
        NOT_DEFINED: 0,
        MAN: 1,
        WOMAN: 2,
    };

    static get GENDER() {
        return { ...Person.#GENDER_LIST };
    }

    static addGender(newGender) {
        if (typeof newGender !== 'string') {
            throw new PersonGenderError('Invalid gender name value');
        }

        let isGenderExist = Object.keys(Person.GENDER).includes(newGender.toUpperCase());
        if (isGenderExist) {
            throw new PersonGenderError('This gender already exists');
        }

        Person.#GENDER_LIST[newGender.toUpperCase()] = Object.keys(Person.GENDER).length;
    }
    
    static getGenderById(id) {
        return Object.entries(PersonLog.GENDER).find(value => value[1] === id)[0];
    }

    // Person's instance ...
    
    set gender(newGender) {
        if (!Object.values(Person.GENDER).includes(newGender)) {
            throw new PersonGenderError('This gender is not registered');
        }
        
        this.#genderValue = newGender;
    }

    get gender() {
        return Person.getGenderById(this.#genderValue);
    }

    name;
    #genderValue;

    // Person's construnctor ...

    constructor(name = 'NoName', gender = Person.GENDER.NOT_DEFINED) {
        this.name = name;
        this.gender = gender;
    }
}

class PersonLog extends Person {
    // PersonLog's static ...

    static #LOGGER = {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            if(!(prop in target)) {
                throw new Error(`No "${prop}" field in object`);
            }

            let oldValue = target[prop];

            try {
                target[prop] = value;
                target.#logsList.push(`${prop}: ${oldValue} -> ${prop === 'gender' ? Person.getGenderById(value): value}`);
            } catch (error) {
                target.#logsList.push(`${error.name}: ${value} invalid for "${prop}" property`);
            }
        },
    };

    // PersonLog's instance ...

    #logsList = [];

    get logs() {
        return [ ...this.#logsList ];
    }

    // PersonLog's constructor ...

    constructor(name, gender) {
        super(name, gender);
        return new Proxy(this, PersonLog.#LOGGER);
    }
}

module.exports = {
    PersonGenderError,
    Person,
    PersonLog,
};
