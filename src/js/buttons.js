import { StopWatch } from './stopwatch.js';
import { show, randomize, updateMissionState, missionState } from './display.js';
import { setLanguage } from './language.js';
let startBtnState = true;
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const randomBtn = document.getElementById('random-btn');
const clearBtn = document.getElementById('clear-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const timerSelect = document.getElementById('timer-menu');
const timerTitle = document.getElementById('timer-title');
const timerInputForm = document.getElementById('timer-input');
const inputFields = document.querySelectorAll('#hours, #minutes, #seconds');
const timer = document.getElementById("stop-watch");
const timerBtn = document.getElementById("timer-btn");
const languageSelect = document.getElementById('language-select');
const challengeSelect = document.getElementById('challenges');
let stopwatch = new StopWatch();
export let clearFlags = JSON.parse(sessionStorage.getItem("flags")) || [1, 1, 1];


document.addEventListener('DOMContentLoaded', () => {
    init();
})

function init() {
    let language = sessionStorage.getItem('lang') || 'fr';
    console.log(language)
    setLanguage(language);
    bindEvents();
    show();
}

function bindEvents() {

    startBtn.addEventListener('click', () => {
        startBtnState ? stopwatch.start() : stopwatch.stop();
        switchBtnState();
    });

    resetBtn.addEventListener('click', () => {
        stopwatch.reset();
        if (!startBtnState) switchBtnState();
    });

    randomBtn.addEventListener('click', () => randomize())

    clearBtn.addEventListener('click', () => clear())

    clearAllBtn.addEventListener('click', () => clearAll());
    
    timer.addEventListener('click', () => timer.classList.toggle("fullscreen"));

    languageSelect.addEventListener("change", (e) => setLanguage(e.target.value));

    challengeSelect.addEventListener("change", updateMissionState);

    timerSelect.addEventListener('change', () => switchTimerDisplay())

    timerBtn.addEventListener('click', () => inputToSeconds())

}

function switchBtnState() {
    let lang = sessionStorage.getItem('lang');

    let startText = (lang === 'fr') ? "DÉMARER" : "START";
    let stopText = (lang === 'fr') ? "ARRÊTER" : "STOP";

    if (startBtnState) {
        startBtn.innerHTML = `${stopText}&nbsp;<i class="fas fa-stop"></i>`;
        startBtn.setAttribute('data-translate', 'stop')
        startBtnState = false;
        startBtn.classList.remove("start-state");
        startBtn.classList.add("stop-state");
    } else {
        startBtn.innerHTML = `${startText}&nbsp;<i class="fas fa-play"></i>`;
        startBtn.setAttribute('data-translate', 'start')
        startBtnState = true;
        startBtn.classList.remove("stop-state");
        startBtn.classList.add("start-state");
    }
}

function clear() {
    clearFlags[missionState] = 1;
    sessionStorage.setItem("flags", JSON.stringify(clearFlags));
    show();
}

function clearAll() {
    clearFlags = [1, 1, 1];
    sessionStorage.setItem("flags", JSON.stringify(clearFlags));
    show();
}

function inputToSeconds() {
    let seconds = 0;
    seconds += parseInt(inputFields[0].value * 3600) || 0;
    seconds += parseInt(inputFields[1].value * 60) || 0;
    seconds += parseInt(inputFields[2].value) || 0;

    if (seconds > 0) {
        stopwatch.startCountdown(seconds);
        inputFields.forEach(inputField => {
            inputField.value = '';
        })
        if (startBtnState) switchBtnState();
    } else {
        alert('Please enter a valid time greater than 0.');
    }
}

function switchTimerDisplay() {
    if (timerSelect.value === 'cooldown') {
        timerTitle.classList.remove('hidden');
        timerInputForm.classList.remove('hidden');
    } else {
        timerTitle.classList.add('hidden');
        timerInputForm.classList.add('hidden');
    }
}

