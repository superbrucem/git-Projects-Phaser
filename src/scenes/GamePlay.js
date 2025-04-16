import Phaser from 'phaser';

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'GamePlay' });
        this.score = 0;
    }

    create() {
        // Score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Add a player placeholder
        const player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
        
        // Example game object that gives points when clicked
        const target = this.add.circle(400, 200, 25, 0xff0000)
            .setInteractive()
            .on('pointerdown', () => {
                this.score += 10;
                this.scoreText.setText('Score: ' + this.score);
                if (this.score >= 50) {
                    this.scene.start('GameOver', { score: this.score });
                }
            });

        // Pause button
        const pauseButton = this.add.text(700, 16, 'Pause', {
            fontSize: '24px',
            fill: '#fff'
        }).setInteractive();

        pauseButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}