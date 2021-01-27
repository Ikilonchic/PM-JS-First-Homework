const taskElement1 = document.getElementById('task-1');
const taskElement2 = document.getElementById('task-2');
const taskElement3 = document.getElementById('task-3');
const taskElement4 = document.getElementById('task-4');
const taskElement5 = document.getElementById('task-5');
const taskElement6 = document.getElementById('task-6');

let task1 = new Task({
    taskElement: taskElement1,
    description: 'Запросить у пользователя id - вывести данные по пользователю.',
    inputs: [
        new Input({
            name: 'ID',
            type: 'number',
        }),
    ],
    solution(id) {
        return JSON.stringify(usersMap[id] || 'Пользователь не найден');
    },
});

let task2 = new Task({
    taskElement: taskElement2,
    description: 'Запросить у пользователя id, есть такой есть - запросить дополнительное поле - адрес. Вывести адрес.',
    inputs: [
        new Input({
            name: 'ID',
            type: 'number',
        }),
        new Input({
            name: 'Property',
            type: 'text',
            value: 'address'
        }),
    ],
    solution(id, property) {
        return JSON.stringify(usersMap[id] ? usersMap[id][property] || 'Свойство не найдено' : 'Пользователь не найден');
    }
});

let task3 = new Task({
    taskElement: taskElement3,
    description: 'Запросить у пользователя ввести название компании - найти пользователя с такой компанией - вернуть объект пользователя.',
    inputs: [
        new Input({
            name: 'Company',
            type: 'text',
        }),
    ],
    solution(company) {
        return JSON.stringify(Object.values(usersMap).find(user => user.company.name === company) || 'Пользователь не найден');
    }
});

let task4 = new Task({
    taskElement: taskElement4,
    description: 'Написать функцию которая находила бы первый и последний индекс вхождения в массив переданного числа (запросить у пользователя, элементы массива разделять пробелом).',
    inputs: [
        new Input({
            name: 'Array',
            type: 'text',
        }),
        new Input({
            name: 'Value',
            type: 'number',
        }),
    ],
    solution(arr, value) {
        return arr.split(' ').findFirstAndLastIndex(value).join(' ');
    }
});

let task5 = new Task({
    taskElement: taskElement5,
    description: 'Написать функцию пересечения двух массивов (элементы массива разделять пробелом).',
    inputs: [
        new Input({
            name: 'Array',
            type: 'text',
        }),
        new Input({
            name: 'Array',
            type: 'text',
        }),
    ],
    solution(arr1, arr2) {
        return Array.intersection(arr1.split(' '), arr2.split(' ')).join(' ');
    }
});

let task6 = new Task({
    taskElement: taskElement6,
    description: 'Написать функцию объединения двух массивов по индексу (элементы массива разделять пробелом).',
    inputs: [
        new Input({
            name: 'Array 1',
            type: 'text',
        }),
        new Input({
            name: 'Array 2',
            type: 'text',
        }),
        new Input({
            name: 'Index',
            type: 'number',
        }),
    ],
    solution(arr1, arr2, index) {
        return arr1.split(' ').concatByIndex(Number(index), arr2.split(' ')).join(' ');
    }
});

task1.init();
task2.init();
task3.init();
task4.init();
task5.init();
task6.init();

// Отсортировать массив из первого задания в порядке убывания id ...

console.log(USERS.sort((a, b) => b.id - a.id));

// *Отсортировать массив из первого задания в порядке убывания даты регистрации (registrationDate) ...

console.log(USERS.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)));
