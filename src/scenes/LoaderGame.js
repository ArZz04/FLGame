export class LoaderGame extends Phaser.Scene {
    constructor() {
        super('LoaderGame');
    }

    init(data) {
        this.level = data.level || 1;
        this.lives = data.lives || 3;
        this.nextScene = data.nextScene || 'Level1';
        this.hasPet = data.hasPet || false;
        this.playerSelected = data.playerSelected; // ya está
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
    
        // Fondo negro con opacidad 0
        const blackOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
            .setOrigin(0)
            .setAlpha(0);
    
        // Subir opacidad a 1 (pantalla negra)
        this.tweens.add({
            targets: blackOverlay,
            alpha: 1,
            duration: 1500,
            onComplete: () => {
                const text = this.add.text(centerX, centerY, `Nivel ${this.level} - Vidas ${this.lives}`, {
                    fontSize: '64px',
                    color: '#ffffff',
                    fontFamily: 'FrootLoops',
                }).setOrigin(0.5);
    
                // Iniciar la siguiente escena inmediatamente cuando aparezca el texto
                
    
                // Esperar un rato y hacer fade out del loader
                this.time.delayedCall(1500, () => {
                    this.scene.launch(this.nextScene, {
                        lives: this.lives,
                        hasPet: this.hasPet,
                        playerSelected: this.playerSelected
                    });

                    this.tweens.add({
                        targets: [blackOverlay, text],
                        alpha: 0,
                        duration: 3000,
                        onComplete: () => {
                            this.scene.stop('LoaderGame'); // quita la escena loader para mostrar la que ya está lanzada
                        }
                    });
                });
            }
        });
    }
    
}
