import { BaseLevel } from './BaseLevel.js';

export class Level1 extends BaseLevel {
    constructor() {
        super('Level1');
    }

    preload() {
        this.load.image('backgroundL1', 'assets/forest.png');
    }

    create() {
        // Crear el fondo tipo tileSprite
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundL1')
            .setOrigin(0, 0)
            .setScrollFactor(0);

        this.createCommonHUD();

        // Aquí va el resto de la lógica de Level1
    }

    update(time, delta) {
        // Mover el fondo para crear efecto de scroll
        this.bg.tilePositionX += 2;

        // Aquí puedes agregar más lógica update para el nivel
    }
}
