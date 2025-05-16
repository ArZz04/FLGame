export class Choose extends Phaser.Scene {

    constructor() {
        super('Choose');
    }

    preload() {
    }

    create() {
        
        this.add.text(this.scale.width / 2.7, this.scale.height / 5, 'Seleccionar un personaje:', {
            fontFamily: 'FrootLoops',
            fontSize: '64px',
            color: '#ffffff'
          });

    }

    update() {
    }
    
}
