import Game from './Game';
require('./styles/styles.css');

const startBtn = window.document.getElementById("start-btn");
const introContainer = window.document.getElementById("intro");

startBtn.onclick = function(){

	introContainer.remove();
	const game = new Game();
	game.init();

};

