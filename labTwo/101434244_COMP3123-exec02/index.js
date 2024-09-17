// Exercise One
const greeter = (myArray, counter) => {
  const greetText = "Hello, ";
  for (let i = 0; i < myArray.length; i++) {
    console.log(greetText + myArray[i]);
  }
};
greeter(["Randy", "John", "Bob"], 3);

// Exercise Two
const capitalizeFirstLetter = ([first, ...rest]) =>
  first.toUpperCase() + rest.join("");

console.log(capitalizeFirstLetter("fooBar"));
console.log(capitalizeFirstLetter("nodeJs"));

// Exercise Three
const colors = ["red", "green", "blue"];
const capitalizedColors = colors.map(
  (color) => color[0].toUpperCase() + color.slice(1)
);
console.log(capitalizedColors);

// Exercise Four
const values = [1, 60, 34, 30, 20, 5];
const lessThan20 = values.filter((value) => value < 20);
console.log(lessThan20);

// Exercise Five
const array = [1, 2, 3, 4, 5];
const calculateSum = array.reduce((a, b) => a + b, 0);
const calculateProduct = array.reduce((a, b) => a * b, 1);
console.log(calculateSum);
console.log(calculateProduct);

// Exercise Six
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
  details() {
    return `Model: ${this.model} Engine ${this.year}`;
  }
}

class Sedan extends Car {
  constructor(model, year, balance) {
    super(model, year);
    this.balance = balance;
  }
  info() {
    return `${this.model} has a balance of $${this.balance}`;
  }
}

const car2 = new Car("Pontiac Firebird", 1976);
console.log(car2.details());

const sedan = new Sedan("Volvo SD", 2018, 30000);
console.log(sedan.info());
