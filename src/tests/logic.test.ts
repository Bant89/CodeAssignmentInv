import { sanitizeInput } from '../logic'

import { ElementType } from '../utils/types'

test('Empty value', () => {
  expect(sanitizeInput('')).toEqual({
    value: "Error value can't be empty",
    data: {},
    type: ElementType.Error
  });
});

test('Zip code too large', () => {
  expect(sanitizeInput('123456789')).toEqual({
    value: "Error 123456789 zip code should have only 5 digits",
    data: {},
    type: ElementType.Error
  });
});

test('Zip code too short', () => {
  expect(sanitizeInput('1234')).toEqual({
    value: "Error 1234 zip code should have only 5 digits",
    data: {},
    type: ElementType.Error
  });
});

test('City name including numbers', () => {
  expect(sanitizeInput('Los Ang123les')).toEqual({
    value: "Error Los Ang123les city name shouldn't include numbers",
    data: {},
    type: ElementType.Error
  });
});

test('Zip code including letters', () => {
  expect(sanitizeInput('12345lesd')).toEqual({
    value: "Error 12345lesd zip code shouldn't include letters",
    data: {},
    type: ElementType.Error
  });
});

