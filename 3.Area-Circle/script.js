let radius = 0;

// Init
const calcArea = function() {
    console.log('Enter a radius: ');

    radius = prompt();

    if (!isNaN(Number(radius))) {
        radius = Math.PI * Math.pow(radius, 2);

        console.log('The area of the circle is: '+ radius);
    } else {
        console.log('You\'ve entered a non-numeric input, try again');
        calcArea();
    }
}

calcArea();