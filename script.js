//start quiz first page, highscores html (use score variable already here),subtract time when question is wrong
//print wrong and correct? do i have to do that because I have previous and next and the other function
//lines that need to  be checked: 123,60, 106
//need to figure out radio input stuff and .remove method, 237,227

var questions = [{
        question: " 1. What is the HTML tag used to write JavaScript code?",
        choices: ["js", "javascript", "scripted", "script"],
        correctAnswer: 3
    }, {
        question: " 2. Choose the correct JavaScript syntax to change the content of the following HTML code: <p id=\"geek\">GeeksforGeeks</p>",
        choices: [" document.getElement(“geek”).innerHTML=”I am a Geek”;", "document.getElementById(“geek”).innerHTML=”I am a Geek”;", "document.getId(“geek”)=”I am a Geek”;", "document.getElementById(“geek”).innerHTML=I am a Geek;"],
        correctAnswer: 1
    },
    {
        question: " 3. Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
        choices: ["alert(“GeeksforGeeks”)", "alertbox(“GeeksforGeeks”);", "msg(“GeeksforGeeks”);", "alert(“GeeksforGeeks”);"],
        correctAnswer: 3
    }, {
        question: " 4. What is the syntax for creating a function in JavaScript named as testFunction?",
        choices: ["function = testFunction()", "function := testFunction()", "function testFunction()", "function : testFunction()"],
        correctAnswer: 2
    }, {
        question: " 5. What is the JavaScript syntax for printing values in Console?",
        choices: ["console.log(5);", "print(5)", "console.print(5);", "print.console(5);"],
        correctAnswer: 0
    }, {
        question: " 6. How do you initialize an array in JavaScript?",
        choices: ["var Geeks= “Geek1”, “Geek2”, “Geek3”", "var Geeks=(1:Geek1, 2:Geek2, 3:Geek3)", "var Geeks=[“Geek1”, “Geek2”, “Geek3”]", "var Geeks=(1=Geek1, 2=Geek2, 3=Geek3)"],
        correctAnswer: 2
    }, {
        question: " 7. What will be the command to print the number of characters in the string “GeeksforGeeks”?",
        choices: ["document.write(“GeeksforGeeks”.len);", "document.write(“GeeksforGeeks”.length);", "document.write(sizeof(“GeeksforGeeks”));", "document.write(lenof(“GeeksforGeeks”));"],
        correctAnswer: 1
    }, {
        question: " 8. What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
        choices: ["trim()", "strip()", "stripped()", "trimmed()"],
        correctAnswer: 0
    }, {
        question: " 9. Which of the following is an advantage of using JavaScript?",
        choices: ["increased interactivity.", "Less server interaction.", "All of the above.", "Immediate feedback from the users."],
        correctAnswer: 2
    }, {
        question: " 10. JavaScript is a ________ Side Scripting Language.",
        choices: ["Server", "Browser", "ISP", "None of the above"],
        correctAnswer: 1
    }
];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 20;

document.addEventListener("DOMContentLoaded", function() {
    // Display the first question
    displayCurrentQuestion();
    var quizMessage = document.querySelector(".quizMessage");
    var preButton = document.querySelector(".preButton");
    quizMessage.style.display = 'none';
    preButton.getAttribute('disabled', 'disabled');

    quizTimer();

    preButton.addEventListener("click", function() {

        if (!quizOver) {
            if (currentQuestion == 0) { return false; }

            if (currentQuestion == 1) {
                document.getElementById('preButton').getAttribute('disabled', 'disabled');

            }

            currentQuestion--; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();

            }
        } else {
            if (viewingAns == 3) { return false; }
            currentQuestion = 0;
            viewingAns = 3;
            viewResults();
        }
    });


    // On clicking next, display the next question
    var nextButton = document.querySelector(".nextButton");

    nextButton.addEventListener("click", function() {
        if (!quizOver) {
            //if quiz not over 
            //var selectedAnswer = $("input[type='radio']:checked").val();
            //query selector for radio groups
            var selectedAnswer = document.querySelector("input[type='radio']:checked").value;
            console.log('selected anser: ', selectedAnswer)

            if (selectedAnswer == undefined) {
                quizMessage.textContent = "Please select an answer";
                quizMessage.style.display = '';

            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                quizMessage.style.display = 'none';
                if (selectedAnswer == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = selectedAnswer;

                currentQuestion++;
                if (currentQuestion >= 1) {
                    //$('.preButton').prop("disabled", false);
                    preButton.getAttribute("disabled", false);
                }
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();

                } else {
                    displayScore();
                    iTimeShow.innerHTML = "Quiz completed with time to spare!";
                    c = 185;
                    preButton.textContent = "View Answer";
                    nextButton.textContent = "Play Again?";
                    quizOver = true;
                    return false;

                }
            }

        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            iTimeShow.innerHTML = "Time Remaining:";
            iSelectedAnswer = [];
            nextButton.textContent = "Next Question";
            preButton.textContent = "Previous Question";
            //document.getElementById("preButton").setAttribute('disabled', 'disabled');
            resetQuiz();
            viewingAns = 1;
            displayCurrentQuestion();
            hideScore();
        }
    });
});



