const practice = require('./practice');
const calculator = practice.calculator;
const capitalize = practice.capitalize;
const reverseString = practice.reverseString;
const caesarCipher = practice.caesarCipher;
const arrayAnalysis = practice.arrayAnalysis;


test('capitalize 1st letter of a string', () => {
  expect(capitalize('string')).toBe('String')
});

test('reverses a string', () => {
  expect(reverseString('string')).toBe('gnirts')
});

test('adds 1+2 to equal 3', () => {
  expect(calculator.sum(1,2)).toBe(3);
});

test('subtract 5-3 to equal 2', () => {
  expect(calculator.subtract(5,3)).toBe(2);
});

test('multiply 3*4 to equal 12', () => {
  expect(calculator.multiply(3,4)).toBe(12);
});

test('divide 6/2 to equal 3', () => {
  expect(calculator.divide(6,2)).toBe(3);
});

test('Ceaser Cipher and a string given an offeset', () => {
  expect(caesarCipher('string',1)).toBe('tusjoh')
  expect(caesarCipher('String',1)).toBe('Tusjoh')
  expect(caesarCipher('string with space',2)).toBe('uvtkpi ykvj urceg')
  expect(caesarCipher('string% with&& 56! punc & numb009s',4)).toBe('wxvmrk% amxl&& 56! tyrg & ryqf009w')
  expect(caesarCipher('a ztring',1)).toBe('b ausjoh')
  expect(caesarCipher('A Ztring',1)).toBe('B Ausjoh')
  expect(caesarCipher('abc',-1)).toBe('zab')
  expect(caesarCipher('ABC',-1)).toBe('ZAB')

});


test('takes an array of numbers and returns an object with average, min, max, and length', () => {
  expect(arrayAnalysis([1,5,8,3,5,4,3])).toMatchObject({
    average : 4.143,
    min : 1,
    max : 8,
    length : 7
  })
})
