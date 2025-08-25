//select random colour with sound this step is when the game chooses a pattern
var buttonColours=["red", "blue", "green", "yellow"];
//track of what game gives
var gamePattern=[];
//track of what user clicks
var userClickedPattern=[];


var started = false;
var level= 0;

var score=0;
var highscore=0;


//start game by pressing anykey on keyboard
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;

    }
});

//2) to keep a track of what the buttons user has clicked
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
//3)play sound and fade animate when the user clicks the button
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);//check answer
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length) {
            scoreUpdate();
            setTimeout(function(){
                nextSequence()
            },1000);
        }}
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    //increase level everytime this fucntion is called
    level++;
    $("#level-title").text("Level " + level);
// 1) make the game pick random button out of 4 buttons.
// keep a track using array and add sound and fade effects
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

//for sound based on the button
function playSound(name){
     var audio= new Audio("sounds/"+ name + ".mp3");
     audio.play();
};

//to add animations
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
    }, 100);
};

function startOver(){
    level=0;
    gamePattern=[]
    started=false;
    if(score>highscore){
        highscore= score;
        $("#high").text("Highscore:"+ highscore);
    }
    score=0;
    $("#nscore").text("Score:" + score);
}

function scoreUpdate(){
    score+=50;
    $("#nscore").text("Score:"+ score);
}








