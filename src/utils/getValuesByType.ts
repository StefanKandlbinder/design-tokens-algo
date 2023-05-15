import { getNestedValue } from './getNestedValue';
import { getCalculatedValue } from './getCalculatedValue';

/* const getCalculatedValue = (value: string, tokens: any): string => {
  let math: string = '';
  let left: string = '';
  let right: string = '';
  let calculated: string = '';

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

  console.log(
    'value: ',
    value,
    'left: ',
    left,
    'math: ',
    math,
    'right: ',
    right
  );

  const traverse = (left: string, math: string, right: string) => {
    // console.log(left, math, right);

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

    if (left.indexOf('{') === 0 && left.indexOf('}') === left.length - 1) {
      left = getNestedValue(
        tokens,
        left.replace('{', '').replace('}', '')
      ).value;

      left = traverse(left, math, right);
    } else {
      left = getNestedValue(
        tokens,
        left.replace('{', '').replace('}', '')
      ).value;
    }
    if (right.indexOf('{') === 0 && right.indexOf('}') === right.length - 1) {
      right = getNestedValue(
        tokens,
        right.replace('{', '').replace('}', '')
      ).value;

      right = traverse(left, math, right);
    } else {
      right = getNestedValue(
        tokens,
        right.replace('{', '').replace('}', '')
      ).value;
    }

    if (value.includes('+')) {
      calculated = (parseFloat(left) + parseFloat(right)).toString();
    }

    if (value.includes('-')) {
      calculated = (parseFloat(left) - parseFloat(right)).toString();
    }

    if (value.includes('*')) {
      calculated = (parseFloat(left) * parseFloat(right)).toString();
    }

    if (value.includes('/')) {
      calculated = (parseFloat(left) / parseFloat(right)).toString();
    }

    // return calculated;
  };

  traverse(left, math, right);

  console.log(value);

  return calculated;
}; */

const getValue = (value: string, tokens: any): string => {
  if (value.indexOf('{') === 0 && value.indexOf('}') === value.length - 1) {
    value = getNestedValue(
      tokens,
      value.replace('{', '').replace('}', '')
    ).value;

    getValue(value, tokens);
  } else if (
    value.includes('*') ||
    value.includes('/') ||
    value.includes('+') ||
    value.includes('-')
  ) {
    value = getCalculatedValue(value, tokens).toString();
    // value = value;
  } else {
    value = value;
  }

  return value;
};

/**
 * Retrieves values based on a specified type from a nested object.
 * @param {any} object - The object to traverse and search for values.
 * @param {any} find - The type to search for in the object.
 * @param {any} tokens - The tokens object used for nested value retrieval.
 * @returns {any[]} - An array of values that match the specified type.
 */
export const getValuesByType = (object: any, find: any, tokens: any): any[] => {
  let values: any[] = [];
  let keys: any[] = [];

  /**
   * Recursive function to traverse the object and search for values.
   * @param {any} obj - The current object being traversed.
   * @param {any[]} keys - The current keys array representing the path.
   * @param {any} find - The type to search for in the object.
   * @param {any} tokens - The tokens object used for nested value retrieval.
   */
  const traverse = (obj: any, keys: any[], find: any, tokens: any) => {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'object') {
        keys.push(key);
        traverse(value, keys, find, tokens);
        keys.pop();
      } else if (
        key === 'type' &&
        value === find &&
        obj.value &&
        typeof obj.value !== 'object'
      ) {
        values.push({
          name: [...keys].join('.'),
          value: getValue(obj.value, tokens),
          rawValue: obj.value,
          type: value,
        });
      }
    }
  };

  traverse(object, keys, find, tokens);

  return values;
};
