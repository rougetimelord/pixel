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
var c, ctx;
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
        return Math.floor(Math.random() * 2 + 1);
    },
    get font() {
        fonts = ['Georgia, serif', '"Palatino Linotype", "Book Antiqua", Palatino, serif', '"Times New Roman", Times, serif', 'Arial, Helvetica, sans-serif', '"Courier New", Courier, monospace', '"Lucida Console", Monaco, monospace'];
        return fonts[Math.floor(Math.random() * (fonts.length - 1))];
    }
}
var createPixel = function(){
    var coord = randoms.point;
    var s = randoms.size;
    ctx.fillStyle = randoms.color;
    ctx.fillRect(coord.x, coord.y, s, s);
}
var mkLetter = function () {
    var p = randoms.point;
    var font = Math.floor(randoms.size * 7.5) + 'px ' + randoms.font;
    var color = randoms.color;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(randoms.letter, p.x, p.y);
}
document.addEventListener('DOMContentLoaded', function () {
    c = document.getElementById('canv');
    ctx = c.getContext('2d');
    c.width = bounds.x;
    c.height = bounds.y;
    setInterval(function () { createPixel() }, 25);
    setInterval(mkLetter, 1000);
});
