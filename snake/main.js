let canvas, ctx;

let ready = true;

let gameState = "start";

let tails = [];
let keys = [];

let head = {};
let apple = {};

function testCollision(obj) {
    return head.x < obj.x + 25 &&
       head.x + 25 > obj.x &&
       head.y < obj.y + 25 &&
       25 + head.y > obj.y;
}

function start() {
    gameState = "playing";

    ready = true;

    head = { x: 375, y: 250, dir: "d", };

    apple = { x: Math.floor(Math.random() * 30) * 25, y: Math.floor(Math.random() * 20) * 25,};

    tails = [{ x: head.x-25, y: head.y, par: undefined, dir: "d",},
    { x: head.x-50, y: head.y, par: undefined, dir: "d",},
    { x: head.x-50, y: head.y-25, par: undefined, dir: "s",},
    { x: head.x-50, y: head.y-50, par: undefined, dir: "s",},];

    tails[0].par = head;
    tails[1].par = tails[0];
    tails[2].par = tails[1];
    tails[3].par = tails[2];
}

document.onkeydown = function(e) {
    keys.push(e.key);
    if ((keys.includes("w") || keys.includes("W") || keys.includes("Up") || keys.includes("ArrowUp")) && (head.dir == "a" || head.dir == "d") && ready) {
        head.dir = "w";
        ready = false;
    } else if ((keys.includes("a") || keys.includes("A") || keys.includes("Left") || keys.includes("ArrowLeft")) && (head.dir == "w" || head.dir == "s") && ready) {
        head.dir = "a";
        ready = false;
    } else if ((keys.includes("s") || keys.includes("S") || keys.includes("Down") || keys.includes("ArrowDown")) && (head.dir == "a" || head.dir == "d") && ready) {
        head.dir = "s";
        ready = false;
    } else if ((keys.includes("d") || keys.includes("D") || keys.includes("Right") || keys.includes("ArrowRight")) && (head.dir == "w" || head.dir == "s") && ready) {
        head.dir = "d";
        ready = false;
    }
    if (gameState == "dead") start();
};

document.onkeyup = function(e) {
    while (keys.includes(e.key)) keys.splice(keys.indexOf(e.key), 1);
    while (keys.includes(e.key.toLowerCase())) keys.splice(keys.indexOf(e.key.toLowerCase()), 1);
    while (keys.includes(e.key.toUpperCase())) keys.splice(keys.indexOf(e.key.toUpperCase()), 1);
};

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'black';

    canvas.onmousedown = function() {
        if (gameState == "start" || gameState == "dead") start();
    };
    window.setInterval(function() {

        if (gameState == "playing") {
            if (head.dir == "w") {
                head.y -= 25;
                ready = true;
            } else if (head.dir == "a") {
                head.x -= 25;
                ready = true;
            } else if (head.dir == "s") {
                head.y += 25;
                ready = true;
            } else if (head.dir == "d") {
                head.x += 25;
                ready = true;
            }

            tails.forEach(function(elem) {
                if (elem.dir == "w") {
                    elem.y -= 25;
                } if (elem.dir == "a") {
                    elem.x -= 25;
                } if (elem.dir == "s") {
                    elem.y += 25;
                } if (elem.dir == "d") {
                    elem.x += 25;
                }
            });

            if (testCollision(apple)) {

                apple.x = Math.floor(Math.random() * 30) * 25;
                apple.y = Math.floor(Math.random() * 20) * 25;

                var parent = tails[tails.length-1];

                if (parent.dir == "w") {
                    tx = parent.x;
                    ty = parent.y + 25;
                } else if (parent.dir == "a") {
                    tx = parent.x + 25;
                    ty = parent.y;
                } else if (parent.dir == "s") {
                    tx = parent.x;
                    ty = parent.y - 25;
                } else if (parent.dir == "d") {
                    tx = parent.x - 25;
                    ty = parent.y;
                }

                tails.push({x: tx, y: ty, par: parent, dir: parent.dir});
            }

            for (var i = tails.length-1; i > 0; i--) tails[i].dir = tails[i].par.dir;
            tails[0].dir = head.dir;

            if (head.x < 0 || head.y < 0 || head.x + 25 > canvas.width || head.y + 25 > canvas.height) gameState = "dead";

            for (i = 0; i < tails.length; i++) {

                if (testCollision(tails[i])) {
                    gameState = "dead";
                    break;
                }
            }
        }
    }, 100);
    render();
};

function render() {
    window.requestAnimationFrame(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.font = '32px Verdana';
        ctx.fillText(String(tails.length-4), 15, 40);

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, 25, 25);

        ctx.fillStyle = 'green';
        ctx.fillRect(head.x, head.y, 25, 25);
        ctx.strokeRect(head.x, head.y, 25, 25);

        ctx.fillStyle = 'rgb(0, 255, 0)';
        tails.forEach(function(elem) {
            ctx.fillRect(elem.x, elem.y, 25, 25);
            ctx.strokeRect(elem.x, elem.y, 25, 25);
        });

        ctx.fillStyle = 'black';
        if (gameState == "dead") ctx.fillText("You Lost!", canvas.width / 2 - 75, canvas.height / 2);
        if (gameState == "start") ctx.fillText("Click to start!", canvas.width / 2 - 75, canvas.height / 2);
        render();
    });
}
