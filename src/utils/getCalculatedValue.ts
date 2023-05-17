import { getAllKeys } from './getAllKeys';
import { getNestedValue } from './getNestedValue';

interface Calc {
  left: string;
  right: string;
  math: string;
}

const splitMath = (value: string): Calc => {
  let calc: Calc = {
    left: '',
    right: '',
    math: '',
  };

  if (value.includes('+')) {
    let split = value.split('+');

    calc.math = '+';
    calc.left = split[0].trim();
    calc.right = split[1].trim();
  }
  if (value.includes('-')) {
    let split = value.split('-');

    calc.math = '-';
    calc.left = split[0].trim();
    calc.right = split[1].trim();
  }
  if (value.includes('*')) {
    let split = value.split('*');

    calc.math = '*';
    calc.left = split[0].trim();
    calc.right = split[1].trim();
  }
  if (value.includes('/')) {
    let split = value.split('/');

    calc.math = '/';
    calc.left = split[0].trim();
    calc.right = split[1].trim();
  }

  return calc;
};

const doMath = (calc: Calc): number => {
  let result: number = 0;

  switch (calc.math) {
    case '+':
      result = parseFloat(calc.left) + parseFloat(calc.right);
      break;
    case '-':
      result = parseFloat(calc.left) - parseFloat(calc.right);
      break;
    case '*':
      result = parseFloat(calc.left) * parseFloat(calc.right);
      break;
    case '/':
      result = parseFloat(calc.left) / parseFloat(calc.right);
      break;
  }

  return result;
};

export const getCalculatedValue = (value: string, tokens: any) => {
  let calculated: number = 0;
  let calc: Calc;
  let calculations: string[] = [];

  calc = splitMath(value);

  const allKeys = getAllKeys(tokens);

  const traverse = (value: string, calc: Calc, calculated: number) => {
    if (!calc.left.includes('{')) {
      calc.left = calc.left;
    }

    if (!calc.right.includes('{')) {
      calc.right = calc.right;
    }

    if (!calc.right.includes('{') && !calc.left.includes('{')) {
      calculated = doMath(calc);
      calculations.pop();

      if (calculations.length) {
        let tmpCalc = splitMath(calculations[calculations.length - 1]);
        if (tmpCalc.left.includes('{')) {
          calculations[
            calculations.length - 1
          ] = `${calculated} ${tmpCalc.math} ${tmpCalc.right}`;
        } else if (tmpCalc.right.includes('{')) {
          calculations[
            calculations.length - 1
          ] = `${tmpCalc.left} ${tmpCalc.math} ${calculated}`;
        } else {
          value = calculations[calculations.length - 1];
        }
      }
    }

    calc = splitMath(value);

    if (calc.left.includes('{')) {
      if (calculations[calculations.length - 1] !== value) {
        calculations.push(value);
      }
      calc.left = calc.left.replace('{', '').replace('}', '');
      const result = allKeys.filter((item) => {
        if (item === calc.left) {
          return item;
        } else {
          return item.includes(calc.left);
        }
      });
      calc.left = getNestedValue(tokens, result[0]).value;
      value = calc.left;
      traverse(value, calc, calculated);
    }
    if (calc.right.includes('{')) {
      if (calculations[calculations.length - 1] !== value) {
        calculations.push(value);
      }
      calc.right = calc.right.replace('{', '').replace('}', '');
      const result = allKeys.filter((item) => {
        if (item === calc.right) {
          return item;
        } else {
          return item.includes(calc.right);
        }
      });
      calc.right = getNestedValue(tokens, result[0]).value;
      value = calc.right;
      traverse(value, calc, calculated);
    }
  };

  traverse(value, calc, calculated);

  let result = splitMath(calculations[0]);
  return doMath(result);
};
