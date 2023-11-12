const guessedLetters = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "MAGNOLIA";
const guessedLettersArray = [];
const placeholderLetters = [];

const placeholder = function(word){ 
    for(const letter in word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterInput.value;
    if(validateInput(guess) != null){
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function(letter){
    const acceptedLetter = /[a-zA-Z]/;
    if(letter.length===0){
        message.innerText = "Please enter a letter";
    } else if(letter.length>1){
        message.innerText = "Please enter a single letter";
    }else if (!letter.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z";
    }else{
        return letter;
    };
}


const makeGuess = function(letters){
    letters = letters.toUpperCase();
    if (!guessedLettersArray.includes(letters)){
        guessedLettersArray.push(letters);
        updatePage();
        wordProgress();
        checkWin();
    }else{
        message.innerText = "You already guessed that letter. Please try again!";
    }
}

const updatePage = function(){
    guessedLetters.innerHTML = "";
    for(let guessletter of guessedLettersArray){
        let li = document.createElement("li");
        li.innerHTML = guessletter;
        guessedLetters.append(li);
    }
}

const wordProgress = function(){
    const wordArray = word.split("");
    console.log(wordArray);
    console.log(guessedLettersArray);
    for(var gl of guessedLettersArray){
        wordArray.forEach(function(l, index){
            if (gl === l){
                console.log(index);
                placeholderLetters[index] = gl;
                wordInProgress.innerText = placeholderLetters.join("");
            }
        })
    }
}

const checkWin = function(){
    if(!placeholderLetters.includes("●")){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
}
