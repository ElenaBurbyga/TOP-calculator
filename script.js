let formula = '';
let result;

const storeValue = event => {
  const type = event.target.getAttribute('type')
  const value = event.target.getAttribute('value')
  if (type === "operator" && result && formula === '') {
   formula = String(result)
   formula += value
  } else {
    formula += value
  }
  console.log(formula)
}

const getResult = () => {
  result = eval(formula);
  formula = '';
  console.log(result)
}

