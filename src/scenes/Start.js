export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
    }

    create() {

    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
