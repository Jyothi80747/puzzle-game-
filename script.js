const puzzles = {
easy: [
{
q: "What is the output of this JavaScript code?",
code: "let x = 5;\nconsole.log(x + 3);",
a: ["5","8","53","Error"],
correct: 1,
hint: "Add the two numbers."
},
{
q: "Which keyword declares a constant?",
code: "_____ PI = 3.14;",
a: ["let","var","const","static"],
correct: 2,
hint: "It starts with C."
},
{
q: "What does this return?",
code: "console.log(10 % 3);",
a: ["1","3","0","10"],
correct: 0,
hint: "The % operator gives the remainder."
},
{
q: "What is the output?",
code: "console.log('Hello'.length);",
a: ["4","5","6","Hello"],
correct: 1,
hint: "Count the characters."
}
],

medium: [
{
q: "Find the output of this loop.",
code: "for(let i=0; i<3; i++) {\n console.log(i);\n}",
a: ["1 2 3","0 1 2","0 1 2 3","3"],
correct: 1,
hint: "The loop stops before i reaches 3."
},
{
q: "What does this expression return?",
code: "console.log(2 ** 3);",
a: ["6","8","9","5"],
correct: 1,
hint: "The ** operator means exponentiation."
},
{
q: "What is the output?",
code: "let x = [10,20,30];\nconsole.log(x[1]);",
a: ["10","20","30","1"],
correct: 1,
hint: "Array indexes start at zero."
},
{
q: "Which method adds an element to an array?",
code: "let arr = [1,2];\narr._____ (3);",
a: ["pop","push","shift","slice"],
correct: 1,
hint: "It adds an element at the end."
}
],

hard: [
{
q: "What is the output?",
code: "console.log(typeof null);",
a: ["null","object","undefined","boolean"],
correct: 1,
hint: "This is a famous JavaScript quirk."
},
{
q: "What will this print?",
code: "console.log(0 == false);",
a: ["true","false","undefined","Error"],
correct: 0,
hint: "Consider JavaScript type coercion."
},
{
q: "What is the output?",
code: "let x = [1,2,3];\nconsole.log(x.map(n => n*2));",
a: ["[1,2,3]","[2,4,6]","[1,4,9]","Error"],
correct: 1,
hint: "map transforms each array element."
},
{
q: "What does this return?",
code: "console.log('5' + 2);",
a: ["7","52","Error","NaN"],
correct: 1,
hint: "The + operator can concatenate strings."
}
]
};

let questions = [];
let index = 0;
let score = 0;
let time = 60;
let timerInterval;
let answered = false;

function changeDifficulty() {
 restartGame();
}

function restartGame() {
 clearInterval(timerInterval);

 const difficulty = document.getElementById("difficulty").value;
 questions = [...puzzles[difficulty]].sort(() => Math.random() - 0.5);

 index = 0;
 score = 0;
 time = 60;
 answered = false;

 document.getElementById("score").textContent = score;
 document.getElementById("timer").textContent = time;

 loadQuestion();
 startTimer();
}

function startTimer() {
 timerInterval = setInterval(() => {
   time--;
   document.getElementById("timer").textContent = time;

   if(time <= 0) {
     clearInterval(timerInterval);
     finishGame();
   }
 }, 1000);
}

function loadQuestion() {
 if(index >= questions.length) {
   finishGame();
   return;
 }

 answered = false;

 const p = questions[index];

 document.getElementById("question").textContent =
   p.q;

 document.getElementById("code").textContent =
   p.code;

 document.getElementById("level").textContent =
   index + 1;

 document.getElementById("bar").style.width =
   (index / questions.length * 100) + "%";

 document.getElementById("feedback").textContent = "";

 const answers = document.getElementById("answers");
 answers.innerHTML = "";

 p.a.forEach((answer, i) => {
   const btn = document.createElement("button");
   btn.className = "answer";
   btn.textContent = answer;

   btn.onclick = () => checkAnswer(i, btn);

   answers.appendChild(btn);
 });
}

function checkAnswer(choice, button) {
 if(answered) return;
 answered = true;

 const p = questions[index];
 const buttons = document.querySelectorAll(".answer");

 buttons.forEach((btn, i) => {
   btn.disabled = true;

   if(i === p.correct) {
     btn.classList.add("correct");
   }
 });

 if(choice === p.correct) {
   score += 10;
   document.getElementById("score").textContent = score;

   document.getElementById("feedback").textContent =
     "🎉 Correct! +10 points";
 } else {
   button.classList.add("wrong");

   document.getElementById("feedback").textContent =
     "❌ Incorrect! Correct answer: " + p.a[p.correct];
 }
}

function showHint() {
 if(answered) return;

 document.getElementById("feedback").textContent =
   "💡 Hint: " + questions[index].hint;
}

function nextQuestion() {
 if(!answered) {
   document.getElementById("feedback").textContent =
     "⚠️ Answer the current puzzle first!";
   return;
 }

 index++;
 loadQuestion();
}

function finishGame() {
 clearInterval(timerInterval);

 document.getElementById("bar").style.width = "100%";

 document.getElementById("question").textContent =
   "🏆 Game Completed!";

 document.getElementById("code").textContent =
   "Your final score: " + score + "\n\nKeep practicing to become a coding master!";

 document.getElementById("answers").innerHTML = "";

 document.getElementById("feedback").textContent =
   "You scored " + score + " out of " + (questions.length * 10) + " possible points.";

 document.getElementById("level").textContent = "✓";
}

restartGame();

