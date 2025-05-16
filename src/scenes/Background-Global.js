export class Background extends Phaser.Scene {
    constructor() {
        super({ key: 'Background', active: false }); // NO active aquí, deja false para que arranque cuando Preload lo llame
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);
        this.scene.launch('Menu');
    }

    update() {
        this.bg.tilePositionX += 2;
    }
}
