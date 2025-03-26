import Phaser from 'phaser';

export class GameUIScene extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;
  private speedText!: Phaser.GameObjects.Text;
  private pauseButton!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'GameUIScene', active: false });
  }

  create() {
    const { width } = this.cameras.main;
  
    // Create UI panel at the top
    this.add.rectangle(
      width / 2,
      30,
      width, 
      60,
      0x000000, 
      0.7
    ).setOrigin(0.5, 0.5);
    
    // Score display
    this.scoreText = this.add.text(20, 20, 'SCORE: 0', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    });
    
    // Speed display
    this.speedText = this.add.text(width - 150, 20, 'SPEED: 5', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    });
    
    // Pause button
    this.pauseButton = this.add.container(width / 2, 30);
    
    const pauseBg = this.add.circle(0, 0, 20, 0xffffff, 0.3);
    const pauseIcon = this.add.rectangle(0, 0, 5, 15, 0xffffff).setOrigin(0.5);
    const pauseIcon2 = this.add.rectangle(10, 0, 5, 15, 0xffffff).setOrigin(0.5);
    
    this.pauseButton.add([pauseBg, pauseIcon, pauseIcon2]);
    this.pauseButton.setSize(40, 40);
    this.pauseButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => pauseBg.setFillStyle(0xffffff, 0.5))
      .on('pointerout', () => pauseBg.setFillStyle(0xffffff, 0.3))
      .on('pointerdown', () => {
        this.scene.pause('GameScene');
        this.scene.launch('PauseScene');
      });
    
    // Listen for score updates from game scene
    const gameScene = this.scene.get('GameScene');
    gameScene.events.on('scoreUpdate', (score: number) => {
      this.scoreText.setText(`SCORE: ${score}`);
    });
    
    // Update speed display when speed changes
    gameScene.events.on('speedUpdate', (speed: number) => {
      this.speedText.setText(`SPEED: ${speed}`);
    });
  }
}