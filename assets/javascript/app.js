// declaring trivia questions, choices, photo to display

var trivia = [{
    question: "In Aladdin, what is the name of Aladdin's pet monkey?",
    choices: ["Rajah", "Sam", "Aboo", "Iago"],
    answer: 2,
    image: "assets/images/aboo.png"
},{
    question: "In The Jungle Book, who teaches Mowgli about The Bare Necesseties of Life?",
    choices: ["Baloo", "Bagheera", "King Louie", "Sher Khan"],
    answer: 0,
    image: "assets/images/baloo.jpeg"
},{
    question: "Which Disney princess has a racoon as a sidekick?",
    choices: ["Snow White", "Rapunzel", "Sleeping Beauty", "Pocahontas"],
    answer: 3,
    image: "assets/images/pocahontas.jpg"
},{
    question: "Which was the first full-length animated film released by Disney?",
    choices: ["Sleeping Beauty", "Snow White and the Seven Dwarfs", "Pocahontas", "The Little Mermaid"],
    answer: 1,
    image: "assets/images/snow-white.png"
},{
    question: "What is the first Disney film to feature a completely original storyline?",
    choices: ["The Little Mermaid", "Tangled", "The Rescuers", "The Lion King"],
    answer: 3,
    image: "assets/images/lion-king.jpg"
},{
    question: "In Alice in Wonderland,  what is the name of Alice's pet cat?",
    choices: ["Mr. Rabbit", " The Mad Hatter", "The Queen of Hearts", "Dinah"],
    answer: 3,
    image: "assets/images/alice.png"
},{
    question: "In the Princess and the Frog, what fictional country is Prince Naveen from",
    choices: ["Genovia", "Maldonia", "France", "Orlinea"],
    answer: 1,
    image: "assets/images/tiana.gif"
}];

// declaring global variables

var correctGuess = 0;
var wrongGuess = 0;
var unanswered = 0;
var timer = 10;
var intervalId;
var userGuess = "";
var running = false;
var questionCount = trivia.length;
var index;
var pick;
var newArray = [];
var holder = [];

$("#reset").hide();

// // click button to start game

$("#start").on("click", function() {
    $("#start").hide();
    questionDisplay();
    runTimer();
    for (var i = 0; i < trivia.length; i++) {
        holder.push(trivia[i]);
    }
})

// // start timer

function runTimer() {
    if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
}

// // stop timer

function stopTimer() {
    running = false;
    clearInterval(intervalId);
}

// // creating countdown timer

function decrement() {
    $("#time-left").html("<h4> Time remaining: " + timer + "</h4>");
    timer --;

//  stop if at 0

    if (timer === 0) {
        unanswered++;
        stopTimer();
        $("#answerField").html("<p> Time's up!!! The correct answer is: " + pick.choices[pick.answer] + "</p>");
        hidePicture();
    }
}

// // pick a random question from array if not already chosen
// // display and loop through possible choices

function questionDisplay() {
    index = Math.floor(Math.random() * trivia.length);
    pick = trivia[index];

    if (pick.shown) {
        questionDisplay();
    }
    else {
        console.log(pick.question);


        $("#questionField").html("<h3>" + pick.question + "</h3>");
        $("#answerField").html("<h3>" + pick.choices + "<h3>");
        
    }
    $(".answerChoice").on("click", function(){
        userGuess = parseInt($(this).attr("data-guess"));
    
        if(userGuess === pick.answer) {
        stop()
        correctGuess++;
        userGuess = "";
        $("#answerField").html("<h4>YOU'RE CORRECT!!!</h4>");
        hidePicture();
        }
        else {
            stopTimer();
            wrongGuess++;
            userGuess = "";
            $("#answerField").html("<h4>Incorrect!! The right answer is:" + pick.choice[pick.answer] + "</h4>")
            hidePicture();
        }
    })
}

function hidePicture() {
    $("#answerField").append("<img src=" + pick.image + ">");
    newArray.push(pick);
    trivia.splice(index, 1);

    var hiddenPic = setTimeout(function() {
        $("#answerField").empty();
        timer = 15;

        if ((wrongGuess + correctGuess + unanswered) === questionCount) {
            $("#questionField").empty();
            $("#questionField").html("GAME OVER!! Here's your score:");
            $("#answerField").append("<h4 Correct Answers: " + correctGuess + "</h4>");
            $("#answerField").append("<h4 Wrong Answers: " + wrongGuess + "</h4>");
            $("#answerField").append("<h4 Unanswered: " + unanswered + "</h4>")
    
            $("#reset").show();
            correctGuess = 0;
            wrongGuess = 0;
            unanswered = 0;
        }
        else {
            runTimer();
            questionDisplay();
        }
    }, 3000);
    
}

$("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerField").empty();
    $("#questionField").empty();
    for (var i = 0; i < holder.length; i++) {
        trivia.push(holder[i]);
    }
    runTimer();
    questionDisplay();

})


// i was unable to get the user to be able to click on the choices for the answer. The game just runs through with the timer. This game was more difficult than I originally thought it would be. 























