//correct answer is index of the array
//add inner text function for correct! and wrong
//convert to javascript then commit and summarize what's missing
//start quiz first page, highscores html (use score variable already here),subtract time when question is wrong
//print wrong and correct? do i have to do that because I have previous and next and the other function
//lines that need to  be checked: 123,60, 106
//need to figure out radio input stuff and .remove method, 237

var questions = [{
        question: "1. Some question",
        choices: ["wrong", "wrong", "wrong", "correct"],
        correctAnswer: 3
    }, {
        question: "2. Some question",
        choices: ["wrong", "correct", "wrong", "wrong"],
        correctAnswer: 1
    },
    {
        question: "3. Some question",
        choices: ["wrong", "wrong", "wrong", "correct"],
        correctAnswer: 3
    }, {
        question: "4. Some question",
        choices: ["wrong", "wrong", "correct", "wrong"],
        correctAnswer: 2
    }, {
        question: "5. Some question",
        choices: ["correct", "wrong", "wrong", "wrong"],
        correctAnswer: 0
    }, {
        question: "6. Some question",
        choices: ["wrong", "wrong", "correct", "wrong"],
        correctAnswer: 2
    }, {
        question: "7. Some question",
        choices: ["wrong", "correct", "wrong", "wrong"],
        correctAnswer: 1
    }, {
        question: "8. Some question",
        choices: ["correct", "wrong", "wrong", "wrong"],
        correctAnswer: 0
    }, {
        question: "9. Some question",
        choices: ["wrong", "wrong", "correct", "wrong"],
        correctAnswer: 2
    }, {
        question: "10. Some question",
        choices: ["wrong", "correct", "wrong", "wrong"],
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

    //will put in later
    //  displayStartPage();{

    // }

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
            var selectedAnswer = $("input[type='radio']:checked").val();
            //var selectedAnswer = document.querySelector("input[type='radio']:checked").value;

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