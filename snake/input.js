let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

document.onkeydown = function(e) {
    if (e.defaultPrevented) return;
    switch(e.key) {
        case "w":
        case "Up":
        case "ArrowUp":
        if (head.dir == "a" || head.dir == "d") head.dir = "w";
        if (lost) restart();
        break;
        case "a":
        case "Left":
        case "ArrowLeft":
        if (head.dir == "w" || head.dir == "s") head.dir = "a";
        if (lost) restart();
        break;
        case "s":
        case "Down":
        case "ArrowDown":
        if (head.dir == "a" || head.dir == "d") head.dir = "s";
        if (lost) restart();
        break;
        case "d":
        case "Right":
        case "ArrowRight":
        if (head.dir == "w" || head.dir == "s") head.dir = "d";
        if (lost) restart();
        break;
        default:
        return;
    }
    e.preventDefault();
};