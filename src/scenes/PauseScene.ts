import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super('PauseScene');
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Semi-transparent overlay
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0);
    
    // Pause text
    this.add.text(
      width / 2, 
      height / 3, 
      'PAUSED', 
      {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6
      }
    ).setOrigin(0.5);
    
    // Resume button
    const resumeButton = this.add.container(width / 2, height / 2);
    
    const buttonBg = this.add.rectangle(0, 0, 200, 60, 0x00aaff, 1)
      .setStrokeStyle(2, 0xffffff);
    
    const buttonText = this.add.text(0, 0, 'RESUME', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    resumeButton.add([buttonBg, buttonText]);
    resumeButton.setSize(200, 60);
    resumeButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        buttonBg.fillColor = 0x0088cc;
      })
      .on('pointerout', () => {
        buttonBg.fillColor = 0x00aaff;
      })
      .on('pointerdown', () => {
        this.scene.resume('GameScene');
        this.scene.stop();
      });
    
    // Main menu button
    const menuButton = this.add.container(width / 2, height / 2 + 80);
    
    const menuBg = this.add.rectangle(0, 0, 200, 60, 0x444444, 1)
      .setStrokeStyle(2, 0xffffff);
    
    const menuText = this.add.text(0, 0, 'MAIN MENU', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    menuButton.add([menuBg, menuText]);
    menuButton.setSize(200, 60);
    menuButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        menuBg.fillColor = 0x333333;
      })
      .on('pointerout', () => {
        menuBg.fillColor = 0x444444;
      })
      .on('pointerdown', () => {
        this.scene.stop();
        this.scene.stop('GameScene');
        this.scene.stop('GameUIScene');
        this.scene.start('MenuScene');
      });
    
// Listen for escape key to resume
this.input.keyboard?.once('keydown-ESC', () => {
  this.scene.resume('GameScene');
  this.scene.stop();
});
  }
}