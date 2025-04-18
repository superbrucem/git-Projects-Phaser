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
        
        // Load white/bright star images
        this.load.image('star', 'assets/images/star1.png');  
        this.load.image('meteorsmall', 'assets/images/meteorGrey_small2.png');  
        this.load.image('meteorbig', 'assets/images/meteorBrown_big1.png');  
        this.load.image('ship', 'assets/images/playerShip2_orange.png');
    }

    create() {
        this.sound.play('bgMusic', {
            loop: true,
            volume: 0.5
        });

        this.cameras.main.setBackgroundColor('#000000');
        // Create three layers of stars for parallax effect
        const smallStars = this.add.group({
            key: 'star',
            repeat: 50,
            setXY: {
                x: 16,
                y: 16,
                stepX: Phaser.Math.Between(40, 100),
                stepY: Phaser.Math.Between(20, 60)
            },
            setScale: { x: 0.5, y: 0.5 }  // Increased from 0.1 to 0.5
        });

        const mediumStars = this.add.group({
            key: 'meteorsmall',  // Changed from 'star' to 'meteorsmall'
            repeat: 30,
            setXY: {
                x: 32,
                y: 32,
                stepX: Phaser.Math.Between(60, 120),
                stepY: Phaser.Math.Between(40, 80)
            },
            setScale: { x: 0.8, y: 0.8 }  // Increased from 0.2 to 0.8
        });

        const bigStars = this.add.group({
            key: 'meteorbig',
            repeat: 15,
            setXY: {
                x: 48,
                y: 48,
                stepX: Phaser.Math.Between(100, 200),
                stepY: Phaser.Math.Between(60, 100)
            },
            setScale: { x: 1.0, y: 1.0 }  // Increased from 0.3 to 1.0
        });

        // Add tint to make stars white/bright
        [smallStars, mediumStars, bigStars].forEach(group => {
            group.getChildren().forEach(star => {
                star.x = Phaser.Math.Between(0, SCREEN.CENTER_X * 2);
                star.y = Phaser.Math.Between(0, SCREEN.CENTER_Y * 2);
                star.setTint(0xFFFFFF);  // Make stars white
                // Optional: Add some alpha variation
                star.setAlpha(Phaser.Math.FloatBetween(0.5, 1));
            });
        });

        // Animate stars with different speeds for each layer
        this.tweens.add({
            targets: smallStars.getChildren(),
            y: '+=720',
            duration: 20000,
            repeat: -1,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: mediumStars.getChildren(),
            y: '+=720',
            duration: 15000,
            repeat: -1,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: bigStars.getChildren(),
            y: '+=720',
            duration: 10000,
            repeat: -1,
            ease: 'Linear'
        });

        // Add the floating ship - start from bottom of screen
        this.ship = this.add.image(SCREEN.CENTER_X, SCREEN.CENTER_Y * 2 - 100, 'ship');

        // Create multiple tweens for more complex movement
        this.tweens.add({
            targets: this.ship,
            y: SCREEN.CENTER_Y - 100,
            duration: 1600,  // Increased from 1200 to 1600 for slower vertical movement
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Add horizontal movement
        this.tweens.add({
            targets: this.ship,
            x: {
                from: SCREEN.CENTER_X - 200,
                to: SCREEN.CENTER_X + 200,
            },
            duration: 2200,  // Increased from 1800 to 2200 for slower horizontal movement
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        const title = this.add.text(SCREEN.CENTER_X, 250, GAME_TITLE, {
            fontSize: FONT_SIZES.TITLE,
            fill: TEXT_COLOR
        }).setOrigin(0.5);

        const playButton = this.add.text(SCREEN.CENTER_X, 350, PLAY_TEXT, {
            fontSize: FONT_SIZES.MENU_ITEM,
            fill: TEXT_COLOR
        }).setOrigin(0.5).setInteractive();

        const settingsButton = this.add.text(SCREEN.CENTER_X, 400, SETTINGS_TEXT, {
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

        // Add rotation to meteors
        [mediumStars, bigStars].forEach(group => {
            group.getChildren().forEach(meteor => {
                meteor.x = Phaser.Math.Between(0, SCREEN.CENTER_X * 2);
                meteor.y = Phaser.Math.Between(0, SCREEN.CENTER_Y * 2);
                meteor.setTint(0xFFFFFF);
                meteor.setAlpha(Phaser.Math.FloatBetween(0.5, 1));
                // Add random initial rotation
                meteor.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
                // Add random rotation speed
                meteor.rotationSpeed = Phaser.Math.FloatBetween(-0.001, 0.001);
            });
        });

        // Add rotation animations for meteors
        this.tweens.add({
            targets: mediumStars.getChildren(),
            angle: 360,
            duration: 15000,
            repeat: -1,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: bigStars.getChildren(),
            angle: 360,
            duration: 20000,
            repeat: -1,
            ease: 'Linear'
        });
    }
}
