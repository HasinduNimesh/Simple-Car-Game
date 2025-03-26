import Phaser from 'phaser';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene');
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Progress bar background
    const progressBarBg = this.add.rectangle(width / 2, height / 2, 320, 50, 0x222222);
    progressBarBg.setStrokeStyle(4, 0xffffff);
    
    // Progress bar
    const progressBar = this.add.rectangle(
      width / 2 - 160, 
      height / 2, 
      0, 
      40, 
      0x00aaff
    ).setOrigin(0, 0.5);
    
    // Loading text
    const loadingText = this.add.text(
      width / 2, 
      height / 2 - 50, 
      'LOADING...', 
      { 
        fontFamily: 'Arial', 
        fontSize: '24px',
        color: '#ffffff' 
      }
    ).setOrigin(0.5);
    
    // Progress text
    const percentText = this.add.text(
      width / 2,
      height / 2,
      '0%',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      }
    ).setOrigin(0.5);

    // Register progress and complete events
    this.load.on('progress', (value: number) => {
      progressBar.width = 320 * value;
      percentText.setText(parseInt(String(value * 100)) + '%');
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      progressBar.destroy();
      progressBarBg.destroy();
      
      this.scene.start('MenuScene');
    });

    // Load game assets
    this.load.image('car', 'assets/images/car.png');
    this.load.image('road', 'assets/images/road.png');
    this.load.image('obstacle', 'assets/images/obstacle.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.image('particle', 'assets/images/particle.png'); // Added missing particle image
    
    // Load audio
    this.load.audio('engine', 'assets/audio/engine.mp3');
    this.load.audio('crash', 'assets/audio/crash.mp3');
    this.load.audio('music', 'assets/audio/music.mp3');
  }

  create() {
    // Animation to transition to menu
    this.cameras.main.fadeOut(500);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}