/**
 * Retrieves all unique keys with 'type' values from a nested object.
 * @param {object} obj - The object to traverse and extract keys from.
 * @returns {string[]} - An array of unique keys with 'type' values.
 */
export const getAllKeys = (obj: object): string[] => {
  const values: string[] = [];

  /**
   * Recursive function to traverse the object and extract keys.
   * @param {any} obj - The current object being traversed.
   * @param {string[]} keys - The current keys array representing the path.
   */
  const traverse = (obj: any, keys: string[]) => {
    for (const key in obj) {
      const currentKeys = [...keys, key];
      const value = obj[key];

      if (typeof value === 'object') {
        traverse(value, currentKeys);
      } else if (key === 'type' && !values.includes(value)) {
        currentKeys.pop();
        values.push(currentKeys.join('.'));
      }
    }
  };

  traverse(obj, []);

  return values;
};
