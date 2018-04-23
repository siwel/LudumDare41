import Game from './Game';
require('./styles/styles.css');

const startBtn = window.document.getElementById("start-btn");
const introContainer = window.document.getElementById("intro");
const game = new Game();
startBtn.disabled = true;

game.init(function () {
    const startBtn = window.document.getElementById("start-btn");
    startBtn.disabled = false;
    startBtn.innerHTML = "Play"
});

startBtn.onclick = function(){

	introContainer.remove();
	game.start();

};

