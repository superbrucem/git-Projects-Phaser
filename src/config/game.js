import Phaser from 'phaser';
import MainMenu from '../scenes/MainMenu';
import GamePlay from '../scenes/GamePlay';
import Settings from '../scenes/Settings';
import GameOver from '../scenes/GameOver';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game',
    backgroundColor: '#2d2d2d',
    scene: [MainMenu, GamePlay, Settings, GameOver]
};

export default config;
