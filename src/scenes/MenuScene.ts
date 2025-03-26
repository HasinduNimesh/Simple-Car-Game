import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Background with parallax effect
    const bg = this.add.tileSprite(0, 0, width, height, 'background')
      .setOrigin(0, 0);
    
    // Animated logo
    const logo = this.add.image(width / 2, height / 4, 'logo')
      .setScale(0);
    
    // Animate logo appearance
    this.tweens.add({
      targets: logo,
      scale: 1,
      duration: 1000,
      ease: 'Bounce.Out'
    });
    
    // Title text
    this.add.text(width / 2, height / 2 - 50, 'TURBO RACER', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Play button with hover effect
    const playButton = this.add.container(width / 2, height / 2 + 80);
    
    const buttonBg = this.add.rectangle(0, 0, 200, 60, 0x00aaff, 1)
      .setStrokeStyle(2, 0xffffff);
    
    const buttonText = this.add.text(0, 0, 'PLAY', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    playButton.add([buttonBg, buttonText]);
    playButton.setSize(200, 60);
    playButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        buttonBg.fillColor = 0x0088cc;
        buttonText.setScale(1.1);
      })
      .on('pointerout', () => {
        buttonBg.fillColor = 0x00aaff;
        buttonText.setScale(1);
      })
      .on('pointerdown', () => {
        // Play click sound
        this.sound.play('engine', { volume: 0.5 });
        
        // Start game with fade
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start('GameScene');
          this.scene.start('GameUIScene');
        });
      });
    
    // Settings button
    const settingsButton = this.add.container(width / 2, height / 2 + 160);
    
    const settingsBg = this.add.rectangle(0, 0, 200, 60, 0x444444, 1)
      .setStrokeStyle(2, 0xffffff);
    
    const settingsText = this.add.text(0, 0, 'SETTINGS', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    settingsButton.add([settingsBg, settingsText]);
    settingsButton.setSize(200, 60);
    settingsButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        settingsBg.fillColor = 0x333333;
        settingsText.setScale(1.1);
      })
      .on('pointerout', () => {
        settingsBg.fillColor = 0x444444;
        settingsText.setScale(1);
      });
    
    // Animate background
    this.tweens.add({
      targets: bg,
      tilePositionY: '-=1000',
      duration: 20000,
      repeat: -1,
      ease: 'Linear'
    });
    
    // Start background music
    if (!this.sound.get('music')) {
      this.sound.play('music', { loop: true, volume: 0.5 });
    }
  }
}