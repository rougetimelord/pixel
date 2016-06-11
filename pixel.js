var randoms = {
    get point() {
        console.log('New point gotten')
        return {
            x: Math.floor(Math.random() * bounds.x + 1), 
            y: Math.floor(Math.random() * bounds.y + 1)
        };
    },
    get color() {
        console.log('New color gotten')
        var tempInt = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
        tempInt = (tempInt.length < 6) ? "0".repeat(6 - tempInt.length) + tempInt : tempInt;
        return '#' + tempInt;
    }
}
var bounds = {
    get x(){
        delete this.x;
        console.log('X gotten and cached.')
        return this.x = window.innerWidth - 10;
    },
    get y(){
        delete this.y;
        console.log('Y gotten and cached.')
        return this.y = window.innerHeight - 10;
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
        pix.style.width = '1px';
        pix.style.height = '1px';
        pix.style.backgroundColor = randoms.color;
        document.body.appendChild(pix);
        console.log('Point generated at %O', coordId);
    }
    else
    {
        document.getElementById(coordId).style.backgroundColor = randoms.color;
        console.log('Point overwritten at %O', coordId);
    }
    return;
}
document.addEventListener('DOMContentLoaded', function () {
    setInterval(function () { create() }, 25);
});