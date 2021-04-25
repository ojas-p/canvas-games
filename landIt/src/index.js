import Stage from './stage/Stage';
import './index.css';

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

function component() {
    const element = document.createElement('div');
    element.setAttribute('id', 'game-area');

    const canvasEle = document.createElement('canvas');
    canvasEle.setAttribute('id', 'game-stage');
    canvasEle.setAttribute('width', '1024');
    canvasEle.setAttribute('height', '768');

    element.appendChild(canvasEle);

    return element;
}

document.body.appendChild(component());
resizeGame();
const stage = new Stage();

function resizeGame() {
    var gameArea = document.getElementById('game-area');
    var widthToHeight = 4 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }

    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    var gameCanvas = document.getElementById('game-stage');
    gameCanvas.style.width = '100%';
    gameCanvas.width = 1024;
    gameCanvas.height = 768;
}