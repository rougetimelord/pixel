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
        alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '$', '#', '*', '(', ')', '#', '^','`','~',]
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
var bounds = {
    get x(){
        delete this.x;
        console.log('X gotten and cached.')
        return this.x = window.innerWidth;
    },
    get y(){
        delete this.y;
        console.log('Y gotten and cached.')
        return this.y = window.innerHeight;
    }
}
var createPixel = function(){
    var coord = randoms.point;
    var coordId = coord.x + ',' + coord.y;
    if(document.getElementById(coordId) === null)
    {
        var pix = document.createElement('div');
        pix.id = coordId;
        pix.className = 'pixel';
        pix.style.position = 'absolute';
        pix.style.left = coord.x + 'px';
        pix.style.top = coord.y + 'px';
        var size = randoms.size;
        pix.style.width = size;
        pix.style.height = size;
        pix.style.backgroundColor = randoms.color;
        document.body.appendChild(pix);
        //console.log('Point generated at %O', coordId);
    }
    else
    {
        document.getElementById(coordId).style.backgroundColor = randoms.color;
        //console.log('Point overwritten at %O', coordId);
    }
    return;
}
var Letter = function () {
    this.point = randoms.point;
    this.coordId = 'l,' + this.point.x + ',' + this.point.y;
    if (document.getElementById(this.coordId) !== null)
        throw "I don't wanna deal with overwriting right now";
    this.letterVal = randoms.letter;
    this.letP = document.createElement('p');
    this.letP.id = this.coordId;
    this.letP.className = 'letter';
    this.letP.innerText = this.letterVal;
    this.letP.style.position = 'absolute';
    this.letP.style.left = this.point.x + 'px';
    this.letP.style.top = this.point.y + 'px';
    this.letP.style.color = randoms.color;
    this.letP.style.fontFamily = randoms.font;
    document.body.appendChild(this.letP);
    this.update = function () {
        this.letterVal = randoms.letter;
        var p = document.getElementById(this.coordId);
        p.innerHTML = this.letterVal;
        p.style.color = randoms.color;
        //console.log('Updated ', this.coordId, ' with value ', this.letterVal);
    };
    this.interval = setInterval(this.update.bind(this), 50);
    this.delete = function () {
        clearInterval(this.interval);
        //console.log('Killed ', this.coordId, ' with value ', this.letterVal);
        var p = document.getElementById(this.coordId);
        setTimeout(function () { $(p).fadeOut(2000, 'linear', function () { p.parentNode.removeChild(p); delete this;}) }, randoms.wait);
    };
    setTimeout(this.delete.bind(this), randoms.wait * 2);
};
document.addEventListener('DOMContentLoaded', function () {
    console.log('Pixel By Rouge //fuk ur performace//');
    setInterval(function () { createPixel() }, 25);
    setTimeout(null, 1000);
    var letters = [];
    setInterval(function () { letters.push(new Letter());}, 1000);
});
