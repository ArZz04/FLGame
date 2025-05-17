export class LoaderGame extends Phaser.Scene {
    constructor() {
        super('LoaderGame');
    }

    init(data) {
        this.level = data.level || 1;
        this.lives = data.lives || 3;
        this.nextScene = data.nextScene || 'Start';
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
                // Mostrar texto de nivel y vidas
                const text = this.add.text(centerX, centerY, `Nivel ${this.level} - Vidas ${this.lives}`, {
                    fontSize: '64px',
                    color: '#ffffff',
                    fontFamily: 'FrootLoops',
                }).setOrigin(0.5);

                // Esperar un rato y bajar opacidad para revelar siguiente escena
                this.time.delayedCall(1500, () => {
                    this.tweens.add({
                        targets: [blackOverlay, text],
                        alpha: 0,
                        duration: 3000,
                        onComplete: () => {
                            this.scene.start(this.nextScene);
                        }
                    });
                });
            }
        });
    }
}
