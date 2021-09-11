const interface = {
    chooseRandomBtn: document.querySelector('#choose-random'),
    playProgressionBtn: document.querySelector('#play-progression'),
    choices: document.querySelectorAll('.choice'),
    checkGuessBtn: document.querySelector('#check-guess'),
    feedbackElem: document.querySelector('#feedback')
}

const computer = {
    answer: null,
    audioFiles: ['audio/ofI.mp3', 'audio/ofii.mp3', 'audio/ofiii.mp3', 'audio/ofIV.mp3', 'audio/ofV.mp3', 'audio/ofvi.mp3'],
    randomIndex: function() {
        return Math.floor(Math.random() * computer.audioFiles.length);
    },
    pickRandomAudio: function() {
        return this.audioFiles[this.randomIndex()];
    },
    setAnswer: function() {
        computer.answer = computer.pickRandomAudio();
    }
}

const user = {
    guess: null,
    submitGuess: function(evt) {
        user.guess = `audio/${evt.target.dataset.harm}.mp3`;
    },
    checkGuess: function() {
        user.guess === computer.answer ? interface.feedback = 'Correct' : interface.feedback = 'Wrong';
    }
}

interface.chooseRandomBtn.addEventListener('click', computer.setAnswer);
interface.choices.forEach(choice => choice.addEventListener('click', user.submitGuess));
interface.checkGuessBtn.addEventListener('click', user.checkGuess);

function test() {
    console.log(`Answer is ${computer.answer}`);
    console.log(`Guess is ${user.guess}`);
    console.log(`The guess is ${interface.feedback}`);
}