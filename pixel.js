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
    get size(){
        return Math.floor(Math.random() * 2 + 1).toString() + 'px';
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
var create = function(){
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
        console.log('Point overwritten at %O', coordId);
    }
    return;
}
document.addEventListener('DOMContentLoaded', function () {
    console.log('Pixel By Rouge //fuk ur performace//');
    setInterval(function () { create() }, 25);
});
