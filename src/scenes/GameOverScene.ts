import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create(data: { score: number }) {
    const { width, height } = this.cameras.main;
    
    // Semi-transparent overlay
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0);
    
    // Game over text with animation
    const gameOverText = this.add.text(
      width / 2, 
      height / 3, 
      'GAME OVER', 
      {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000',
        stroke: '#000000',
        strokeThickness: 8
      }
    ).setOrigin(0.5).setAlpha(0);
    
    // Score display
    const scoreText = this.add.text(
      width / 2,
      height / 2,
      `SCORE: ${data.score}`,
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff'
      }
    ).setOrigin(0.5).setAlpha(0);
    
    // Restart button
    const restartButton = this.add.container(width / 2, height * 2/3).setAlpha(0);
    
    const buttonBg = this.add.rectangle(0, 0, 200, 60, 0x00aaff, 1)
      .setStrokeStyle(2, 0xffffff);
    
    const buttonText = this.add.text(0, 0, 'PLAY AGAIN', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    restartButton.add([buttonBg, buttonText]);
    restartButton.setSize(200, 60);
    restartButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        buttonBg.fillColor = 0x0088cc;
      })
      .on('pointerout', () => {
        buttonBg.fillColor = 0x00aaff;
      })
      .on('pointerdown', () => {
        this.scene.stop();
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
        this.scene.start('GameUIScene');
      });
    
    // Main menu button
    const menuButton = this.add.container(width / 2, height * 2/3 + 80).setAlpha(0);
    
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
    
    // Animations
    this.tweens.add({
      targets: gameOverText,
      alpha: 1,
      y: height / 3 - 10,
      duration: 1000,
      ease: 'Bounce.Out',
      delay: 200
    });
    
    this.tweens.add({
      targets: scoreText,
      alpha: 1,
      duration: 800,
      delay: 1000
    });
    
    this.tweens.add({
      targets: [restartButton, menuButton],
      alpha: 1,
      duration: 800,
      delay: 1500
    });
  }
}