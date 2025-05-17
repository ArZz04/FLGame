export class MyMelody extends Phaser.Scene {
    constructor() {
        super('MyMelodyScene');
    }

    preload() {
        this.load.spritesheet('melody-idle', 'assets/characters/myMelody/idle-melody.png', {
            frameWidth: 268 / 8, // Asumiendo 8 frames horizontales
            frameHeight: 52
        });
    }

    create() {
        this.anims.create({
            key: 'melody-idle',
            frames: this.anims.generateFrameNumbers('melody-idle', { start: 0, end: 7 }), // 8 frames: 0 a 7
            frameRate: 8,
            repeat: -1
        });

        const melody = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'melody-idle', 0);
        melody.setScale(2);
        melody.play('melody-idle');
    }
}

export class MyMelodySprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'melody-idle', 0);
        scene.add.existing(this);
        this.setScale(2);

        if (!scene.anims.exists('melody-idle')) {
            scene.anims.create({
                key: 'melody-idle',
                frames: scene.anims.generateFrameNumbers('melody-idle', { start: 0, end: 7 }),
                frameRate: 8,
                repeat: -1
            });
        }

        this.play('melody-idle');
    }
}
