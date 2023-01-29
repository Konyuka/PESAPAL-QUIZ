<script setup>

const booleanInterpreter = (expression) =>{
  // remove any whitespace from the expression
  expression = expression.replace(/\s/g, '');

  // check if the expression is just a single value (T or F)
  if (expression === 'T') return true;
  if (expression === 'F') return false;

  // split the expression into sub-expressions based on the operator
  let parts = [];
  let currentPart = '';
  let insideParentheses = 0;
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (char === '(') {
      insideParentheses++;
    } else if (char === ')') {
      insideParentheses--;
    } else if (char === '∧' || char === '∨') {
      if (insideParentheses === 0) {
        parts.push(currentPart);
        parts.push(char);
        currentPart = '';
        continue;
      }
    }
    currentPart += char;
  }
  parts.push(currentPart);

  // evaluate each sub-expression
  let result = parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    let operator = parts[i];
    let nextPart = evaluate(parts[i + 1]);
    if (operator === '∧') {
      result = result && nextPart;
    } else if (operator === '∨') {
      result = result || nextPart;
    }
  }

  return result;
} 

</script>

<template>
  <header>

    <div>
      PESAPAL ASSIGNMENT
    </div>
  </header>

</template>

<style scoped>
</style>
