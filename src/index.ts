// Import stylesheets
import './style.css';
import { tokens } from './tests/tokens/calculatedTokens';
import { getFindings } from './utils/getFindings';
import { getValuesByType } from './utils/getValuesByType';
import { getAllKeys } from './utils/getAllKeys';
import { getCalculatedValue } from './utils/getCalculatedValue';
import { getNestedValue } from './utils/getNestedValue';

const allKeys = getAllKeys(tokens);

console.log(allKeys);

allKeys.map((key: any) => {
  const result = allKeys.filter((item) => {
    if (item === key) {
      return item;
    } else {
      return item.includes(key);
    }
  });
});

const set = 'global';
const types = getFindings(tokens[set], 'type');

types.map((type) => {
  const values = getValuesByType(
    tokens['global']['spacing']['scale'],
    type,
    tokens
  );

  console.log(type, values);
});
