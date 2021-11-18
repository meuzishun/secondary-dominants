const audioCtx = new AudioContext();
const playRandomBtn = document.querySelector('.random-chord-btn');
const replayBtn = document.querySelector('.replay-btn');
const optionBoxes = [...document.querySelectorAll('.chord-option')];
const keyDropdown = document.querySelector('#key');
const chordBtns = [...document.querySelectorAll('.answer-buttons button')];
let currentAudio;
let currentAnswer;
const feedbackText = document.querySelector('.feedback');
const modeShowBtn = document.querySelector('#mode');

function loadChoices() {
    const choices = optionBoxes.filter(box => box.checked);
    if (choices.length === 0) {
        alert(`Please select at least one option`);
        return;
    }
    return choices;
}

function pickRandomChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function processRandomChoice(choice) {
    let id = choice.id;
    let splitInfo = id.split('-');
    return splitInfo;
}

function getResolvedStatus() {
    const resolvedBox = document.querySelector('#resolved');
    return resolvedBox.checked;
}

function capitalize(text) {
    const arr = text.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

function randomKey() {
    const keys = ['A', 'Ab', 'B', 'Bb', 'C', 'Db', 'D', 'E', 'Eb', 'F', 'Gb', 'G'];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

function findAudioFile(info, resolved) {
    const [mode, chord] = info;
    if (modeShowBtn.checked) {
        feedback(capitalize(mode));
        let displayTimer = setTimeout(() => {
            let para = feedbackText.firstChild;
            feedbackText.removeChild(para);
            clearTimeout(displayTimer);
        }, 1000);
    }
    const chordInfoSplit = chord.split('/');
    const tonic = chordInfoSplit[1];
    const key = keyDropdown.value;

    const filePath = `audio/${resolved ? 'resolved' : 'alone'}/${mode}/${tonic}_${key === 'random' ? randomKey() : key}.mp3`;
    //TODO Something about naming the audio files with '#' at the end?  For now changed to all flats for accidentals
    return filePath;
}

async function getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

async function setupSample(filePath) {
    const sample = await getFile(audioCtx, filePath);
    return sample;
}

function playSample(sample) {
    const sampleSource = audioCtx.createBufferSource();
    sampleSource.buffer = sample;
    sampleSource.connect(audioCtx.destination)
    sampleSource.start();
}

function playRandomAudio() {
    const choices = loadChoices();
    const choice = pickRandomChoice(choices);
    const info = processRandomChoice(choice);
    currentAnswer = info.join('-');
    // console.log(currentAnswer);
    const resolved = getResolvedStatus();
    // const audioFile = findAudioFile(info, resolved);
    currentAudio = findAudioFile(info, resolved);
    console.log(currentAudio);
    setupSample(currentAudio).then((sample) => {
        playSample(sample);
    });
}

function replayAudio() {
    setupSample(currentAudio).then((sample) => {
        playSample(sample);
    });
}

function formatButtonInfo(btn, parent) {
    const btnInfo = btn.classList[0];
    const formatted1 = btnInfo.replace('of', '/');

    const parentClassList = parent.classList[0];
    const array = parentClassList.split('-');
    const mode = array[0];

    return `${mode}-V7${formatted1}`;
}

function feedback(msg) {
    const para = document.createElement('p');
    para.classList.add('feedback');
    para.textContent = msg;
    feedbackText.appendChild(para);
}

function processGuess(evt) {
    const btn = evt.currentTarget;
    const parent = btn.parentElement;
    const formatted = formatButtonInfo(btn, parent);
    const msg = (formatted === currentAnswer) ? `Correct!` : `Nope... try again.`;
    feedback(msg);
    let displayTimer = setTimeout(() => {
        let para = feedbackText.firstChild;
        feedbackText.removeChild(para);
        clearTimeout(displayTimer);
    }, 2000);
}

playRandomBtn.addEventListener('click', playRandomAudio);
replayBtn.addEventListener('click', replayAudio);

chordBtns.forEach(btn => btn.addEventListener('click', processGuess));

