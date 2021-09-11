let game = {
    chooseRandomBtn: document.querySelector('#choose-random'),
    playProgressionBtn: document.querySelector('#play-progression'),
    answerBtns: document.querySelectorAll('.choice'),

    answer: null,
    audioFiles: ['audio/ofI.mp3', 'audio/ofii.mp3', 'audio/ofiii.mp3', 'audio/ofIV.mp3', 'audio/ofV.mp3', 'audio/ofvi.mp3'],
   
    randomIndex: function() {
        return Math.floor(Math.random() * this.audioFiles.length);
    },
    chooseRandom: function() {
        game.answer = game.audioFiles[game.randomIndex()];
        console.log(game.answer);
    },
    answerAudio: new Audio(),
    playAnswer: function() {
        game.answerAudio.src = game.answer;
        game.answerAudio.play();
    },

    guess: null,
    clickedElement: null,
    
    getID: function() {
        return game.clickedElement.id;
    },
    storeUserGuess: function() {
        game.guess = `audio/${game.getID()}.mp3`;
    },
    guessAudio: new Audio(),
    playGuess: function() {
        game.guessAudio.src = game.guess;
        game.guessAudio.play();
    },

    checkGuess: function() {
        game.guess === game.answer ? console.log('correct') : console.log('wrong');
    }
}

game.chooseRandomBtn.addEventListener('click', game.chooseRandom);
game.playProgressionBtn.addEventListener('click', game.playAnswer);