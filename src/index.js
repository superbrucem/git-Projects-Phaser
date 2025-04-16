import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.add.text(400, 300, 'Hello Phaser!', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#2d2d2d', // Dark gray background
    scene: MainScene
};

new Phaser.Game(config);



