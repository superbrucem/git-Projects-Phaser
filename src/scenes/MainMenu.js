import Phaser from 'phaser';

const FONT_SIZES = {
    TITLE: '64px',
    MENU_ITEM: '32px'
};

const TEXT_COLOR = '#fff';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        // Load the music file - supports mp3, ogg, wav
        this.load.audio('bgMusic', [
            'assets/audio/gamestart.mp3',
            'assets/audio/gamestart.ogg'
        ]);
    }

    create() {
        // Play the background music
        this.sound.play('bgMusic', {
            loop: true,
            volume: 0.5
        });

        const title = this.add.text(400, 200, 'My Game', {
            fontSize: FONT_SIZES.TITLE,
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        const playButton = this.add.text(400, 300, 'Play', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const settingsButton = this.add.text(400, 350, 'Settings', {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
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
            button.on('pointerout', () => button.setStyle({ fill: TEXT_COLOR }));
        });
    }
}
