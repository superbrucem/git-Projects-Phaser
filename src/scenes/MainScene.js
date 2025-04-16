import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Load assets here
    }

    create() {
        // Create game objects here
        this.add.text(400, 300, 'Hello Phaser!', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);
    }

    update() {
        // Game loop updates here
    }
}