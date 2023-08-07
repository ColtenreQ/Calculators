/* Calculator 2 */
{
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let variables = ["x", "X", "y", "Y", "a", "A", "e", "E", "t", "T"];
  let solvers = ["-", "+", undefined];
  let calcButton = document.querySelector(".calcButton");
  let integrateButton = document.querySelector(".integrateButton");
  let calcInput = document.querySelector(".calcInput");
  let clearInput = document.querySelector(".clear");

  calcButton.addEventListener("click", () => {
    let inputString = calcInput.value;
    let problem = inputString.split("");
    console.log(problem);
    let solution = solve(problem, derive).join("");
    console.log("This is the solution " + solution);
    calcInput.value = solution;
  });

  integrateButton.addEventListener("click", () => {
    let inputString = calcInput.value;
    let problem = inputString.split("");
    console.log(problem);
    let solution = solve(problem, integrate).join("");
    console.log("This is the solution " + solution);
    calcInput.value = solution;
  });

  clearInput.addEventListener("click", () => {
    if(calcInput.value != "") {
      calcInput.value = "";
    }
  });

  let solve = (array, type) => {
    let temp = [];
    let finalArray = [];
    for (let i = 0; i <= array.length - 1; i++) {
      if (i == array.length - 1) {
        temp.push(array[i]);
        finalArray.push(type(temp));
        temp = [];
      } else if (
        numbers.includes(array[i]) ||
        variables.includes(array[i]) ||
        array[i] == "^"
      ) {
        temp.push(array[i]);
      } else if (solvers.includes(array[i])) {
        finalArray.push(type(temp));
        temp = [];
        finalArray.push(array[i]);
      }
    }
    console.log(finalArray);
    while (solvers.includes(finalArray[finalArray.length - 1])
    || finalArray[finalArray.length -1] == "0") {
      finalArray.splice(finalArray.length - 1);
    }
    return finalArray;
  };

  let derive = (array) => {
    let tempExp, tempCoef, finalExp, finalCoef;
    let hasVariable = false;
    array.forEach((item) => {
      if (variables.includes(item)){
        hasVariable = true;
      }
    })
    if (!hasVariable) {
      return 0;
    }
    for (let i = 0; i <= array.length; i++) {
      if (variables.includes(array[i]) && array[i+1] == "^") {
        if (numbers.includes(array[i-1])) {
          tempCoef = Number(array.slice(0, i).join(""));
          console.log(tempCoef);
          tempExp = Number(array.slice(i+2).join(""));
          console.log(tempExp);
          finalCoef = tempCoef * tempExp;
          finalExp = tempExp - 1;
          if (finalExp <= 1) {
            return String(finalCoef + array[i]);
          } else {
            return String(finalCoef + array[i] + "^" + finalExp);
          }
          
        } else {
          tempExp = Number(array.slice(i+2).join(""));
          finalCoef = tempExp;
          finalExp = tempExp - 1;
          if (finalExp <= 1) {
            return String(finalCoef + array[i]);
          } else {
            return String(finalCoef + array[i] + "^" + finalExp);
          }
        }
      } else if (variables.includes(array[i]) && array[i+1] != "^") {
        if (numbers.includes(array[i-1])) {
          finalCoef = Number(array.slice(0, i).join(""));
          return String(finalCoef);
        } else {

          return "1";
        }
      }
    } 
  }

  function integrate(array) {
    let resolution = [];
    let tempExp = 2;
    let tempCoef;
    let tempVariable;
    let hasVariable = false;
  
    array.forEach((item) => {
      if (variables.includes(item)) {
        tempVariable = item;
        hasVariable = true;
      }
    });

    if (!hasVariable) {
      console.log("Item does not have a variable.");
      if (variables.includes(tempVariable)) {
        array.push(tempVariable);
        return (array.join(""));
      } else {
        array.push("x");
        return array.join("");
      }
    }
  
    if (hasVariable) {
      for (let i = array.length; i >= 0; i--) {

        if (array[i] == "^" && variables.includes(array[i-1])){
          tempExp = Number(array.slice(i+1).join("")) + 1;
          console.log("The exponent is " + tempExp);
          resolution.push(String(tempExp));

        } else if (variables.includes(array[i]) && array[i] == array[0] && array[i+1] =="^") {
          resolution.unshift("^");
          resolution.unshift(array[i]);
          resolution.unshift("(1/" + String(tempExp) + ")");
          
        } else if (variables.includes(array[i]) && array[i+1] != "^" && array[i] == array [0]) {
          resolution.unshift("^2");
          resolution.unshift(array[i]);
          resolution.unshift("(1/2)");

        } else if (variables.includes(array[i]) && array[i+1] != "^") {
          resolution.unshift("^2");
          resolution.unshift(array[i]);

        } else if (variables.includes(array[i])) {
          resolution.unshift("^");
          resolution.unshift(array[i]);

        } else if (numbers.includes(array[i]) && variables.includes(array[i+1])) {
          tempCoef = Number(array.slice(0, i+1).join(""));
          if (tempCoef % tempExp == 0) {
            console.log("This divides evenly");
            tempCoef = tempCoef / tempExp;
            resolution.unshift(String(tempCoef));
          } else {
            tempCoef = "(" + String(tempCoef) + "/" + String(tempExp) + ")";
            resolution.unshift(tempCoef);
          }
        }
      }
      return resolution.join("");
    }
  }
  
}

/* Calculator 1 */
{
  (function () {
    let screen = document.querySelector(".screen");
    let buttons = document.querySelectorAll(".btn");
    let clear = document.querySelector(".btn-clear");
    let equal = document.querySelector(".btn-equal");

    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let value = e.target.dataset.num;
        screen.value += value;
      });
    });

    equal.addEventListener("click", function (e) {
      if (screen.value === "") {
        screen.value = "";
      } else {
        let answer = secureEval(screen.value);
        screen.value = answer;
      }
    });

    clear.addEventListener("click", function (e) {
      screen.value = "";
    });

    function secureEval(obj) {
      let answer = eval(`"use strict";(${obj})`);
      return answer;
    }
  })();
}
