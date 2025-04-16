import Phaser from 'phaser';

const FONT_SIZES = {
    TITLE: '64px',
    MENU_ITEM: '32px'
};

const TEXT_COLOR = '#fff';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create(data) {
        const gameOver = this.add.text(400, 200, 'Game Over', {
            fontSize: FONT_SIZES.TITLE,
            fill: '#ff0000'
        }).setOrigin(0.5);

        const score = this.add.text(400, 300, `Final Score: ${data.score}`, {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        const playAgain = this.add.text(400, 400, 'Play Again', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const mainMenu = this.add.text(400, 450, 'Main Menu', {
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