function quizTimer() {
    if (c == 185) {
        return false;
    }

    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt(c / 60) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    var timer = document.querySelector("#timer");
    timer.innerHTML = result;
    var iTimeShow = document.querySelector("#iTimeShow");

    if (c == 0) {
        displayScore();
        iTimeShow.innerHTML = "Time is up!";
        c = 185;
        preButton.textContent = "View Answer";
        var nextButton = document.querySelector(".nextButton");
        nextButton.textContent = "Play Again?";
        //$(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;

    }

    c = c - 1;
    t = setTimeout(function() {
        quizTimer()
    }, 1000);
}


// This displays the current question AND the choices
function displayCurrentQuestion() {

    if (c == 185) {
        c = 180;
        quizTimer();
    }
    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector(".quizContainer > .question");
    var choiceList = document.querySelector(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;


    questionClass.textContent = question;
    // Set the questionClass text to the current question

    // Remove all current <li> elements (if any)
    //var test = choiceList.find("li");
    //test.removeC();

    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            //var correctCheck = document.querySelector('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>');
            //correctCheck.appendTo(choiceList);
            $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            // var radioButton = document.createElement("input");
            // radioButton.setAttribute("type", "radio")
            // radioButton.setAttribute("name", "name " + i)
            // choiceList.appendChild(radioButton)
            // console.log('radiobutton ', radioButton.checked)
            //create list item, append radio items 

        } else {
            //var wrongCheck = document.querySelector('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>');
            //wrongCheck.appendChild(choiceList);
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    var scoreMessage = document.querySelector(".quizContainer > .result");
    scoreMessage.textContent = "You scored: " + correctAnswers + " out of " + questions.length;
    scoreMessage.style.display = '';
}

function hideScore() {
    var hiddenScore = document.querySelector(".result");
    hiddenScore.style.display = 'none';
}

// This displays the current question AND the choices
function viewResults() {

    if (currentQuestion == 10) { currentQuestion = 0; return false; }
    if (viewingAns == 1) { return false; }
    hideScore();

    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector(".quizContainer > .question");
    var choiceList = document.querySelector(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    questionClass.textContent = question;
    //choiceList.querySelector("li").parentNode.removeChild(choiceList.querySelector("li"));

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;

    //checking answers at the end
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            if (questions[currentQuestion].correctAnswer == i) {
                //('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendChild(choiceList);
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        } else {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        }
    }

    currentQuestion++;

    setTimeout(function() {
        viewResults();
    }, 3000);
}

//function displayStartPage() {
//    var contentId = document.getElementById("content");
//Creating h1 for displaying game name/questions
//   var questionH1 = createElement("h1", "id", "h1", "Coding Quiz Challenge");
//appendChild(contentId, questionH1);

//Creating Description of Quiz
//   var descriptionDiv = createElement("p", "id", "description", "Try to answer the following code - related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!");
//   appendChild(contentId, descriptionDiv);

//Creating Button to Start Quiz, needing to add one more Attribute to this one
//   var startButton = createElement("button", "id", "start-quiz", "Start Quiz");
//   startButton.setAttribute("type", "button");
//   appendChild(contentId, startButton);

//  document.getElementById("start-quiz").addEventListener("click", startQuiz);
//}
//displayStartPage();