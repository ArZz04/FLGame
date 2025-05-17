export class BaseLevel extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    init(data) {
        this.lives = data.lives || 3;
        this.hasPet = data.hasPet || false;
    }

    createCommonHUD() {
        // HUD compartido
    }

    loseLife() {
        this.scene.get('GameManager').loseLife();
    }
}
