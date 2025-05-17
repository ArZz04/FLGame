import { BaseLevel } from './BaseLevel.js';

export class Level3 extends BaseLevel {
    constructor() {
        super('Level3');
    }

    create() {
        this.createCommonHUD();
        // lógica específica de Level1
    }
}
