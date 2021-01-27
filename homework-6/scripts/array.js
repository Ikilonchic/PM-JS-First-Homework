/*
 * Написать функцию которая находила бы первый и последний индекс вхождения в массив переданного числа (запросить у пользователя).
 * И выводила  в виде [[FIRST_INDEX], [LAST_INDEX]].
 * Если такого числа нет - выводить вместо индексов -1 [-1,-1].
 */

Array.prototype.findFirstAndLastIndex = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            for (let j = this.length - 1; j >= i; j--) {
                if (this[j] === value) {
                    return [i, j];
                }
            }
        }
    }

    return [-1, -1];
};

/*
 * Написать функцию пересечения двух массивов.
 */

Array.intersection = function (arr1, arr2) {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return [];

    return arr1.filter(value => arr2.includes(value))
};

/*
 * Написать функцию, которая принимает два массива и индекс. (arr1, arr2, index)
 * Возвращает новый массив в котором в первый массив по переданному индексу записывается второй массив.
 */

Array.prototype.concatByIndex = function (index, arr) {
    if (!(arr instanceof Array)) return [];

    if (this.length < index || index < 0) return [];

    return [...this.slice(0, index), ...arr, ...this.slice(index)];
};
