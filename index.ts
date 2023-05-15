// Import stylesheets
import './style.css';
import { tokens } from './tests/tokens/calculatedTokens';
import { getFindings } from './utils/getFindings';
import { getValuesByType } from './utils/getValuesByType';
import { getAllKeys } from './utils/getAllKeys';
import { getNestedValue } from './utils/getNestedValue';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Figma Tokens Doc Generator</h1>`;

const allKeys = getAllKeys(tokens);

// console.log(allKeys);

allKeys.map((key: any) => {
  const result = allKeys.filter((item) => {
    if (item === key) {
      return item;
    } else {
      return item.includes(key);
    }
  });
  // console.log(key, getNestedValue(tokens, result[0]).value);
});

const set = 'global';
const types = getFindings(tokens[set], 'type');

types.map((type) => {
  const values = getValuesByType(tokens[set], type, tokens.global);
  console.log(type, values);
});
