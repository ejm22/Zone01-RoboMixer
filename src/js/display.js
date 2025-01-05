import { missionStates, polinatorPositions, gemstonesPositions, colors } from "./utils/constants.js";
import { clearFlags } from "./buttons.js";

export let missionState = missionStates.POLINATOR_ELEMENTARY; 

const randoCtn = document.getElementById("random-container")
let polinatorElemRandom = JSON.parse(sessionStorage.getItem(missionStates.POLINATOR_ELEMENTARY))
|| [colors.RED, colors.RED, colors.RED, colors.RED, colors.GREEN, colors.GREEN];

let polinatorJuniorRandom = JSON.parse(sessionStorage.getItem(missionStates.POLINATOR_JUNIOR))
|| [colors.BLUE, colors.BLUE, colors.RED, colors.RED, colors.GREEN, colors.GREEN];

let gemstonesRandom = JSON.parse(sessionStorage.getItem(missionStates.GEMSTONES)) 
|| [colors.BLACK, colors.BLACK, colors.BLACK, colors.BLACK, colors.NONE, colors.NONE];

export function show() {
    clear();
    switch (missionState) {
        case missionStates.POLINATOR_JUNIOR:
        case missionStates.POLINATOR_ELEMENTARY:
            changeImage("img/zone01-mat-h-2.jpg")
            if (clearFlags[missionState]) return;
            polinatorShow();
            break;
        case missionStates.GEMSTONES:
            changeImage("img/tapis-zone01-j-2.jpg")
            if (clearFlags[missionState]) return;
            gemstonesShow();
            break;
        default:
            break;
    }   

}

function shuffle(array) {
    const size = array.length;
    for (let j = 0; j < size - 1; j++) {
      const index = Math.floor(Math.random() * (size - j)) + j;
      [array[j], array[index]] = [array[index], array[j]]; 
    }
}

function addCircle(top, left, color) {
    let circleColor;
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = "5%";
    circle.style.aspectRatio = "1 / 1";
    circle.style.borderRadius = "50%";
    circle.style.margin = "1%";
    circle.style.top = `${top}%`;
    circle.style.left = `${left}%`;

    switch (color) {
        case colors.RED:
            circleColor = "rgba(255, 0, 0, 0.5)";
            break;
        case colors.GREEN:
            circleColor = "rgba(38, 255, 0, 0.5)";
            break;
        case colors.BLUE:
            circleColor = "rgba(0, 42, 255, 0.5)";
            break;
        case colors.BLACK:
            circleColor = "rgba(0, 0, 0, 0.8)";
            break;
        case colors.NONE:
            circleColor = "rgba(0, 0, 0, 0)"; 
            break;
        default:
            circleColor = "rgba(0, 0, 0, 0.5)"; 
            break;
    }
    circle.style.backgroundColor = circleColor;

    randoCtn.appendChild(circle);
}

function polinatorShow() {
    for (let i = 0; i < 6; i++) {
        if (missionState === missionStates.POLINATOR_ELEMENTARY) {
            addCircle(polinatorPositions[i][0], polinatorPositions[i][1], polinatorElemRandom[i]);
        } else {
            addCircle(polinatorPositions[i][0], polinatorPositions[i][1], polinatorJuniorRandom[i]);
        }
    }
}

function gemstonesShow() {
    for (let i = 0; i < 6; i++) {
        addCircle(gemstonesPositions[i][0], gemstonesPositions[i][1], gemstonesRandom[i]);
    }
}

export function randomize() {
    clearFlags[missionState] = 0;
    sessionStorage.setItem("flags", JSON.stringify(clearFlags));

    switch (missionState) {
        case missionStates.POLINATOR_ELEMENTARY:
            shuffle(polinatorElemRandom);
            sessionStorage.setItem(missionStates.POLINATOR_ELEMENTARY, JSON.stringify(polinatorElemRandom));
            break;

        case missionStates.POLINATOR_JUNIOR:
            shuffle(polinatorJuniorRandom);
            sessionStorage.setItem(missionStates.POLINATOR_JUNIOR, JSON.stringify(polinatorJuniorRandom));
            break;

        case missionStates.GEMSTONES:
            shuffle(gemstonesRandom);
            sessionStorage.setItem(missionStates.GEMSTONES, JSON.stringify(gemstonesRandom));
            break;

        default:
            break;
    }   
    show();
}

export function updateMissionState() {
    const selectedValue = document.getElementById("challenges").value;
    missionState = missionStates[selectedValue];
    console.log(missionState)
    show();
}

function clear() {
    const randomContainer = document.getElementById("random-container");
    randomContainer.innerHTML = "";
}

function changeImage(newSrc) {
    const matImage = document.getElementById('mat');
    matImage.src = newSrc;
}