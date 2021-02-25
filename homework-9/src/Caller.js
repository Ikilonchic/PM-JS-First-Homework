class Caller {
    static #callingCount = 0;

    callMe() {
        Caller.#callingCount++;
    }

    callCount() {
        return Caller.#callingCount;
    }
}

module.exports = Caller
