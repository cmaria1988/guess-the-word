const guessedLetters = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLettersArray = [];

const placeholder = function(word){
    const placeholderLetters = [];
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
    console.log(guessedLettersArray);
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
    console.log("masuk sini");
    letters = letters.toUpperCase();
    if (!guessedLettersArray.includes(letters)){
        guessedLettersArray.push(letters);
        return letters;
    }else{
        message.innerText = "You already guessed that letter. Please try again!";
    }
}