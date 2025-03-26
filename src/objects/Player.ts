import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private isDragging = false;
  private dragStartX = 0;
  private lanes: number[] = [];
  private currentLane = 1; // Middle lane
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private engineSound: Phaser.Sound.BaseSound | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'car');
    
    // Calculate lane positions based on screen width
    const width = scene.cameras.main.width;
    this.lanes = [width * 0.25, width * 0.5, width * 0.75];
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set up physics body
    this.setCollideWorldBounds(true);
    if (this.body) {
      this.body.setSize(60, 100);
    }
    
    // Car visuals
    this.setScale(0.8);
    this.setOrigin(0.5, 0.5);
    
    // Set initial position to middle lane
    this.x = this.lanes[this.currentLane];
    
    // Create exhaust particle effect
    this.createParticleEffect();
    
    // Set up input
    this.setupInput();
    
    // Start engine sound
    this.playEngineSound();
  }
  
  private createParticleEffect(): void {
    try {
      // Skip particles entirely to avoid compatibility issues
      console.log('Particle effects disabled for compatibility');
      this.emitter = null;
    } catch (error) {
      console.error('Error creating particle effect:', error);
    }
  }

  private playEngineSound(): void {
    try {
      // Try to play sound directly first
      this.engineSound = this.scene.sound.add('engine', { 
        loop: true, 
        volume: 0.3 
      });
      
      if (this.engineSound) {
        this.engineSound.play();
      } else {
        console.warn('Engine sound not found');
      }
    } catch (error) {
      console.error('Error playing engine sound:', error);
    }
  }

  private setupInput(): void {
    // Add touch/mouse controls
    this.setInteractive();
    
    this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.isDragging = true;
      this.dragStartX = pointer.x;
    });
    
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.isDragging) return;
      
      const dragDistance = pointer.x - this.dragStartX;
      const dragThreshold = 40; // Reduced threshold for more responsive controls
      
      if (dragDistance < -dragThreshold && this.currentLane > 0) {
        // Move left
        this.currentLane--;
        this.moveToLane(this.currentLane);
        this.dragStartX = pointer.x;
      } else if (dragDistance > dragThreshold && this.currentLane < 2) {
        // Move right
        this.currentLane++;
        this.moveToLane(this.currentLane);
        this.dragStartX = pointer.x;
      }
    });
    
    this.scene.input.on('pointerup', () => {
      this.isDragging = false;
    });
    
    // Add keyboard controls
    const keyboard = this.scene.input.keyboard;
    if (keyboard) {
      keyboard.on('keydown-LEFT', () => {
        if (this.currentLane > 0) {
          this.currentLane--;
          this.moveToLane(this.currentLane);
        }
      });
      
      keyboard.on('keydown-RIGHT', () => {
        if (this.currentLane < 2) {
          this.currentLane++;
          this.moveToLane(this.currentLane);
        }
      });
    }
  }

  private moveToLane(laneIndex: number): void {
    this.scene.tweens.add({
      targets: this,
      x: this.lanes[laneIndex],
      duration: 200,
      ease: 'Power2'
    });
  }

  // Combined update method
  update(): void {
    // Particles are disabled, but keep the emitter code for future use
    if (this.emitter && !this.emitter.follow) {
      this.emitter.startFollow(this, 0, 30);
    }
  }

  destroy(fromScene?: boolean): void {
    // Clean up resources
    if (this.engineSound) {
      this.engineSound.stop();
    }
    
    if (this.emitter) {
      this.emitter.stop();
    }
    
    super.destroy(fromScene);
  }
}