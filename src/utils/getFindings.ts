/**
 * Retrieves all unique findings that match the specified key from a nested object.
 * @param {any} object - The object to traverse and search for findings.
 * @param {any} find - The key to search for in the object.
 * @returns {any[]} - An array of unique findings that match the specified key.
 */
export const getFindings = (object: any, find: any): any[] => {
  let findings: any[] = [];

  /**
   * Recursive function to traverse the object and search for findings.
   * @param {object} obj - The current object being traversed.
   * @param {any} find - The key to search for in the object.
   */
  const traverse = (obj: any, find: any) => {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'object') {
        traverse(value, find);
      } else if (key === find && !findings.includes(value)) {
        findings.push(value);
      }
    }
  };

  traverse(object, find);

  return findings;
};
