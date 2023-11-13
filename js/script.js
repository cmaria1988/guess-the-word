const guessedLetters = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

let word = "magnolia";
const guessedLettersArray = [];
const placeholderLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim().toUpperCase();
    placeholder(word);
};

getWord();

const placeholder = function(word){ 
    for(const letter in word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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


const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (!guessedLettersArray.includes(guess)){
        guessedLettersArray.push(guess);
        guessesRemaining(guess);
        updatePage();
        wordProgress();
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
    checkWin();
}

const guessesRemaining = function(guess){
    guess = guess.toUpperCase();
    console.log(guess);
    console.log(word);
    if(remainingGuesses >= 0){
        if(!word.includes(guess)){
            remainingGuesses --;
            message.innerText = `Sorry the word has no ${guess}`;
            if (remainingGuesses === 1){
                remainingSpan.innerText = `1 guess`;
            }else{
                remainingSpan.innerText = `${remainingGuesses} guesses`;
            }
        }else{
            message.innerText = `Good guess! The word has letter ${guess}`;
        }
        if (remainingGuesses === 0){
            message.innerText = `Game Over! The word is ${word}`;
        }    
    }
}

const checkWin = function(){
    if(!placeholderLetters.includes("●")){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
}
