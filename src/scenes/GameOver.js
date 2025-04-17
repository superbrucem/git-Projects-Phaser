import Phaser from 'phaser';
import { FONT_SIZES, TEXT_COLOR, SCREEN } from '../constants/globals';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create(data) {
        const gameOver = this.add.text(SCREEN.CENTER_X, 200, 'Game Over', {
            fontSize: FONT_SIZES.TITLE,
            fill: '#ff0000'
        }).setOrigin(0.5);

        const score = this.add.text(SCREEN.CENTER_X, 300, `Final Score: ${data.score}`, {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        const playAgain = this.add.text(SCREEN.CENTER_X, 400, 'Play Again', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const mainMenu = this.add.text(SCREEN.CENTER_X, 450, 'Main Menu', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        playAgain.on('pointerdown', () => {
            this.scene.start('GamePlay');
        });

        mainMenu.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // Add hover effects
        [playAgain, mainMenu].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
            button.on('pointerout', () => button.setStyle({ fill: TEXT_COLOR }));
        });
    }
}
