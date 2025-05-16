import { YoichiSprite } from '../characters/Yoichi.js';  // ruta relativa a donde guardes Yoichi.js
import { TanjiroSprite } from '../characters/Tanjiro.js';  // ruta relativa a donde guardes Tanjiro.js

export class Choose extends Phaser.Scene {

    constructor() {
        super('Choose');
    }

    preload() {
        this.load.spritesheet('yoichi', 'assets/characters/yoichi.png', {
            frameWidth: 540 / 6,   // ancho de cada frame (6 columnas máximo)
            frameHeight: 348 / 6   // altura de cada frame (6 filas)
          });

        this.load.spritesheet('tanjiro-idle', 'assets/characters/tanjiro/idle-tanjiro.png', {
            frameWidth: 100,
            frameHeight: 48
        });

    }

    create() {
        this.add.text(this.scale.width / 2.7, this.scale.height / 5, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '64px',
            color: '#ffffff'
        });
      
        const yoichi = new YoichiSprite(this, this.scale.width / 2, this.scale.height / 2).setScale(3);
        const tanjiro = new TanjiroSprite(this, this.scale.width / 2, this.scale.height / 2).setScale(7);
      
    }
}
