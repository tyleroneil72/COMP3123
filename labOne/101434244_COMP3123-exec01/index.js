// Exercise 1:
function capitalizeWords(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}

let inputString = "hello world";
let capitalizedString = capitalizeWords(inputString);
console.log(capitalizedString);

// Exercise 2:
function findLargestNumber(num1, num2, num3) {
  let largest = num1;
  if (num2 > largest) {
    largest = num2;
  }
  if (num3 > largest) {
    largest = num3;
  }
  return largest;
}

let num1 = 10;
let num2 = 5;
let num3 = 8;
let largestNumber = findLargestNumber(num1, num2, num3);
console.log("The largest number is: " + largestNumber);

// Exercise 3:
function moveLastThreeCharacters(str) {
  if (str.length >= 3) {
    let lastThree = str.slice(-3);
    let remaining = str.slice(0, -3);
    return lastThree + remaining;
  } else {
    return "String length must be greater or equal to three.";
  }
}

let inputString2 = "python";
let modifiedString = moveLastThreeCharacters(inputString2);
console.log(modifiedString);

// Exercise 4:
function findAngleType(angle) {
  if (angle > 0 && angle < 90) {
    return "Acute angle";
  } else if (angle === 90) {
    return "Right angle";
  } else if (angle > 90 && angle < 180) {
    return "Obtuse angle";
  } else if (angle === 180) {
    return "Straight angle";
  } else {
    return "Invalid angle";
  }
}

let angle = 45;
let angleType = findAngleType(angle);
console.log("The angle type is: " + angleType);
