export class Tanjiro extends Phaser.Scene {
    constructor() {
        super('TanjiroScene');
    }

    preload() {
        // Carga del spritesheet de Tanjiro en idle
        this.load.spritesheet('tanjiro-idle', 'assets/characters/tanjiro/idle-tanjiro.png', {
            frameWidth: 100,
            frameHeight: 48
        });
    }

    create() {
        // Crear la animación 'idle' si no existe aún
        if (!this.anims.exists('tanjiro-idle')) {
            this.anims.create({
                key: 'tanjiro-idle',
                frames: this.anims.generateFrameNumbers('tanjiro-idle', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });
        }

        const tanjiro = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'tanjiro-idle');
        tanjiro.setScale(2);
        tanjiro.play('tanjiro-idle');
    }
}

export class TanjiroSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tanjiro-idle');
        scene.add.existing(this);

        if (!scene.anims.exists('tanjiro-idle')) {
            scene.anims.create({
                key: 'tanjiro-idle',
                frames: scene.anims.generateFrameNumbers('tanjiro-idle', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });
        }

        this.setScale(2);
        this.play('tanjiro-idle');
    }
}
