const interface = {
    chooseRandomBtn: document.querySelector('#choose-random'),
    playProgressionBtn: document.querySelector('#play-progression'),
    choices: document.querySelectorAll('.choice'),
    checkGuessBtn: document.querySelector('#check-guess')
}

const data = {
    audioFiles: ['audio/ofI.mp3', 'audio/ofii.mp3', 'audio/ofiii.mp3', 'audio/ofIV.mp3', 'audio/ofV.mp3', 'audio/ofvi.mp3'],
    answer: null,
    guess: null,
    feedback: null
}

const controls = {
    pickRandomAudio: function() {
        data.answer = data.audioFiles[Math.floor(Math.random() * data.audioFiles.length)];
    },
    submitGuess: function(evt) {
        data.guess = null;
        data.guess = `audio/${evt.target.dataset.harm}.mp3`;
    },
    checkGuess: function() {
        data.guess === data.answer ? data.feedback = 'Correct' : data.feedback = 'Wrong';
    }
}

interface.chooseRandomBtn.addEventListener('click', controls.pickRandomAudio);
interface.choices.forEach(choice => {
    choice.addEventListener('click', controls.submitGuess);
});
interface.checkGuessBtn.addEventListener('click', controls.checkGuess);

function testAll() {
    console.log(`The answer is ${data.answer}`);
    console.log(`Your guess is ${data.guess}`);
    console.log(`You are ${data.feedback}`);
}