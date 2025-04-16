import Phaser from 'phaser';

const FONT_SIZES = {
    TITLE: '64px',
    MENU_ITEM: '32px'
};

const TEXT_COLOR = '#fff';

export default class Settings extends Phaser.Scene {
    constructor() {
        super({ key: 'Settings' });
    }

    create() {
        const title = this.add.text(400, 100, 'Settings', {
            fontSize: '48px',
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        // Example settings
        const soundButton = this.add.text(400, 200, 'Sound: ON', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const musicButton = this.add.text(400, 250, 'Music: ON', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const backButton = this.add.text(400, 400, 'Back to Menu', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // Add hover effects
        [soundButton, musicButton, backButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
            button.on('pointerout', () => button.setStyle({ fill: TEXT_COLOR }));
        });
    }
}
