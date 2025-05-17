import { YoichiSprite } from '../characters/Yoichi.js';
import { TanjiroSprite } from '../characters/Tanjiro.js';
import { PlayerSprite } from '../characters/Player.js';  // genérica para players 1,2,3

export class Choose extends Phaser.Scene {
    constructor() {
        super('Choose');
    }

    preload() {
        this.load.spritesheet('yoichi', 'assets/characters/yoichi/yoichi.png', {
            frameWidth: 90,
            frameHeight: 58
        });

        this.load.spritesheet('tanjiro-idle', 'assets/characters/tanjiro/idle-tanjiro.png', {
            frameWidth: 50,
            frameHeight: 48
        });

        this.load.spritesheet('player1-idle', 'assets/characters/player1/idle-player1.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('player2-idle', 'assets/characters/player2/idle-player2.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('player3-idle', 'assets/characters/player3/idle-player3.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.add.text(this.scale.width / 2.7, this.scale.height / 5, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '64px',
            color: '#ffffff'
        });

        const yoichi = new YoichiSprite(this, this.scale.width / 2 - 200, this.scale.height / 2+40).setScale(2);
        const tanjiro = new TanjiroSprite(this, this.scale.width / 2 + 10, this.scale.height / 2-25).setScale(5);

        const player1 = new PlayerSprite(this, this.scale.width / 2 + 100, this.scale.height / 2, 'player1');
        const player2 = new PlayerSprite(this, this.scale.width / 2 + 220, this.scale.height / 2, 'player2');
        const player3 = new PlayerSprite(this, this.scale.width / 2 + 360, this.scale.height / 2, 'player3');
    }
}
