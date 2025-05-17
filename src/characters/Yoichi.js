export class Yoichi extends Phaser.Scene {
  constructor() {
    super('YoichiScene');
  }

  preload() {
    this.load.spritesheet('yoichi', 'assets/characters/yoichi.png', {
      frameWidth: 540 / 6,   // ancho de cada frame (6 columnas máximo)
      frameHeight: 348 / 6   // altura de cada frame (6 filas)
    });
  }

  create() {
    // fila 3 tiene 4 frames, empieza en frame índice: 3 * 6 = 18
    this.anims.create({
      key: 'yoichi-idle',
      frames: this.anims.generateFrameNumbers('yoichi', { start: 18, end: 21 }),
      frameRate: 6,
      repeat: -1
    });

    const yoichiSprite = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'yoichi').setScale(2);
    yoichiSprite.play('yoichi-idle');
  }
}

export class YoichiSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'yoichi');
    
    scene.add.existing(this);

    // Crear la animación solo una vez (asegúrate de que no se duplique si creas varios Yoichi)
    if (!scene.anims.exists('yoichi-idle')) {
      scene.anims.create({
        key: 'yoichi-idle',
        frames: scene.anims.generateFrameNumbers('yoichi', { start: 18, end: 21 }),
        frameRate: 6,
        repeat: -1
      });
    }

    this.play('yoichi-idle');
    this.setScale(2);
  }
}
