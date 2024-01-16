window.onload = function () {
    //variables for html id's
    var playAgainBtn = document.getElementById("playAgainBtn");
    var hideDog = document.getElementById("dog-walk-container");
    var hideJump = document.getElementById("dog-jump-container");
    var walkSprite = document.getElementsByClassName("dog-walk")[0];
    var jumpSprite = document.getElementsByClassName("dog-jump")[0];
    var score = document.getElementById("score");
    var playBtn = document.getElementById("playBtn");
    var userScore = 0;

    //Play again btn hidden and not visibile until game is over
    playAgainBtn.style.display = "none";

    //animations set to paused so user has to click play to have intro audio start
    hideDog.style.animationPlayState = "paused";
    hideJump.style.animationPlayState = "paused";
    walkSprite.style.animationPlayState = "paused";
    jumpSprite.style.animationPlayState = "paused";

    //on click this btn will resume the animations and will start the game
    playBtn.addEventListener('click',function(){
        var introMusic = new Audio('sounds/Duck-Hunt-Intro.mp3');
        introMusic.volume = 0.25;
        introMusic.play();

        hideDog.style.animationPlayState = "running";
        hideJump.style.animationPlayState = "running";
        walkSprite.style.animationPlayState = "running";
        jumpSprite.style.animationPlayState = "running";

    //this hides the dog walk animation after 6 seconds
    window.setTimeout(
        function removethis() {
            hideDog.style.opacity = '0';
            hideDog.style.display = 'none';
        }, 6000);
    //this displays the dog jump animation after 6 seconds
    window.setTimeout(
        function showthis() {
            hideJump.style.opacity = '1';
            hideJump.style.display = 'block';
        }, 6000);
    
    //Play btn will disapear on click
    playBtn.style.display = "none";
    })
    
    

    //array of different keyframe animations for ducks
    var duckFly = ["duck-fly-hori-container1", "duck-fly-hori-container2", "duck-fly-hori-container3", "duck-fly-hori-container4", "duck-fly-hori-container5", "duck-fly-diag-container1", "duck-fly-diag-container2", "duck-fly-diag-container3", "duck-fly-vert-container1", "duck-fly-vert-container2", "duck-fly-vert-container3"]

    //obj array of different duck sprites
    var duckImgs = [{
        class: "duck-fly-hori", src: "images/duck-fly-hori.png"
    }, {
        class: "duck-fly-diag", src: "images/duck-fly-diag.png"
    }, {
        class: "duck-fly-vert", src: "images/duck-fly-vert.png"
    }];

    //varaibles to output the duck thats been randomized
    const outputDuck = document.getElementById('outputDuck');
    const outputImage = document.getElementById('outputImage');
    const stageContainer = document.getElementById ("stage");

    stageContainer.addEventListener("click", function(){
        var gunShot = new Audio('sounds/Gunshot.mp3');
        gunShot.volume = 0.25;
        gunShot.playbackRate = 3;
        gunShot.play();
    })

    //on click of duck gunshot plays and the score goes up by 1
    outputDuck.addEventListener('click', function () {
        var gunShot = new Audio('sounds/Gunshot.mp3');
        gunShot.volume = 0.25;
        gunShot.playbackRate = 3;
        gunShot.play();
        userScore++;
        score.innerHTML = userScore;
        //after each click it creates a new random duck
        randomizeDuck();
    })

    //randomly goes through array and matches the 3rd index from the split to the image src and inputs that into the output duck variable to display on screen
    function randomizeDuck() {
        var index = Math.floor(Math.random() * duckFly.length)
        console.log(index)
        var animationId = duckFly[index];
        const stringArr = animationId.split('-')[2];
        var className = "";
        var imageSrc = "";
        duckImgs.map((duckImg) => {
            if (duckImg.class.includes(stringArr)) {
                className = duckImg.class;
                imageSrc = duckImg.src;
            }
        });
        outputDuck.id = animationId;
        outputImage.classList.add(className)
        outputImage.src = imageSrc
    }

    //DOG ANIMATION END
    //On dog animation end it sets dog sprite containers to display none and starts the game timer to countdown from 60
    hideJump.addEventListener("animationend", function () {
        hideJump.style.display = "none"

        var seconds = 60;
        var timer = document.getElementById("timer");
        var timerTxt = document.getElementById("timer-text");
        var countDown = setInterval(function () {
            timer.innerHTML = seconds;
            seconds--;
            //if the timer is 0 then the game ends and it stops the ducks from spawning while also making the play again btn appear and also playing the end level music
            if (seconds < 0) {
                clearInterval(countDown);
                timerTxt.innerHTML = "Duck hunt is over!";
                outputDuck.style.display = "none";
                playAgainBtn.style.display = "flex";
                var lvlComplete = new Audio('sounds/Round-Clear.mp3');
                lvlComplete.volume = 0.25;
                lvlComplete.play();
            }
        }, 1000);

        randomizeDuck();
    })
    //on click the game reloads and the player can play again if they choose
    playAgainBtn.addEventListener("click", function () {
        window.location.reload();
    })
}