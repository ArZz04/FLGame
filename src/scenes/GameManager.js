export class GameManager extends Phaser.Scene {
    constructor() {
        super({ key: 'GameManager', active: true });
    }

    init() {
        this.currentLevel = 1;
        this.lives = 3;
        this.hasPet = false;
        this.playerSelected = null;  // nuevo
    }

    setPlayerSelected(index) {
        this.playerSelected = index;
    }

    setPet(value) {
        this.hasPet = value;
    }

    startGame() {
        this.currentLevel = 1;
        this.lives = 3;

        console.log('Starting game with player:', this.playerSelected, 'hasPet:', this.hasPet);

        this.launchLoaderToLevel(this.currentLevel);
    }

    startLevel(levelNumber) {
        this.currentLevel = levelNumber;
        this.scene.stop(`Level${levelNumber - 1}`); 
        this.scene.launch(`Level${levelNumber}`, {
            lives: this.lives,
            hasPet: this.hasPet,
            playerSelected: this.playerSelected // PASAR info a escena nivel
        });
    }

    onLevelComplete() {
        this.currentLevel += 1;
        this.launchLoaderToLevel(this.currentLevel);
    }

    loseLife() {
        this.lives -= 1;
        if (this.lives <= 0) {
            console.log('Game Over');
            this.scene.start('Main');
        } else {
            this.launchLoaderToLevel(this.currentLevel); // Reinicia mismo nivel
        }
    }

    setPet(value) {
        this.hasPet = value;
    }

    launchLoaderToLevel(levelNumber) {
        this.scene.launch('LoaderGame', {
            level: levelNumber,
            lives: this.lives,
            hasPet: this.hasPet,
            playerSelected: this.playerSelected, // PASAR info aquí
            nextScene: `Level${levelNumber}`
        });
    }
}
