    var storage = 0,
    perClk = 1,
    perSecF = 0,
    upg1C = 25,
    upg2C = 150,
    upg3C = 750,
    upg4C = 375,
    upg5C = 1000;
function init() {
    window.setInterval(upd, 45);
    window.setInterval(perSec, 1000);
}
function perSec() {
    storage += perSecF;
}
function upd() {
    document.getElementById("disp1").innerHTML = "Bytes in Storage: " + storage;
    document.getElementById("disp2").innerHTML = "Bytes per Click: " + perClk;
    document.getElementById("disp3").innerHTML = "Bytes per Second: " + perSecF;
    document.getElementById("upg1").innerHTML = "Plus 1 Byte per Click: " + upg1C;
    document.getElementById("upg2").innerHTML = "Plus 5 Bytes per Click: " + upg2C;
    document.getElementById("upg3").innerHTML = "Plus 25 Bytes per Click: " + upg3C;
    document.getElementById("upg4").innerHTML = "Plus 1 Byte per Second: " + upg4C;
    document.getElementById("upg5").innerHTML = "Plus 5 Bytes per Second: " + upg5C;
}
function clkFloppy() {
    storage += perClk;
}
function upg1() {
if(storage >= upg1C) {
    storage -= upg1C;
    upg1C += 15;
    perClk += 1;
}}
function upg2() {
if(storage >= upg2C) {
    storage -= upg2C;
    upg2C += 75;
    perClk += 5;
}}
function upg3() {
if(storage >= upg3C) {
    storage -= upg3C;
    upg3C += 250;
    perClk += 25;
}}
function upg4() {
if(storage >= upg4C) {
    storage -= upg4C;
    upg4C += 125;
    perSecF += 1;
}}
function upg5() {
if(storage >= upg5C) {
    storage -= upg5C;
    upg5C += 350;
    perSecF += 5;
}}
window.onbeforeunload = function (e) {
    e = e || window.event;
if (e) {
    e.returnValue = 'Sure?';
}
    return 'Sure?';
}
