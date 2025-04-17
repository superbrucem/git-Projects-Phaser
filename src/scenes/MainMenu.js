import Phaser from 'phaser';
import { GAME_TITLE, PLAY_TEXT, SETTINGS_TEXT, FONT_SIZES, TEXT_COLOR, SCREEN } from '../constants/globals';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.audio('bgMusic', [
            'assets/audio/gamestart.mp3',
            'assets/audio/gamestart.ogg'
        ]);
    }

    create() {
        this.sound.play('bgMusic', {
            loop: true,
            volume: 0.5
        });

        // Add background color - fixed version
        this.cameras.main.setBackgroundColor('#3498db');
        // Or alternatively:
        // this.add.rectangle(0, 0, SCREEN.WIDTH * 2, SCREEN.HEIGHT * 2, 0x3498db).setOrigin(0);

        const title = this.add.text(SCREEN.CENTER_X, 200, GAME_TITLE, {
            fontSize: FONT_SIZES.TITLE,
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        const playButton = this.add.text(SCREEN.CENTER_X, 300, PLAY_TEXT, {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const settingsButton = this.add.text(SCREEN.CENTER_X, 350, SETTINGS_TEXT, {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GamePlay');
        });

        settingsButton.on('pointerdown', () => {
            this.scene.start('Settings');
        });

        [playButton, settingsButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
            button.on('pointerout', () => button.setStyle({ fill: TEXT_COLOR }));
        });
    }
}
