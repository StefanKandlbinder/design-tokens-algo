import { getNestedValue } from './getNestedValue';
import { getCalculatedValue } from './getCalculatedValue';
import { getAllKeys } from './getAllKeys';

const getValue = (value: string, tokens: any): string => {
  const allKeys = getAllKeys(tokens);

  if (value.indexOf('{') === 0 && value.indexOf('}') === value.length - 1) {
    value = allKeys.filter((item) => {
      return item.includes(value.replace('{', '').replace('}', ''));
    })[0];

    value = getNestedValue(
      tokens,
      value.replace('{', '').replace('}', '')
    ).value;

    if (
      value.includes('*') ||
      value.includes('/') ||
      value.includes('+') ||
      value.includes('-')
    ) {
      value = getCalculatedValue(value, tokens).toString();
    }

    // getValue(value, tokens);
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
