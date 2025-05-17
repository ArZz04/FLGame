import { TanjiroSprite } from '../characters/Tanjiro.js';
import { PlayerSprite } from '../characters/Player.js';  // Clase genérica para player1, player2, player3
import { KuromiSprite } from '../characters/Kuromi.js';
import { MyMelodySprite } from '../characters/Melody.js';

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

        this.load.spritesheet('kuromi-idle', 'assets/characters/kuromi/idle-kuromi.png', {
            frameWidth: 36,
            frameHeight: 46
        });

        this.load.spritesheet('melody-idle', 'assets/characters/myMelody/idle-melody.png', {
            frameWidth: 268 / 8, // Asumiendo 8 frames horizontales
            frameHeight: 52
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
        this.load.image('star-yoichi', 'assets/UI/buttons/Star/star-button.png');
        this.load.image('star-yoichi-pressed', 'assets/UI/buttons/Star/star-button-pressed.png');
        this.load.image('play-button', 'assets/UI/buttons/PlayIcon/play-button.png');
        this.load.image('play-button-pressed', 'assets/UI/buttons/PlayIcon/play-button-pressed.png');
    }

    create() {
        this.add.text(this.scale.width / 2.7, this.scale.height / 6, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '64px',
            color: '#ffffff'
        });

        this.add.text(170, 75, 'Inicio', {
            fontFamily: 'FrootLoops',
            fontSize: '48px',
            color: '#ffffff'
        });

        let isPointerDownPlay = false;

        const PlayBtn = this.add.image(this.scale.width - 400, this.scale.height - 120, 'play-button')
            .setInteractive();

            PlayBtn.setScale(1); // escala base

            PlayBtn.on('pointerdown', () => {
                isPointerDownPlay = true;
                PlayBtn.setTexture('play-button-pressed');
                PlayBtn.setScale(0.95); // como si se hundiera
            });
            
            PlayBtn.on('pointerup', () => {
                if (isPointerDownPlay) {
                    PlayBtn.setTexture('play-button');
                    PlayBtn.setScale(1);
                    this.scene.launch('LoaderGame', { level: 1, lives: 3, nextScene: 'Start' });
                }
                isPointerDownPlay = false;
            });
            
            PlayBtn.on('pointerout', () => {
                if (isPointerDownPlay) {
                    PlayBtn.setTexture('play-button');
                    PlayBtn.setScale(1);
                    isPointerDownPlay = false;
                }
            });

        const yoichiBtn = this.add.image(100, this.scale.height - 100, 'star-yoichi')
            .setInteractive()
            .setScale(1.5);

        const labelText = this.add.text(yoichiBtn.x + yoichiBtn.displayWidth / 2 + 15, yoichiBtn.y, 'Sin Mascota', {
            fontFamily: 'FrootLoops',
            fontSize: '48px',
            color: '#ffffff',
            align: 'left'
        }).setOrigin(0, 0.5);

        let pressed = false;

        yoichiBtn.on('pointerup', () => {
            pressed = !pressed;
            yoichiBtn.setTexture(pressed ? 'star-yoichi-pressed' : 'star-yoichi');
            labelText.setText(pressed ? 'Con Mascota' : 'Sin Mascota');
        });

        this.characterContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);

        const spacing = 150;
        let offset = -spacing * 2;

        const characters = [];

        const tanjiro = new TanjiroSprite(this, offset + 20, 0).setScale(4);
        characters.push(tanjiro);
        offset += spacing;

        const kuromi = new KuromiSprite(this, offset, 0).setScale(4);
        characters.push(kuromi);
        offset += spacing;

        const melody = new MyMelodySprite(this, offset + 10, 0).setScale(4);
        characters.push(melody);
        offset += spacing;
    
        const player1 = new PlayerSprite(this, offset + 10, 0, 'player1').setScale(6);
        characters.push(player1);
        offset += spacing;
    
        const player2 = new PlayerSprite(this, offset, 0, 'player2').setScale(6);
        characters.push(player2);
        offset += spacing;
    
        const player3 = new PlayerSprite(this, offset + 10, 0, 'player3').setScale(6);
        characters.push(player3);
    
        this.characterContainer.add(characters);
    
        // Guardamos la escala base para cada personaje para poder restaurarla después
        characters.forEach(char => {
            char.baseScale = char.scaleX;  // Asumiendo escala uniforme en X y Y
        });
    
        this.currentIndex = 2;
        const characterCount = characters.length;

        let isPointerDownHome = false;
        // Botón home (igual que antes)
        const homeBtn = this.add.image(100, 100, 'home-button').setInteractive().setScale(0.3);

        homeBtn.on('pointerdown', () => {
            isPointerDownHome = true;
            homeBtn.setTexture('home-button-pressed');
        });
        
        homeBtn.on('pointerup', (pointer) => {
            if (isPointerDownHome) {
                homeBtn.setTexture('home-button');
                this.scene.start('Menu');
            }
            isPointerDownHome = false;
        });
        
        homeBtn.on('pointerout', () => {
            // Si el usuario saca el dedo sin soltar
            if (isPointerDownHome) {
                homeBtn.setTexture('home-button');
                isPointerDownHome = false;
            }
        });
        
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
            const worldPoint = selectedCharacter.getWorldTransformMatrix().transformPoint(0, 6);
    
            let arrowX = worldPoint.x;
            const arrowY = worldPoint.y + 150;
    
            if (selectedCharacter === player3) {
                arrowX -= 15;
            }
            if (selectedCharacter === player1) {
                arrowX -= 10;
            }
            if (selectedCharacter === tanjiro) {
                arrowX -= 20;
            }
            if (selectedCharacter === kuromi) {
                arrowX -= 10;
            }
    
            this.selectorArrow.x = arrowX;
            this.selectorArrow.y = arrowY;
        };
    
        // Nueva función para actualizar escalas según el personaje seleccionado
        const updateCharacterScales = () => {
            characters.forEach((char, index) => {
                if (index === this.currentIndex) {
                    // Aumenta la escala en 0.5
                    this.tweens.add({
                        targets: char,
                        scaleX: char.baseScale + 2,
                        scaleY: char.baseScale + 2,
                        duration: 300,
                        ease: 'Power2',
                    });
                } else {
                    // Restaura escala base
                    this.tweens.add({
                        targets: char,
                        scaleX: char.baseScale,
                        scaleY: char.baseScale,
                        duration: 300,
                        ease: 'Power2',
                    });
                }
            });
        };
    
        // Llamar las dos funciones para la posición y escala inicial al crear la escena
        updateSelectorArrowPosition();
        updateCharacterScales();
    
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
                updateCharacterScales();
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