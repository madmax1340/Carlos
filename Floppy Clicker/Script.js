let storage = 0;
let perClk = 1;
let perSecF = 0;
let upg1C = 25;
let upg2C = 150;
let upg3C = 750;
let upg4C = 375;
let upg5C = 1000;


const perSec = () => {
    storage += perSecF;
    updateDisplay();
}

const updateDisplay = () => {
    document.getElementById("disp1").innerText = "Bytes in Storage: " + storage;
    document.getElementById("disp2").innerText = "Bytes per Click: " + perClk;
    document.getElementById("disp3").innerText = "Bytes per Second: " + perSecF;
    document.getElementById("upg1").innerText = "Plus 1 Byte per Click: " + upg1C;
    document.getElementById("upg2").innerText = "Plus 5 Bytes per Click: " + upg2C;
    document.getElementById("upg3").innerText = "Plus 25 Bytes per Click: " + upg3C;
    document.getElementById("upg4").innerText = "Plus 1 Byte per Second: " + upg4C;
    document.getElementById("upg5").innerText = "Plus 5 Bytes per Second: " + upg5C;
}

const clkFloppy = () => {
    storage += perClk;
    updateDisplay();
}

const upg1 = () => {
    if (storage >= upg1C) {
        storage -= upg1C;
        upg1C += 15;
        perClk += 1;
    }
    updateDisplay();
}

const upg2 = () => {
    if (storage >= upg2C) {
        storage -= upg2C;
        upg2C += 75;
        perClk += 5;
    }
    updateDisplay();
}

const upg3 = () => {
    if (storage >= upg3C) {
        storage -= upg3C;
        upg3C += 250;
        perClk += 25;
    }
    updateDisplay();
}

const upg4 = () => {
    if (storage >= upg4C) {
        storage -= upg4C;
        upg4C += 125;
        perSecF += 1;
    }
    updateDisplay();
}

const upg5 = () => {
    if (storage >= upg5C) {
        storage -= upg5C;
        upg5C += 350;
        perSecF += 5;
    }
    updateDisplay();
}

window.onload = () => {
    window.setInterval(perSec, 1000);
}

window.onbeforeunload = (e) => {
    if (e)
        e.returnValue = 'Sure?';
    return 'Sure?';
}
