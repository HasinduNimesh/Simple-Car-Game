import Phaser from 'phaser';

export class Obstacle extends Phaser.Physics.Arcade.Sprite {
  private speed = 5;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'obstacle');
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set up physics body
    this.body!.setSize(60, 60);
    
    // Visual setup
    this.setScale(0.7);
    this.setOrigin(0.5, 0.5);
    
    // Initially inactive
    this.setActive(false);
    this.setVisible(false);
  }

  spawn(x: number, y: number, speed: number) {
    this.setPosition(x, y);
    this.speed = speed;
    this.setActive(true);
    this.setVisible(true);
    
    // Add subtle rotation
    this.scene.tweens.add({
      targets: this,
      angle: Phaser.Math.Between(-20, 20),
      duration: 500
    });
  }

  update(_time: number, _delta: number) {
    // Move obstacle down the screen
    this.y += this.speed;
    
    // Remove when off screen
    if (this.y > this.scene.cameras.main.height + 100) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}