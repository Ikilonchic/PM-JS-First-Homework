// Task 1 ...

function* interval(n, m) {
    if (n == m) return;

    let direction = n < m ? 1 : -1;

    n += direction;

    while (n != m) {
        yield n;
        n += direction;
    }
}

// Task 2 ...

const pow = (n, m = 2) => n ** m;

// Task 3 ...

function mathRounding(num) {
    return Math.round(num);
}

// Task 4 ...

function randInSegment(n, m) {
    if (n == m) return n;

    let rand_index = Math.floor(Math.random() * (Math.abs(m - n) + 1));
    let direction = n < m ? 1 : -1;

    return n + rand_index * direction;
}

// Task 5 ...

function findAllSubstrIndex(str, substr) {
    let index = [];

    while(str.indexOf(substr) != -1) {
        index.push(str.indexOf(substr) + index.length * substr.length);
        str = str.replace(substr, '');
    }

    return index;
}

// Task 6 ...

function findAllNumbers(str) {
    return str.match(/\d+/g).map(value => Number(value));
}

// Task 7 ...

function findAllCapitalLetters(str) {
    return str.match(/[A-Z]/g);
}

// Task 8 ...

const hex_RegExp = /#[a-fA-F0-9]{3,6}\W/;
const open_h1_RegExp = /<h1(\s?(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?)*>/, close_h1_RegExp = /<\/h1>/;
const open_script_RegExp = /<script(\s?(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?)*>/;
const phone_RegExp = /\+?\s?\(380\)[\s\-]?0(67|68|96|97|98|50|66|95|99|63|73|93)[\s\-\.]?\d{3}[\s\-\.]?\d{2}[\s\-\.]?\d{2}/;


// Validations ...

function isEmptyStr(str) {
    return str === '' ? true : false;
}

function isNumber(num) {
    if (isEmptyStr(num)) return false;

    num = Number(num);

    return !Number.isNaN(num) && 
           num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER;
}

// Select task input, output ...

function selectInputByIndex(index) {
    return document.querySelectorAll('.task')[index].querySelector('.task__input').querySelectorAll('input[type=text]');
}

function selectOutputByIndex(index) {
    return document.querySelectorAll('.task')[index].querySelector('.task__result');
}

// Task context ...

function taskContext(index) {
    let input = selectInputByIndex(index);

    return {
        output: selectOutputByIndex(index),
        arg0: input[0].value,
        arg1: input[1].value
    }
}

// Task type with 2 numeric variables ...

function taskWithTwoInputNum(index, callback) {
    return () => {
        let context = taskContext(index);

        if (!isNumber(context.arg0) || !isNumber(context.arg1)) {
            alert("Вы ввели не валидные значения!");
            return;
        }

        context.arg0 = Number(context.arg0);
        context.arg1 = Number(context.arg1);

        context.output.value = callback(context.arg0, context.arg1);
    }
}

// Catch unexpected error)

function catchError(callback) {
    return function() {
        try {
            callback();
        } catch (error) {
            console.log(error);
            alert("Попробуйте ввести значения, которые не будут ломать приложение!) Спасибо.")
        }
    }
}


const task_0 = catchError(taskWithTwoInputNum(0, (arg0, arg1) => {
    let str_range = "";

    for (num of interval(Math.round(arg0), Math.round(arg1))) {
        str_range += num +  ", ";
    }

    return str_range.substring(0, str_range.length-2);
}));

const task_1 = catchError(taskWithTwoInputNum(1, (arg0, arg1) => pow(arg0, arg1)));
const task_2 = catchError(taskWithTwoInputNum(2, (arg0, arg1) => mathRounding(arg0 * 0.3) + ', ' + mathRounding(arg1 * 0.3)));
const task_3 = catchError(taskWithTwoInputNum(3, (arg0, arg1) => randInSegment(Math.round(arg0), Math.round(arg1))));


function task_4() {
    let context = taskContext(4);

    if (isEmptyStr(context.arg0) || isEmptyStr(context.arg1)) {
        alert("Вы ввели пустую строку!");
        return;
    }

    context.output.value = findAllSubstrIndex(context.arg0, context.arg1).join(', ');
}


const test_str = "ECMAScript 2015 (6th Edition, ECMA-262)";

(function () {
    let output = selectOutputByIndex(5);

    output.value = findAllNumbers(test_str).join(', ');
})();

(function () {
    let output = selectOutputByIndex(6);

    output.value = findAllCapitalLetters(test_str).join(', ');
})();


let file;

function readFile(e) {
    file = '';

    let input = document.querySelectorAll('.task')[7].querySelector('.task__input').querySelectorAll('input[type=radio]');
    input.forEach(value => value.setAttribute("disabled", "true"));

    let f = e.target.files[0];

    if (!f.type.includes('text')) {
        alert('Вы выбрали не текстовый файл.');
        return;
    }

    let reader = new FileReader();

    reader.onload = (e) => {
        file += e.target.result;
    };

    reader.onerror = () => {
        alert(reader.error);
    }

    reader.onloadend = () => {
        input.forEach(value => value.removeAttribute("disabled"));
    }

    reader.readAsText(f);
}

function task_7(e) {
    let output = selectOutputByIndex(7);
    let checked_file = file;
    let all_occurrence;

    if(e.target.name == "radio"){
        switch (+e.target.value) {
            case 0:
                all_occurrence = file.match(RegExp(hex_RegExp, 'g'));
            case 1:
                all_occurrence ||= file.match(RegExp(phone_RegExp, 'g'));
                all_occurrence.forEach((value) => checked_file = checked_file.replaceAll(value, ' Тут -> ' + value + ' <- Тут '));
                break;
            case 2:
                checked_file = file.replaceAll(RegExp(open_h1_RegExp, 'g'), ' Тут -> <h2> <- Тут ').replaceAll(RegExp(close_h1_RegExp, 'g'), ' Тут -> </h2> <- Тут ');
                break;
            case 3:
                all_occurrence = file.match(RegExp(open_script_RegExp, 'g'));
                all_occurrence = all_occurrence.concat('</script>');
                all_occurrence.forEach((value) => checked_file = checked_file.replaceAll(value, ' Тут -> ' + value + ' <- Тут '));
                break;
            default:
                break;
        };

        output.value = checked_file;
    }
}
