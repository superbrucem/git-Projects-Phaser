import Phaser from 'phaser';

export default class Settings extends Phaser.Scene {
    constructor() {
        super({ key: 'Settings' });
    }

    create() {
        const title = this.add.text(400, 100, 'Settings', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Example settings
        const soundButton = this.add.text(400, 200, 'Sound: ON', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const musicButton = this.add.text(400, 250, 'Music: ON', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const backButton = this.add.text(400, 400, 'Back to Menu', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // Add hover effects
        [soundButton, musicButton, backButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
            button.on('pointerout', () => button.setStyle({ fill: '#fff' }));
        });
    }
}