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

        this.load.image('left-button', 'assets/UI/buttons/ArrowLeft-Bold/left-button.png');
        this.load.image('left-button-pressed', 'assets/UI/buttons/ArrowLeft-Bold/left-button-pressed.png');

        this.load.image('right-button', 'assets/UI/buttons/ArrowLeft-Bold/left-button.png'); // Puedes invertirla visualmente
        this.load.image('right-button-pressed', 'assets/UI/buttons/ArrowLeft-Bold/left-button-pressed.png');
    }

    create() {
        this.add.text(this.scale.width / 2.7, this.scale.height / 6, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '48px',
            color: '#ffffff'
        });

        // === CONTENEDOR CON TODOS LOS SPRITES ===
        this.characterContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);

        const spacing = 150; // espacio horizontal entre personajes
        let offset = -spacing * 2;

        const yoichi = new YoichiSprite(this, offset, 0).setScale(2);
        offset += spacing;

        const tanjiro = new TanjiroSprite(this, offset, 0).setScale(4);
        offset += spacing;

        const player1 = new PlayerSprite(this, offset, 0, 'player1').setScale(3);
        offset += spacing;

        const player2 = new PlayerSprite(this, offset, 0, 'player2').setScale(3);
        offset += spacing;

        const player3 = new PlayerSprite(this, offset, 0, 'player3').setScale(3);

        this.characterContainer.add([yoichi, tanjiro, player1, player2, player3]);

        // === BOTONES VISUALES ===
        const leftBtn = this.add.image(300, this.scale.height / 2, 'left-button').setInteractive();
        leftBtn.setScale(0.5); // Escala el botón izquierdo
        const rightBtn = this.add.image(this.scale.width - 300, this.scale.height / 2, 'right-button').setInteractive().setFlipX(true);
        rightBtn.setScale(0.5); // Escala el botón derecho

        const moveCharacters = (direction) => {
            this.tweens.add({
                targets: this.characterContainer,
                x: this.characterContainer.x + (direction * spacing),
                duration: 300,
                ease: 'Power2'
            });
        };

        // Botón izquierdo
        leftBtn.on('pointerdown', () => {
            leftBtn.setTexture('left-button-pressed');
            moveCharacters(1);
        });

        leftBtn.on('pointerup', () => {
            leftBtn.setTexture('left-button');
        });

        // Botón derecho
        rightBtn.on('pointerdown', () => {
            rightBtn.setTexture('right-button-pressed');
            moveCharacters(-1);
        });

        rightBtn.on('pointerup', () => {
            rightBtn.setTexture('right-button');
        });
    }
}
