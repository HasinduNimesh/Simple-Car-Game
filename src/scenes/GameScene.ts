import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Road } from '../objects/Road';
import { Obstacle } from '../objects/Obstacle';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private road!: Road;
  private obstacles!: Phaser.GameObjects.Group; // Added definite assignment
  private score = 0;
  private gameSpeed = 5;
  private obstacleTimer!: Phaser.Time.TimerEvent;

  constructor() {
    super('GameScene');
  }

  create(): void {
    // Reset score
    this.score = 0;
    this.gameSpeed = 5;
    
    // Create road
    this.road = new Road(this, 0, 0);
    
    // Create player car
    this.player = new Player(this, 400, 500);
    
    // Create obstacles group
    this.obstacles = this.add.group({
      classType: Obstacle,
      maxSize: 10,
      runChildUpdate: true
    });
    
    // Spawn obstacles periodically
    this.obstacleTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });
    
    // Increase game speed over time
    this.time.addEvent({
      delay: 5000,
      callback: this.increaseSpeed,
      callbackScope: this,
      loop: true
    });
    
    // Collision detection
    this.physics.add.collider(
      this.player, 
      this.obstacles, 
      this.handleCollision,
      undefined,
      this
    );
    
    // Score update timer
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.score += 1;
        this.events.emit('scoreUpdate', this.score);
      },
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    // Update road animation based on game speed
    this.road.update(this.gameSpeed);
  }

  private spawnObstacle(): void {
    const lanes = [200, 400, 600];
    const randomLane = Phaser.Math.RND.pick(lanes);
    
    const obstacle = this.obstacles.get() as Obstacle;
    if (obstacle) {
      obstacle.spawn(randomLane, -100, this.gameSpeed);
    }
  }

  private increaseSpeed(): void {
    if (this.gameSpeed < 15) {
      this.gameSpeed += 0.5;
      // Create a new timer with updated delay instead of modifying existing one
      this.obstacleTimer.destroy();
      this.obstacleTimer = this.time.addEvent({
        delay: Phaser.Math.Linear(1500, 800, this.gameSpeed / 15),
        callback: this.spawnObstacle,
        callbackScope: this,
        loop: true
      });
    }
  }

  private handleCollision(): void {
    // Play crash sound
    this.sound.play('crash');
    
    // Stop game
    this.obstacleTimer.destroy();
    
    // Shake camera
    this.cameras.main.shake(500, 0.03);
    
    // Wait a moment then show game over
    this.time.delayedCall(1000, () => {
      this.scene.pause();
      this.scene.launch('GameOverScene', { score: this.score });
    });
  }
}