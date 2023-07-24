/* Calculator 2 */
{
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let variables = ["x", "X", "y", "Y", "a", "A", "e", "E", "t", "T"];
  let solvers = ["-", "+"];
  let calcButton = document.querySelector(".calcButton");
  let calcInput = document.querySelector(".calcInput");

  calcButton.addEventListener('click', () => {
    let inputString = calcInput.value.toString();
    let problem = inputString.split('');
    solve(problem, derive());
  });

  function solve(array, type) {
    let temp = [];
    let finalArray = [];
    for (i = 0; i <= array.length; i++) {
      if (array.length == i) {
        temp.push(array[i]);
        finalArray.push(type(temp));
        temp = [];
        finalArray.join();
        return finalArray
      } else if (numbers.includes(array[i]) || variables.includes(array[i])
        || array[i] == "^") {
        temp.push(array[i]);
      } else if (solvers.includes(array[i])) {
        finalArray.push(array[i]);
      }
    }
  }

  function derive(array) {
    return "testReturn";
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