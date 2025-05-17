export class Preload extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        const { width, height } = this.scale;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 60, 'Cargando...', {
            fontSize: '28px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Texto para mostrar tiempo restante
        const timeText = this.add.text(width / 2, height / 2 + 40, 'Tiempo restante: 3.0s', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const totalTime = 500; // 3 segundos en ms
        let elapsedTime = 0;

        let assetsLoaded = false;
        let timePassed = false;

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            assetsLoaded = true;
            if (timePassed) this.startNextScene(progressBar, progressBox, loadingText, timeText, timerEvent);
        });

        // Timer para actualizar texto del tiempo restante
        const timerEvent = this.time.addEvent({
            delay: 100,       // cada 100 ms
            callback: () => {
                elapsedTime += 100;
                const remaining = Math.max(0, totalTime - elapsedTime);
                timeText.setText(`Tiempo restante: ${(remaining / 1000).toFixed(1)}s`);

                if (remaining <= 0) {
                    timePassed = true;
                    timerEvent.remove();  // parar timer
                    if (assetsLoaded) this.startNextScene(progressBar, progressBox, loadingText, timeText, timerEvent);
                }
            },
            loop: true
        });

        // Assets a cargar
        this.load.image('background', 'assets/menu.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('play', 'assets/UI/buttons/PlayText/Default@4x.png');
    }

    startNextScene(progressBar, progressBox, loadingText, timeText, timerEvent) {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        timeText.destroy();
        if (timerEvent) timerEvent.remove();
        this.scene.start('Background');
    }
}
