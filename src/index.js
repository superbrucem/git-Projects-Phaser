import Phaser from 'phaser';

class MainMenu extends Phaser.Scene {
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

class GamePlay extends Phaser.Scene {
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

class Settings extends Phaser.Scene {
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

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create(data) {
        const gameOver = this.add.text(400, 200, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000'
        }).setOrigin(0.5);

        const score = this.add.text(400, 300, `Final Score: ${data.score}`, {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        const playAgain = this.add.text(400, 400, 'Play Again', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const mainMenu = this.add.text(400, 450, 'Main Menu', {
            fontSize: '32px',
            fill: '#fff'
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
            button.on('pointerout', () => button.setStyle({ fill: '#fff' }));
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#2d2d2d',
    scene: [MainMenu, GamePlay, Settings, GameOver]
};

new Phaser.Game(config);

