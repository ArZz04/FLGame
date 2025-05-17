export class PlayerSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, playerName) {
        const nameStr = typeof playerName === 'number' ? `player${playerName}` : playerName;
        const animKey = `${nameStr}-idle`;

        super(scene, x, y, animKey);
        scene.add.existing(this);

        // Suponiendo que player1 tiene 4 frames pero player2 y player3 sólo 1 frame
        if (!scene.anims.exists(animKey)) {
            scene.anims.create({
                key: animKey,
                frames: scene.anims.generateFrameNumbers(animKey, { start: 0, end: 3 }),
                frameRate: 6,
                repeat: -1
            });
        }

        this.play(animKey);
        this.setScale(6);
    }
}

