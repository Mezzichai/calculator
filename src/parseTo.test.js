import parseToInt from './parseTo.js';


test('parses a string of "1234"', () => {
  expect(parseToInt('1234').toBe(1234))
})