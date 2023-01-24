const answersArray = []
answersArray.push(questionsArray[0].options[3])
answersArray.push(questionsArray[1].options[0])
answersArray.push(questionsArray[2].options[2])
answersArray.push(questionsArray[3].options[3])
answersArray.push(questionsArray[4].options[0])

const startBtn = document.querySelector('#start');
const startScreen = document.querySelector('#start-screen')
const questionsScreen = document.querySelector('#questions')
const questionTitle = document.querySelector("#question-title")
const choicesDiv = document.querySelector("#choices")
const timeEl = document.querySelector("#time")
const endScreen = document.querySelector('#end-screen')
const finalScore = document.querySelector("#final-score")
const submitBtn = document.querySelector('#submit')
const initials = document.querySelector('#name')
const saved = document.querySelector(".saved");
const error = document.querySelector(".error");
const toggleSoundBtn = document.querySelector("#toggleSound")
const feedbackEl = document.querySelector(".feedback")

let soundOn = true;
const  correctSound = new Audio ('./assets/sfx/correct.wav');
const incorrectSound = new Audio ('./assets/sfx/incorrect.wav')
let questionIndex = 0;
let timeLeft = 60
let intervalId = null
let score = 0;
let highScoresArray = []
const countDown = () => {
    if (timeLeft <= 0){
        clearInterval(intervalId)
        questionsScreen.classList.toggle("hide");
        endScreen.classList.toggle("hide")
        finalScore.textContent = score;
        timeEl.textContent = `0`;
        timeEl.style.color = "red";
    } else {
        timeLeft --
        timeEl.textContent = timeLeft;
    }
}
const displayQuestion = () => {
    feedbackEl.textContent = ""
    if (questionIndex >= questionsArray.length){
        questionsScreen.classList.toggle("hide");
        endScreen.classList.toggle("hide")
        finalScore.textContent = score;
        clearInterval(intervalId)
    } else if (choicesDiv.childElementCount > 0){
        questionTitle.textContent = questionsArray[questionIndex].question
        for (let i = 0; i < choicesDiv.childElementCount; i++){
            choicesDiv.children[i].innerHTML = questionsArray[questionIndex].options[i];
        } 
    }
    else { 
        questionTitle.textContent = questionsArray[questionIndex].question
        const btn = []
            for (let i = 0; i < questionsArray[questionIndex].options.length; i++){
                if(choicesDiv.childElementCount < 4){
                    btn[i] = document.createElement("button");
                    btn[i].innerText = questionsArray[questionIndex].options[i];
                    choicesDiv.appendChild(btn[i]);
                } else {
                    btn[i].textContent = questionsArray[questionIndex].options[i];
                }
                btn[i].addEventListener("click", function (e){
                    if (e.target.innerText === answersArray[questionIndex]){
                        if (soundOn) {
                            correctSound.play()
                            feedbackEl.textContent = "Correct!"
                            
                        }
                        feedbackEl.textContent = "Correct!"
                        score ++;
                        questionIndex ++;
                    } else {
                        if (soundOn){
                            incorrectSound.play()
                        }
                        feedbackEl.textContent = "Wrong"
                        questionIndex ++;
                        timeLeft -= 10;
                    }
                    setTimeout(displayQuestion,1000)
                    
                })
            }   
    }
} 
startBtn.addEventListener('click', function() {
        timeLeft = 60;
    intervalId = setInterval(countDown, 1000)
    startScreen.classList.toggle("hide")
    questionsScreen.classList.toggle("hide")
    displayQuestion()
})
submitBtn.addEventListener("click", function(event){
    event.preventDefault()
    submitBtn.disabled = true;
    let string = name.value
    let regex = /^[A-Za-z]+$/i;
    console.log(string.match(regex));
    if ( !string.match(regex)){
        error.style.display = "block";
        error.style.color = "red";
        return;
    }
    else {
        let tempScores = JSON.parse(localStorage.getItem("score"))
        let saveObj = {
            name: name.value,
            score: score
        }
        initials.value = ""

        saved.style.display = "inline";
        let pulledScores = []
        if (localStorage.getItem("score") === null){
            localStorage.setItem("score", JSON.stringify(saveObj) )
        }
        else if (tempScores.length > 1) {
            tempScores.forEach(element => {
                return pulledScores.push(element);
            })
            pulledScores.push(saveObj);
            console.log(pulledScores)
            localStorage.setItem("score", JSON.stringify(pulledScores))
        }
        else {
            pulledScores.push(tempScores)
            pulledScores.push(saveObj)
            localStorage.setItem("score", JSON.stringify(pulledScores))
        }
    } 
})

