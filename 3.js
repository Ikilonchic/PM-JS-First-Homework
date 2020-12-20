const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const month = prompt("Пожалуйста, введите месяц: ");

if (!isNaN(month)) {
    alert(+month >= 1 && +month <= 12 ? months[+month - 1] : "Что-то Вы с номером напутали!");
} else {
    alert(months.includes(month) ? months.indexOf(month) + 1 : "А Вы точно месяц ввели?!")
}
