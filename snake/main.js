var canvas, ctx;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var toRender = [];

var lost = false,
menu = true;

var head = {
    x: 240,
    y: 360,
    dir: "d",
};

var apple = {
    x: Math.random() * 400 + 25,
    y: Math.random() * 300 + 25,
};

var tails = [{
        x: head.x-30,
        y: head.y,
        par: undefined,
        dir: "d",
    },{
        x: head.x-60,
        y: head.y,
        par: undefined,
        dir: "d",
    },{
        x: head.x-60,
        y: head.y-30,
        par: undefined,
        dir: "s",
    },{
        x: head.x-60,
        y: head.y-60,
        par: undefined,
        dir: "s",
    },];

tails[0].par = head;
tails[1].par = tails[0];
tails[2].par = tails[1];
tails[3].par = tails[2];

function testCollision(obj, w) {
    return head.x < obj.x + w &&
       head.x + 25 > obj.x &&
       head.y < obj.y + w &&
       25 + head.y > obj.y;
}

function restart() {
    toRender = [];
    lost = false;
    menu = false;
    head = { x: 240, y: 360, dir: "d",};
    apple = { x: Math.random() * 400 + 25, y: Math.random() * 300 + 25,};
    tails = [{ x: head.x-30, y: head.y, par: undefined, dir: "d",},
    { x: head.x-60, y: head.y, par: undefined, dir: "d",},
    { x: head.x-60, y: head.y-30, par: undefined, dir: "s",},
    { x: head.x-60, y: head.y-60, par: undefined, dir: "s",},];
    tails[0].par = head;
    tails[1].par = tails[0];
    tails[2].par = tails[1];
    tails[3].par = tails[2];
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'black';
    window.setInterval(function() {
        if (!lost && !menu) {
            if (head.dir == "w") {
                head.y -= 30;
            } if (head.dir == "a") {
                head.x -= 30;
            } if (head.dir == "s") {
                head.y += 30;
            } if (head.dir == "d") {
                head.x += 30;
            }
            tails.forEach(function(elem) {
                if (elem.dir == "w") {
                    elem.y -= 30;
                } if (elem.dir == "a") {
                    elem.x -= 30;
                } if (elem.dir == "s") {
                    elem.y += 30;
                } if (elem.dir == "d") {
                    elem.x += 30;
                }
            });
            if (testCollision(apple, 25)) {
                apple.x = Math.floor(Math.random() * 15) * 30 + 25;
                apple.y = Math.floor(Math.random() * 11) * 30 + 25;
                var parent = tails[tails.length-1];
                if (parent.dir == "w") {
                    tx = parent.x;
                    ty = parent.y + 30;
                } if (parent.dir == "a") {
                    tx = parent.x + 30;
                    ty = parent.y;
                } if (parent.dir == "s") {
                    tx = parent.x;
                    ty = parent.y - 30;
                } if (parent.dir == "d") {
                    tx = parent.x - 30;
                    ty = parent.y;
                }
                tails.push({x: tx, y: ty, par: parent, dir: parent.dir});
            }
            for (var i = tails.length-1; i > 0; i--) {
                tails[i].dir = tails[i].par.dir;
            }
            tails[0].dir = head.dir;
            if (head.x <= 0) lost = true;
            if (head.y <= 0) lost = true;
            if (head.x+25 >= canvas.width) lost = true;
            if (head.y+25 >= canvas.height) lost = true;
            for (i = 0; i < tails.length; i++) {
                if (testCollision(tails[i], 25)) {
                    lost = true;
                    break;
                }
            }
        }
    window.requestAnimationFrame(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '32px Verdana';
        ctx.fillText(String(tails.length-4), 15, 40);
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, 20, 20);
        ctx.fillStyle = 'green';
        ctx.fillRect(head.x, head.y, 25, 25);
        ctx.strokeRect(head.x, head.y, 25, 25);
        ctx.fillStyle = 'rgb(0, 255, 0)';
        tails.forEach(function(elem) {
            ctx.fillRect(elem.x, elem.y, 25, 25);
            ctx.strokeRect(elem.x, elem.y, 25, 25);
        });
        ctx.fillStyle = 'black';
        if (lost) ctx.fillText("You Lost!", canvas.width/2-75, canvas.height/2);
        if (menu) ctx.fillText("Click to start!", canvas.width/2-75, canvas.height/2);
    });
    }, 200);
}
