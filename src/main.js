import { Choose } from './scenes/Choose.js';
import { Menu } from './scenes/Menu.js';
import { Background } from './scenes/Background-Global.js';
import { Preload } from './scenes/Preload.js';
import { LoaderGame } from './scenes/LoaderGame.js';
import { GameManager } from './scenes/GameManager.js';
import { Level1 } from './scenes/Level1.js';
import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';
import { BaseLevel } from './scenes/BaseLevel.js';

const config = {
    type: Phaser.AUTO,
    title: 'FrootLoops Game',
    description: '',
    parent: 'game-container',
    width: 2500,
    height: 1024,
    backgroundColor: '#111111',
    pixelArt: false,
    scene: [
        Preload,
        Background,
        Menu,
        Choose,
        GameManager,
        LoaderGame, 
        BaseLevel,
        Level1, 
        Level2, 
        Level3, 
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

document.fonts.load('64px FrootLoops').then(() => {
    new Phaser.Game(config);
  });