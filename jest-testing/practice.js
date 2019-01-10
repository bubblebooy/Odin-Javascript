

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

const calculator = {
  sum : (a, b) => {
    return a + b;
  },
  subtract : (a, b) => {
    return a - b;
  },
  divide :(a, b) => {
    return a / b;
  },
  multiply : (a, b) => {
    return a * b;
  }
}

function caesarCipher(str, shift) {
  str = str.split("").map((char) => shiftChar(char , shift))
  return str.join("");
}

function shiftChar(c , shift) {
  let charCode = c.charCodeAt(0)
  if (charCode >= 97 && charCode <= 122) {
    charCode = mod(charCode - 97 + shift , 26)+ 97
  } else if (charCode >= 65 && charCode <= 90) {
    charCode = mod(charCode - 65 + shift ,26) + 65
  }
  return String.fromCharCode(charCode)
}

function mod(n,m) {
  return ((n % m) + m ) % m;
}

function arrayAnalysis(arry) {
  return {
    average : Math.round(1000 * arry.reduce((sum,a) => sum + a , 0)/arry.length)/1000,
    min: Math.min(...arry),
    max: Math.max(...arry),
    length : arry.length
  }
}
module.exports = {arrayAnalysis , caesarCipher , calculator , capitalize , reverseString};
