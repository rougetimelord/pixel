    /*__/\\\\\\\\\\\\\_______________________________________/\\\\\\____
      _\/\\\/////////\\\____________________________________\////\\\____
      _\/\\\_______\/\\\__/\\\_________________________________\/\\\____
      _\/\\\\\\\\\\\\\/__\///___/\\\____/\\\_____/\\\\\\\\_____\/\\\____
      _\/\\\/////////_____/\\\_\///\\\/\\\/____/\\\/////\\\____\/\\\____
      _\/\\\_____________\/\\\___\///\\\/_____/\\\\\\\\\\\_____\/\\\____
      _\/\\\_____________\/\\\____/\\\/\\\___\//\\///////______\/\\\____
      _\/\\\_____________\/\\\__/\\\/\///\\\__\//\\\\\\\\\\__/\\\\\\\\\_
      _\///______________\///__\///____\///____\//////////__\/////////__.js
      by rouge*/
var bounds = {
    get x() {
        console.group('Bounds');
        delete this.x;
        console.log('X gotten and cached.')
        return this.x = window.innerWidth;
    },
    get y() {
        delete this.y;
        console.log('Y gotten and cached.')
        console.groupEnd('Bounds');
        console.groupEnd('Init');
        return this.y = window.innerHeight;
    }
}
var randoms = {
    get point() {
        //console.log('New point gotten')
        return {
            x: Math.floor(Math.random() * bounds.x), 
            y: Math.floor(Math.random() * bounds.y)
        };
    },
    get color() {
        //console.log('New color gotten')
        var tempInt = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
        tempInt = (tempInt.length < 6) ? "0".repeat(6 - tempInt.length) + tempInt : tempInt;
        return '#' + tempInt;
    },
    get letter() {
        alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '$', '#', '*', '(', ')', '#', '^','`','~'];
        return ((Math.floor(Math.random() * 5) + 1) == 1) ? alphabet[Math.floor(Math.random() * (alphabet.length - 1))].toUpperCase() : alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    },
    get size(){
        return Math.floor(Math.random() * 2 + 1).toString() + 'px';
    },
    get font() {
        fonts = ['Georgia, serif', '"Palatino Linotype", "Book Antiqua", Palatino, serif', '"Times New Roman", Times, serif', 'Arial, Helvetica, sans-serif', '"Courier New", Courier, monospace', '"Lucida Console", Monaco, monospace'];
        return fonts[Math.floor(Math.random() * (fonts.length - 1))];
    },
    get wait() {
        return Math.floor(Math.random() * 10 + 1) * 1000;
    }
}
var mkEl = function (t, i, c, p, co, s, tx, f, h, a, pa) {
    //console.log('mkEl called with ', t, ', ', c);
    t = t || 'p', p = p || null, co = co || "#000", f = f || 'Arial, Helvetica, sans-serif', pa = pa || document.body;
    if (!i || !c) { throw "id or class not supplied" };
    var e = document.createElement(t);
    e.id = i, e.className = c;
    if (p) { e.style.position = 'absolute', e.style.left = p.x + 'px', e.style.top = p.y + 'px'; }
    if (t == 'p') { e.style.color = co; }
    if (t == 'div') { e.style.backgroundColor = co; }
    if (s) { e.style.width = s, e.style.height = s; }
    if (tx) { e.innerText = tx; }
    if (f && tx) { e.style.fontFamily = f; }
    if (h) { e.update = h, e.update(); }
    if (a) { a.push(e);}
    pa.appendChild(e);
}
var createPixel = function(){
    var coord = randoms.point;
    var coordId = coord.x + ',' + coord.y;
    //console.groupCollapsed('Pixel');
    if(document.getElementById(coordId) === null)
    {
        mkEl('div',coordId,'pixel',coord,randoms.color,randoms.size)
        //console.groupEnd('Pixel')
    }
    else
    {
        document.getElementById(coordId).style.backgroundColor = randoms.color;
        //console.log('Point overwritten at %O', coordId);
    }
    return;
}
var mkLetter = function () {
    var point = randoms.point, coordId = 'l,' + point.x + ',' + point.y;
    if (document.getElementById(this.coordId) !== null)
        throw "I don't wanna deal with overwriting right now";
    mkEl('p', coordId, 'letter', point, randoms.color, '', randoms.letter, randoms.font, letUpdater, letterArr);
}
var letUpdater = function () {
    this.alive = true;
    this.update = function () {
        this.innerHTML = randoms.letter;
        this.style.color = randoms.color;
        //console.log('Updated ', this.coordId, ' with value ', this.letterVal);
    };
    this.interval = setInterval(this.update.bind(this), 50);
    this.delete = function () {
        clearInterval(this.interval);
        //console.log('Killed ', this.coordId, ' with value ', this.letterVal);
        delete this.update;
        delete this.alive;
        delete this;
    };
    setTimeout(this.delete.bind(this), randoms.wait * 2);
}
document.addEventListener('DOMContentLoaded', function () {
    setInterval(function () { createPixel() }, 25);
    //setInterval(mkLetter, 1000);
    lc = 0;
    var cleanArr = function(){
        for(var i = 0; i < letterArr.length; i++){
            if (!letterArr[i].alive) {
                letterArr[i].remove();
                lc++;
                letterArr.splice(i, 1);
            }
        }
    } 
    //setInterval(cleanArr, randoms.wait);
    document.addEventListener('beforeUnload', function () {
        ga("create", "UA-50648028-3", "auto", "elements", { pixels: document.getElementsByClassName(pixel).length/*, letters: letters.length + lc*/ });
        ga("elements.send")
    });
});
