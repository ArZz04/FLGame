import { BaseLevel } from './BaseLevel.js';

export class Level2 extends BaseLevel {
    constructor() {
        super('Level2');
    }

    create() {
        this.createCommonHUD();
        // lógica específica de Level1
    }
}
