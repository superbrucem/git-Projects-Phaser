import Phaser from 'phaser';
import { FONT_SIZES, TEXT_COLOR, SCREEN } from '../constants/globals';

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'GamePlay' });
        this.score = 0;
    }

    create() {
        // Score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        });

        // Add a player placeholder
        const player = this.add.rectangle(SCREEN.CENTER_X, SCREEN.CENTER_Y, 50, 50, 0x00ff00);
        
        // Example game object that gives points when clicked
        const target = this.add.circle(SCREEN.CENTER_X, 200, 25, 0xff0000)
            .setInteractive()
            .on('pointerdown', () => {
                this.score += 10;
                this.scoreText.setText('Score: ' + this.score);
                if (this.score >= 50) {
                    this.scene.start('GameOver', { score: this.score });
                }
            });

        // Pause button
        const pauseButton = this.add.text(SCREEN.CENTER_X * 2 - 100, 16, 'Pause', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setInteractive();

        pauseButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
