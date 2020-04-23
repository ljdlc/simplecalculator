//INITIALIZE DISPLAY AREA
const display = document.querySelector('.display');
let memory;
const errarray = ['++','+*','+/','-+','-/','-*','*+','**','*/','/+','/-','/*', '--', '//'];
const symbolarray = ['+','-','*','/'];
let displayArray;

//INITIALIZE BUTTONS
const clear = document.getElementById('c');
clear.addEventListener('click', function(e){
  display.textContent = '';

});

const del = document.getElementById('del');
del.addEventListener('click', function(e){
  display.textContent= display.textContent.slice(0,display.textContent.length-1);
});

const memstore = document.getElementById('memstore');
memstore.addEventListener('click', function(e){
  if (display.textContent.includes('+') || display.textContent.includes('-')||display.textContent.includes('*')||display.textContent.includes('/')){//check if there are any oeprators before storing
    alert(`Can't store this value`);
    return;
  }memory = display.textContent;
  display.textContent = '';
});

const slash = document.getElementById('divide');
slash.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '/';
});

const seven = document.getElementById('seven');
seven.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '7';
});

const eight = document.getElementById('eight');
eight.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '8';
});

const nine = document.getElementById('nine');
nine.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '9';
});

const star = document.getElementById('multiply');
star.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '*';
});

const four = document.getElementById('four');
four.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '4';
});

const five = document.getElementById('five');
five.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '5';
});

const six = document.getElementById('six');
six.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '6';
});

const minus = document.getElementById('minus');
minus.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '-';
});

const one = document.getElementById('one');
one.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '1';
});

const two = document.getElementById('two');
two.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '2';
});

const three = document.getElementById('three');
three.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '3';
});

const plus = document.getElementById('plus');
plus.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '+';
});

const memrecall = document.getElementById('memrecall');
memrecall.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += memory;
});

const zero = document.getElementById('zero');
zero.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
});

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', function(e){
  if (display.textContent.length == 9){
    return;
  }
  display.textContent += '.';
});

//EQUALS BUTTON EVALUATES EQUATION AND RETURNS RESULT
const equals = document.getElementById('equals');
equals.addEventListener('click', function(e){
  
  for(i=0;i<errarray.length; i++){
    if (display.textContent.includes(errarray[i])){
      alert('SYNTAX ERROR');
      return;
  }}

  for(i=0;i<symbolarray.length; i++){
    if (display.textContent.startsWith(symbolarray[i])){
      alert('SYNTAX ERROR');
      return;
  }}

  for(i=0;i<symbolarray.length; i++){
    if (display.textContent.endsWith(symbolarray[i])){
      alert('SYNTAX ERROR');
      return;
  }}

  if (display.textContent.includes('/0')){
    alert(`ERROR, can't divide by zero!`);
    return;
  }
  displayArray = displayToArray();

  display.textContent = solveArray(displayArray);
});

//FUNCTIONS
function displayToArray(){
  let displayarray = [''];
  let j=0;
  
  for (i=0;i<display.textContent.length;i++){
    if (display.textContent[i] == '+' || display.textContent[i] == '-' || display.textContent[i] == '*' || display.textContent[i] == '/'){
      j++;
      displayarray[j] = display.textContent[i];
      j++;
      continue;
    }
    if (displayarray[j] === undefined){
      displayarray[j]='';
    }
    displayarray[j]=displayarray[j].concat(display.textContent[i]);
  }
  displayarray = displayarray.filter(isBlank);
  return displayarray;  
}

function solveArray(array){
  let negatives = checkNegative(array);
  if (negatives[0] != ''){
    for (i=0;i<negatives.length;i++){
      array[negatives[i]] = array[negatives[i]+1]*-1;
      array[negatives[i]+1] = '';
    }
    array = array.filter(isBlank);
  }
  
  while (array.indexOf('*')>0){
    let index = array.indexOf('*');
    array[index] = array[index-1]*array[index+1];
    array[index-1] = '';
    array[index+1] = '';
    array = array.filter(isBlank);
  }
  while (array.indexOf('/')>0){
    index = array.indexOf('/');
    array[index] = array[index-1]/array[index+1];
    array[index-1] = '';
    array[index+1] = '';
    array = array.filter(isBlank);
  }
  while (array.indexOf('+')>0 || array.indexOf('-')>0){
    if(array[1] == '+'){
      array[1] = Number(array[0])+Number(array[2]);
      array[0] = '';
      array[2] = '';
      array = array.filter(isBlank);
    }
    if(array[1] == '-'){
      array[1] = Number(array[0])-Number(array[2]);
      array[0] = '';
      array[2] = '';
      array = array.filter(isBlank);
    }}

return array;
}

function isBlank(a){
  return a !='';
}

function checkNegative(array){
  let negatives = [];
  let first;
  let second;
  for (i=0;i<array.length-1;i++){
    first = array[i];
    second = array [i+1];
    if (first+second == '+-' || first+second == '--' || first+second == '*-' || first+second == '/-'){
      negatives.push(i+1);
    }
  }
return negatives;
}