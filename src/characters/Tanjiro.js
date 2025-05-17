export class Tanjiro extends Phaser.Scene {
    constructor() {
        super('TanjiroScene');
    }

    preload() {
        this.load.spritesheet('tanjiro-idle', 'assets/characters/tanjiro/idle-tanjiro.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        const tanjiro = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'tanjiro-idle', 0);
        tanjiro.setScale(2);
    }
}

export class TanjiroSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tanjiro-idle', 0); // Usamos solo el frame 0
        scene.add.existing(this);

        this.setScale(2);
    }
}
