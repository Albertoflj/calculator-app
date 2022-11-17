let result = document.getElementById("result");
let buttons = document.getElementsByClassName("val");
let operators = document.getElementsByClassName("operator");
let val = "";
let list_of_operators = ["+", "-", "*", "/"];
let duplicators = ["0", "."];
let operators_number = 0;

let themes = document.getElementById("themes");
let body = document.body;

//add theme by default
const theme = {
  1: "theme1",
  2: "theme2",
  3: "theme3",
};
let currentTheme = 1;

//get if any theme was set
if (localStorage.getItem("theme")) {
  currentTheme = localStorage.getItem("theme");
  themes.value = currentTheme - 1;
  body.classList.add(theme[currentTheme]);
} else {
  localStorage.setItem("theme", currentTheme);
}

//change theme
themes.addEventListener("change", () => {
  currentTheme = parseInt(themes.value) + 1;
  themes.value = currentTheme - 1;
  body.classList.remove("theme1", "theme2", "theme3");
  body.classList.add(theme[currentTheme]);
  localStorage.setItem("theme", currentTheme);
});

//add value to the string
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    //add the value of the button to the result
    let button = buttons[i].value;
    val += button;
    result.innerHTML = val;
  });
}
//add the operator to the string
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", () => {
    let operator = operators[i].value;
    //check if the last character is an operator, if it is, replace it with the new operator
    if (list_of_operators.includes(val[val.length - 1])) {
      val = val.slice(0, -1);
      val += operator;
      result.innerHTML = val;
    } else {
      val += operator;
      result.innerHTML = val;
      operators_number++;
    }
    //if there are more than 2 operators, calculate the result
    if (operators_number == 2) {
      val = val.slice(0, -1);
      calculate();
      val += operator;
      result.innerHTML = val;
      operators_number = 1;
    }
  });
}

//calculate
function calculate() {
  //the result takes the value of the evaluation of the string
  try {
    res = eval(val);
  } catch (err) {
    result.innerHTML = "Error";
    setTimeout(() => {
      clearAll();
    }, 1000);
  }

  //check if it's a float number, if it is, round it to 2 decimal places
  if (res % 1 != 0) {
    res = res.toFixed(2);
  } else {
    res = res.toFixed(0);
  }
  //check if the result is divided by zero, if it is, display error for 1 second
  if (res == Infinity || res == -Infinity) {
    result.innerHTML = "Error";
    setTimeout(() => {
      clearAll();
    }, 1000);
  } else {
    result.innerHTML = res;
  }
  val = res;
}

//clear all
function clearAll() {
  res = 0;
  val = "";
  result.innerHTML = 0;
}
//delete last character
function deleteKey() {
  val = val.slice(0, -1);
  result.innerHTML = val;
}
