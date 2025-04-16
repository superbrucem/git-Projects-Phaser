import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        const title = this.add.text(400, 200, 'My Game', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

        const playButton = this.add.text(400, 300, 'Play', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const settingsButton = this.add.text(400, 350, 'Settings', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GamePlay');
        });

        settingsButton.on('pointerdown', () => {
            this.scene.start('Settings');
        });

        // Add hover effect
        [playButton, settingsButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
            button.on('pointerout', () => button.setStyle({ fill: '#fff' }));
        });
    }
}