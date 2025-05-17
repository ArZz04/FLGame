import { YoichiSprite } from '../characters/Yoichi.js';
import { TanjiroSprite } from '../characters/Tanjiro.js';
import { PlayerSprite } from '../characters/Player.js';  // Clase genérica para player1, player2, player3

export class Choose extends Phaser.Scene {
    constructor() {
        super('Choose');
    }

    preload() {
        // Carga de spritesheets
        this.load.spritesheet('tanjiro-idle', 'assets/characters/tanjiro/idle-tanjiro.png', {
            frameWidth: 32,
            frameHeight: 48
        });

        ['player1', 'player2', 'player3'].forEach(name => {
            this.load.spritesheet(`${name}-idle`, `assets/characters/${name}/idle-${name}.png`, {
                frameWidth: 32,
                frameHeight: 32
            });
        });

        // UI: botones
        this.load.image('left-button', 'assets/UI/buttons/ArrowLeft-Bold/left-button.png');
        this.load.image('left-button-pressed', 'assets/UI/buttons/ArrowLeft-Bold/left-button-pressed.png');
        this.load.image('right-button', 'assets/UI/buttons/ArrowLeft-Bold/left-button.png'); // se voltea en create()
        this.load.image('right-button-pressed', 'assets/UI/buttons/ArrowLeft-Bold/left-button-pressed.png');
        this.load.image('home-button', 'assets/UI/buttons/Home/home-button.png');
        this.load.image('home-button-pressed', 'assets/UI/buttons/Home/home-button-pressed.png');
        this.load.image('selector-arrow', 'assets/UI/buttons/Selector/selector.png');
    }

    create() {
        this.add.text(this.scale.width / 2.7, this.scale.height / 6, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '64px',
            color: '#ffffff'
        });

        this.characterContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);

        const spacing = 150;
        let offset = -spacing * 2;

        const characters = [];

        const tanjiro = new TanjiroSprite(this, offset+20, 0).setScale(4);
        characters.push(tanjiro);
        offset += spacing;

        const player1 = new PlayerSprite(this, offset+10, 0, 'player1').setScale(6);
        characters.push(player1);
        offset += spacing;

        const player2 = new PlayerSprite(this, offset, 0, 'player2').setScale(6);
        characters.push(player2);
        offset += spacing;

        const player3 = new PlayerSprite(this, offset+10, 0, 'player3').setScale(6);
        characters.push(player3);

        this.characterContainer.add(characters);

        this.currentIndex = 2;
        const characterCount = characters.length;

        // Botón home (igual que antes)
        // ...

        // Botones de izquierda y derecha
        const leftBtn = this.add.image(600, this.scale.height / 2, 'left-button').setInteractive().setScale(0.5);
        const rightBtn = this.add.image(this.scale.width - 600, this.scale.height / 2, 'right-button').setInteractive().setFlipX(true).setScale(0.5);

        // Flecha selector (fuera del contenedor para controlarla)
        this.selectorArrow = this.add.image(0, 0, 'selector-arrow')
            .setScale(0.3)
            .setAngle(90);

        // Función para actualizar la posición del selector
        const updateSelectorArrowPosition = () => {
            const selectedCharacter = characters[this.currentIndex];
            const worldPoint = selectedCharacter.getWorldTransformMatrix().transformPoint(0, 0);
        
            // Ajuste general de la flecha debajo del personaje
            let arrowX = worldPoint.x;
            const arrowY = worldPoint.y + 150;

            if (selectedCharacter === player3) {
                arrowX -= 15; // Ajusta este valor para que quede alineado
            }

            if (selectedCharacter === player1) {
                arrowX -= 10; // Ajusta este valor para que quede alineado
            }
        
            // Si el personaje es Tanjiro, ajusta la X un poco para la derecha
            if (selectedCharacter === tanjiro) {
                arrowX -= 20; // Ajusta este valor para que quede alineado
            }
        
            this.selectorArrow.x = arrowX;
            this.selectorArrow.y = arrowY;
        };
        // Llamar la primera vez para posicionar la flecha
        updateSelectorArrowPosition();

        const moveCharacters = (direction) => {
            const newIndex = this.currentIndex + direction;

            if (newIndex >= 0 && newIndex < characterCount) {
                this.tweens.add({
                    targets: this.characterContainer,
                    x: this.characterContainer.x - (direction * spacing),
                    duration: 300,
                    ease: 'Power2',
                    onUpdate: () => updateSelectorArrowPosition()
                });
                this.currentIndex = newIndex;
            }
        };

        leftBtn.on('pointerdown', () => {
            leftBtn.setTexture('left-button-pressed');
            moveCharacters(-1);
        });

        leftBtn.on('pointerup', () => {
            leftBtn.setTexture('left-button');
        });

        rightBtn.on('pointerdown', () => {
            rightBtn.setTexture('right-button-pressed');
            moveCharacters(1);
        });

        rightBtn.on('pointerup', () => {
            rightBtn.setTexture('right-button');
        });
    }
}