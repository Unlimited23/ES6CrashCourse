let age = -1;

// Init
setTimeout(() => {
    while (typeof(age) != 'number' || age < 0 || age > 129) {
        age = prompt();
    }

    console.log('Your age is: '+ age);
});