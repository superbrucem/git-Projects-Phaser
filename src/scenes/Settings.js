import Phaser from 'phaser';
import { FONT_SIZES, TEXT_COLOR, SCREEN } from '../constants/globals';

export default class Settings extends Phaser.Scene {
    constructor() {
        super({ key: 'Settings' });
    }

    create() {
        const title = this.add.text(SCREEN.CENTER_X, 100, 'Settings', {
            fontSize: '48px',
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        // Example settings
        const soundButton = this.add.text(SCREEN.CENTER_X, 200, 'Sound: ON', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const musicButton = this.add.text(SCREEN.CENTER_X, 250, 'Music: ON', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const backButton = this.add.text(SCREEN.CENTER_X, 400, 'Back to Menu', {
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
