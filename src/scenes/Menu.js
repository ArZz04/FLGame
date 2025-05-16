export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('play', 'assets/UI/buttons/PlayText/Default@4x.png');
    }

    create() {
        this.logo = this.add.image(this.scale.width / 2, this.scale.height / 2 - 250, 'logo').setScale(0.15);

        this.playButton = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, 'play').setScale(0.4);
        this.playButton.setInteractive();

        this.playButton.on('pointerdown', () => {
            this.scene.start('Choose');
        });

        this.add.text(20, this.scale.height - 100, 'Hecho por:', {
            font: '32px FrootLoops',
            fill: '#ffffff'
        });
        this.add.text(20, this.scale.height - 60, 'ArZz04', {
            font: '32px FrootLoops',
            fill: '#ffffff'
        });
    }
}
