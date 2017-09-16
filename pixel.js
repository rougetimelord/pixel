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
var c, ctx, bounds = { get x() { console.group("Bounds"); delete this.x; console.log("X gotten and cached."); return this.x = window.innerWidth }, get y() { delete this.y; console.log("Y gotten and cached."); console.groupEnd("Bounds"); console.groupEnd("Init"); return this.y = window.innerHeight } }, randoms = {
    get point() { return { x: Math.floor(Math.random() * bounds.x), y: Math.floor(Math.random() * bounds.y) } }, get color() {
        var a = Math.floor(16777215 * Math.random()).toString(16).toUpperCase(); a = 6 > a.length ? "0".repeat(6 - a.length) + a : a;
        return "#" + a
    }, get letter() { alphabet = "abcdefghijklmnopqrstuvwxyz!$#*()#^`~".split(""); return 1 == Math.floor(5 * Math.random()) + 1 ? alphabet[Math.floor(Math.random() * (alphabet.length - 1))].toUpperCase() : alphabet[Math.floor(Math.random() * (alphabet.length - 1))] }, get size() { return Math.floor(2 * Math.random() + 1) }, get font() {
        fonts = 'Georgia, serif;"Palatino Linotype", "Book Antiqua", Palatino, serif;"Times New Roman", Times, serif;Arial, Helvetica, sans-serif;"Courier New", Courier, monospace;"Lucida Console", Monaco, monospace'.split(";");
        return fonts[Math.floor(Math.random() * (fonts.length - 1))]
    }
}, createPixel = function () { var a = randoms.point, b = randoms.size; ctx.fillStyle = randoms.color; ctx.fillRect(a.x, a.y, b, b) }, mkLetter = function () { var a = randoms.point, b = randoms.color; ctx.font = Math.floor(7.5 * randoms.size) + "px " + randoms.font; ctx.fillStyle = b; ctx.fillText(randoms.letter, a.x, a.y) };
document.addEventListener("DOMContentLoaded", function () { c = document.getElementById("canv"); ctx = c.getContext("2d"); c.width = bounds.x; c.height = bounds.y; setInterval(function () { createPixel() }, 25); setInterval(mkLetter, 1E3) });