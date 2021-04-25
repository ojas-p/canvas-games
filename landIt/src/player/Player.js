import { drawSprite } from '../utils/utils';
// import mainCharacterSprite from './assets/maincharac-croped.png';
import mainCharacterSprite from './assets/princessleia.png';

class Player {
  constructor(stageProps) {
    this.props = stageProps;
    this.spritePostions = {
      // rightWalk: {
      //   row: 11,
      //   col: 0,
      //   maxCol: 8,
      // },
      // leftWalk: {
      //   row: 9,
      //   col: 0,
      //   maxCol: 8,
      // },
      // upWalk: {
      //   row: 8,
      //   col: 0,
      //   maxCol: 8,
      // },
      // downWalk: {
      //   row: 10,
      //   col: 0,
      //   maxCol: 8,
      // },

      // Leia start
      rightWalk: {
        row: 2,
        col: 0,
        maxCol: 3,
      },
      leftWalk: {
        row: 1,
        col: 0,
        maxCol: 3,
      },
      upWalk: {
        row: 3,
        col: 0,
        maxCol: 3,
      },
      downWalk: {
        row: 0,
        col: 0,
        maxCol: 3,
      }

      // Leia end
    };

    this.sprite = new Image();
    this.sprite.src = mainCharacterSprite;

    this.keyPressed = {};
    this.state = ['leftWalk', 'rightWalk', 'upWalk', 'downWalk'];
    this.x = 700;
    this.y = 400;
    this.height = 48; //1019/16    leia 192/4
    this.width = 32; //567/9    leia 128/4
    this.spriteX = this.spritePostions.rightWalk.col;
    this.spriteY = this.spritePostions.rightWalk.row;
    this.speed = 3;
    this.moving = false;
    this.direction = 'rightWalk';

    this.draw = this.draw.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.updatePosition = this.updatePosition.bind(this);

    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  keyDown(e) {
    this.keyPressed[e.keyCode] = true;
    this.updatePosition();
  }

  keyUp(e) {
    delete this.keyPressed[e.keyCode];
    this.updatePosition();
  }

  updatePosition() {
    this.moving = true;
    if (this.keyPressed[37]) {  // Left
      if (this.x > 0) {
        this.x -= this.speed;
      }
      this.direction = this.state[0];
    }
    if (this.keyPressed[38]) {  // Up
      if ((this.y) > 0) {
        this.y -= this.speed;
      }
      this.direction = this.state[2];
    }
    if (this.keyPressed[39]) {  // Right
      if ((this.x + this.width / 2) < this.props.width) {
        this.x += this.speed;
      }
      this.direction = this.state[1];
    }
    if (this.keyPressed[40]) {  // Down
      if ((this.y + this.height / 2) < this.props.height) {
        this.y += this.speed;
      }
      this.direction = this.state[3];
    }


    if (this.spriteX < this.spritePostions[this.direction].maxCol) {
      this.spriteX += 1;
    } else {
      this.spriteX = 0;
    }
    this.spriteY = this.spritePostions[this.direction].row;
  }

  draw(ctx) {
    drawSprite(ctx, this.sprite, this.spriteX * this.width, this.spriteY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

export default Player;