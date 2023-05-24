/**
 * Retrieves a nested value from an object using a dot-separated key string.
 * @param {any} obj - The object to retrieve the nested value from.
 * @param {string} keys - The dot-separated key string representing the path to the nested value.
 * @returns {any} - The nested value if found, otherwise undefined.
 */
export const getNestedValue = (obj: any, keys: string): any => {
  return keys.split(".").reduce((acc: any, key: any) => acc && acc[key], obj);
};
