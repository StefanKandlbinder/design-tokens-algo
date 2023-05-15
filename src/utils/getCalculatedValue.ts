import { getAllKeys } from './getAllKeys';
import { getNestedValue } from './getNestedValue';

export const getCalculatedValue = (value: string, tokens: any) => {
  let math: string = '';
  let left: string = '';
  let right: string = '';
  let calculated: number = 0;
  // let calculatedLeft: number = 0;
  // let calculatedRight: number = 0;
  let sum: number = 0;

  if (value.includes('+')) {
    math = '+';
    let split = value.split('+');
    left = split[0].trim();
    right = split[1].trim();
  }
  if (value.includes('-')) {
    math = '-';
    let split = value.split('-');
    left = split[0].trim();
    right = split[1].trim();
  }
  if (value.includes('*')) {
    math = '*';
    let split = value.split('*');
    left = split[0].trim();
    right = split[1].trim();
  }
  if (value.includes('/')) {
    math = '/';
    let split = value.split('/');
    left = split[0].trim();
    right = split[1].trim();
  }

  const allKeys = getAllKeys(tokens);

  const traverse = (
    value: string,
    left: string,
    math: string,
    right: string,
    calculated: number
  ) => {
    if (!left.includes('{')) {
      left = left;
      // calculatedLeft *= parseFloat(left);
    }
    if (!right.includes('{')) {
      right = right;
      // calculatedRight *= parseFloat(right);
    }

    if (value.includes('+')) {
      math = '+';
      let split = value.split('+');
      left = split[0].trim();
      right = split[1].trim();
    }
    if (value.includes('-')) {
      math = '-';
      let split = value.split('-');
      left = split[0].trim();
      right = split[1].trim();
    }
    if (value.includes('*')) {
      math = '*';
      let split = value.split('*');
      left = split[0].trim();
      right = split[1].trim();
    }
    if (value.includes('/')) {
      math = '/';
      let split = value.split('/');
      left = split[0].trim();
      right = split[1].trim();
    }

    if (left.includes('{')) {
      left = left.replace('{', '').replace('}', '');
      const result = allKeys.filter((item) => {
        if (item === left) {
          return item;
        } else {
          return item.includes(left);
        }
      });
      left = getNestedValue(tokens, result[0]).value;
      value = left;
      traverse(value, left, math, right, calculated);
    }
    if (right.includes('{')) {
      right = right.replace('{', '').replace('}', '');
      const result = allKeys.filter((item) => {
        if (item === right) {
          return item;
        } else {
          return item.includes(right);
        }
      });
      right = getNestedValue(tokens, result[0]).value;
      value = right;
      traverse(value, left, math, right, calculated);
    }

    if (!right.includes('{') && !left.includes('{')) {
      switch (math) {
        case '+':
          calculated = parseFloat(left) + parseFloat(right);
          break;
        case '-':
          calculated = parseFloat(left) - parseFloat(right);
          break;
        case '*':
          calculated = parseFloat(left) * parseFloat(right);
          break;
        case '/':
          calculated = parseFloat(left) / parseFloat(right);
          break;
      }

      sum += calculated;
    }
  };

  traverse(value, left, math, right, calculated);

  return sum;
};
