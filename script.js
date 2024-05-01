let quest = document.querySelector(".Question");
let answer_but = document.querySelectorAll(".Answer");
let game = document.querySelector(".Emil"); 
game.style.display = "none";
let starting = document.querySelector(".start")
let ending = document.querySelector(".end")
ending.style.display = "none";
let isEndofGame = false;

let total_answers_given = 0;

let buttonStart = document.querySelector('.start-button');

let correct = 0;

let text1 = document.querySelector('.Text-smaller1')
let text2 = document.querySelector('.Text-smaller2')
let text3 = document.querySelector('.Text-smaller3')


function randint(min,max,sign){
    if(sign == "/")
    {
        return Math.random() * (max-min) + min
    }
    else
    {
    return Math.round(Math.random() * (max-min) + min)
    }
}

function getRandomSign(sign){
    return sign[randint(0,3)]
}

function endOfGame() {
    game.style.display = "none";
    starting.style.display = "none";
    ending.style.display = "flex";
    text1.innerHTML = `Correct: ${correct}`;
    text3.innerHTML = `Accuracy: ${Math.round(correct * 100 / 8)}%`;
    total_answers_given = 0;
    correct = 0; 
    current_question = new Question;
    current_question.display();

    setTimeout(function() {
        starting.style.display = "flex";
        ending.style.display = 'none';
    }, 10000);
}
buttonStart.addEventListener("click", function() {
    current_question = new Question;
    total_answers_given = 0; 
    correct = 0; 
    starting.style.display = "none";
    game.style.display = "flex"; 
    if(isEndofGame == false)
    {
        time = setTimeout(endOfGame, 45000) 
    }
});

class Question {
    constructor() {
        const signs = ['+', '-', '/', '*'];
        let a = randint(1, 30);
        let b = randint(1, 30);
        this.sign = getRandomSign(signs); 
        this.ques = `${a} ${this.sign} ${b}`;
        
        if(this.sign == '+') {
            this.correct = a + b;
        } else if(this.sign == "-") {
           this.correct = a - b; 
        } else if(this.sign == "/") {
           this.correct = a / b;
        } else if(this.sign == "*") {
           this.correct = a * b; 
        }
        this.answers = [
            this.correct,
            randint(this.correct - 15, this.correct - 1, this.sign),
            randint(this.correct - 15, this.correct - 1, this.sign),
            randint(this.correct + 1, this.correct + 15, this.sign),
            randint(this.correct + 1, this.correct + 15, this.sign)
        ];
    }
    display() {
        quest.innerHTML = this.ques;
        this.answers.sort(() => Math.random() - 0.5);

        for (let i = 0; i < this.answers.length; i++) {
            if (this.sign != "/") {
                answer_but[i].innerHTML = Math.round(this.answers[i]);
            } else {
                answer_but[i].innerHTML = this.answers[i].toFixed(2);
            }
        }
    }
}

buttonStart.addEventListener("click", function() {
    correct = 0;
    total_answers_given = 0; 
    current_question = new Question();
    current_question.display();
});

let current_question = new Question();
current_question.display();


let answer_buttons = document.querySelectorAll(".Answer");
for (let i = 0; i < answer_but.length; i++) {
    answer_but[i].addEventListener('click', function() {
    let userAnswer = parseInt(answer_but[i].innerHTML, 10);
    let correctAnswer = parseInt(current_question.correct, 10);
    if (userAnswer === correctAnswer) {
        correct++;
            anime({
                targets: answer_but[i],
                backgroundColor: ['#00ff4c', '#ffffff'], 
                easing: 'linear', 
                duration: 1000
            });
        } else {
            anime({
                targets: answer_but[i],
                backgroundColor: ['#ff002b', '#ffffff'], 
                easing: 'linear', 
                duration: 1000
            });
        }
        total_answers_given++;
        if (total_answers_given < 8) {
            current_question = new Question();
            current_question.display();
        } else if (total_answers_given >= 8){
            clearTimeout(time);
            endOfGame(); 
        }
        // console.log("User answer:", userAnswer); 
        // console.log("Current question correct answer:", current_question.correct);
    });
}