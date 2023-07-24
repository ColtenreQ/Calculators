/* Calculator 2 */
{
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let variables = ["x", "X", "y", "Y", "a", "A", "e", "E", "t", "T"];
  let solvers = ["-", "+", undefined];
  let calcButton = document.querySelector(".calcButton");
  let calcInput = document.querySelector(".calcInput");

  calcButton.addEventListener('click', () => {
    let inputString = calcInput.value;
    let problem = inputString.split('');
    let solution = solve(problem, derive).join('');
    console.log("This is the solution " + solution);
    //calcInput.value = solution;
  });


  let solve = (array, type) => {
    let temp = [];
    let finalArray = [];
    for (let i = 0; i <= array.length - 1; i++) {
      if (i == array.length - 1) {
        temp.push(array[i]);
        finalArray.push(type(temp));
        temp = [];
      } else if (numbers.includes(array[i]) || variables.includes(array[i])
        || array[i] == "^") {
        temp.push(array[i]);
      } else if (solvers.includes(array[i])) {
        finalArray.push(type(temp));
        temp = [];
        finalArray.push(array[i]);
      }
    }
    console.log(finalArray);
    while (solvers.includes(finalArray[finalArray.length -1 ])){
      finalArray.splice(finalArray.length - 1);
    }
    return finalArray;
  }


  let derive = (array) => {
    let resolution = [];
    let tempExp = 1;
    let tempCoef;
    let hasVariable = false;
    array.forEach((item) => {
      if(variables.includes(item)) {
        hasVariable = true;
      }
    })
    if(hasVariable){
      for (let i = array.length - 1; i >= 0; i--){

        if (numbers.includes(array[i]) && array[i - 1] == "^") {
          tempExp = Number(array.slice(i).join(''));
          console.log("This is the temp exp " + tempExp);
          if ( tempExp > 2) {
            resolution.push("^" + String(tempExp - 1));
            console.log(" This is the exponent ^" + String(tempExp - 1));
          }

        } else if (numbers.includes(array[i]) && variables.includes(array[i + 1])) {
          tempCoef = Number(array.slice(0, (i + 1)).join(''));
          tempCoef = tempExp * tempCoef;
          resolution.unshift(String(tempCoef));

        } else if (variables.includes(array[i])) {
          if (array[i+1] == "^" && numbers.includes(array[i+2])) {
            resolution.unshift(array[i]);
          }
        } 
      }
      console.log("This is the resolution " + resolution);
      return resolution.join('');
    }
  }
}


/* Calculator 1 */
{
  (function() {
    let screen = document.querySelector(".screen");
    let buttons = document.querySelectorAll(".btn");
    let clear = document.querySelector(".btn-clear");
    let equal = document.querySelector(".btn-equal");

    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        let value = e.target.dataset.num;
        screen.value += value;
      })
    });

    equal.addEventListener('click', function(e) {
      if (screen.value === '') {
        screen.value = '';
      } else {
        let answer = secureEval(screen.value);
        screen.value = answer;
      }
    });

    clear.addEventListener('click', function(e) {
      screen.value = '';
    });

    function secureEval(obj) {
      let answer = eval(`"use strict";(${obj})`);
      return answer;
    }
  })();
}