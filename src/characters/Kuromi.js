export class Kuromi extends Phaser.Scene {
    constructor() {
        super('KuromiScene');
    }

    preload() {
        this.load.spritesheet('kuromi-idle', 'assets/characters/kuromi/idle-kuromi.png', {
            frameWidth: 106 / 3 ,
            frameHeight: 46
        });
    }

    create() {
        // Definimos la animación con clave 'kuromi-idle' (o cualquier nombre que quieras)
         // Intenta generar con 3 frames
    this.anims.create({
        key: 'kuromi-idle',
        frames: this.anims.generateFrameNumbers('kuromi-idle', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });

    const kuromi = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'kuromi-idle', 0);
    kuromi.setScale(2);
    kuromi.play('kuromi-idle');
    }
}

export class KuromiSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kuromi-idle', 0);
        scene.add.existing(this);
        this.setScale(2);

        // Crear animación si no existe
        if (!scene.anims.exists('kuromi-idle')) {
            scene.anims.create({
                key: 'kuromi-idle',
                frames: scene.anims.generateFrameNumbers('kuromi-idle', { start: 0, end: 2 }),
                frameRate: 7,
                repeat: -1
            });
        }

        this.play('kuromi-idle');
        
    }
}
