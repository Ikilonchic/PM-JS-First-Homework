const createUsersMap = function (usersArr) {
    if(!(usersArr instanceof Array)) return {};

    let usersObj = {};

    for (let i = 0; i < usersArr.length; i++) {
        usersObj[i + 1] = usersArr[i];

        Object.defineProperty(usersObj[i + 1], 'id', {
            value: usersObj[i + 1].id,
        });

        let oldPhoneValue = usersObj[i + 1].phone;

        Object.defineProperty(usersObj[i + 1], 'phone', {
            get: function() {
                return this.value;
            },
            set: function(newPhone) {
                if (phoneRegExp.test(newPhone)) return;
                this.value = newPhone;
            },
        });

        usersObj[i + 1].phone = oldPhoneValue;
    }

    return usersObj;
}

const usersMap = createUsersMap(USERS);
