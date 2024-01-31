let formula = '';
let result;
let lastValue;
let lastValueType;

const formulaParser = () => {
  const [num1, oper, num2] = formula.split(' ')
  return [num1, oper, num2]
}

const storeValue = event => {
  const type = event.target.getAttribute('type')
  const value = event.target.getAttribute('value')
  if (type === 'operator' && result && !formula){ 
    formula = String(result) + ' ' + value;
  } else {
    if (!formula || (formula && type === 'number' && lastValueType === 'number')) {
      formula += value; 
    } else if (formula && type === 'number' && lastValueType === 'operator') {
      formula = formula + ' ' + value;
    } else if (formula && type === 'operator' && lastValueType === 'operator') {
      let [num1, oper, num2] = formulaParser()
      oper = value
      formula = num1 + ' ' + oper
    } else {
      result = eval(formula);
      formula = String(result) + ' ' + value;
    }
    }

  updateScreenFormula();
  lastValue = value;
  lastValueType = type;
  }
  
const getResult = () => {
  result = eval(formula);
  formula = '';
  updateScreenResult();
}

const AC = () => {
  result = '';
  formula = '';
  clearScreen();
}

const computePercentage = () => {
  const [num1, oper, num2] = formulaParser()
  if (num2) {
    result = eval(num1 + oper + num2 * num1 / 100)
  } else {
    result = eval(num1/100)
  }   
  formula = '';
  updateScreenResult();
}

const flipSign = () => {
  let [num1, oper, num2] = formulaParser()
  if (num2) {
    if (oper === '*' || oper === '/') { 
      num2 = Number(num2) * -1
    } else {
      oper === '+'? oper = '-' : oper = '+'
    }
    result = eval(num1 + oper + num2)
    formula = '';
    updateScreenResult();
  } else {
    num1 = Number(num1) * -1
    formula = String(num1);
    updateScreenFormula();
  }
}

const updateScreenFormula = () => {
  if (formula.length >= 10) {
    getResult()
    updateScreenResult()
  } else {
  document.querySelector('.output').innerHTML = formula;
  }
}

const updateScreenResult = () => document.querySelector('.output').innerHTML = result;
const clearScreen = () => document.querySelector('.output').innerHTML = '';