import Phaser from 'phaser';

export class Road {
  private scene: Phaser.Scene;
  private roadSprite: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene, _x: number, _y: number) {
    this.scene = scene;
    
    // Create scrolling road background
    this.roadSprite = scene.add.tileSprite(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2,
      scene.cameras.main.width,
      scene.cameras.main.height,
      'road'
    );
    
    // Lane markers
    this.createLaneMarkers();
  }

  private createLaneMarkers() {
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;
    
    // Add lane lines
    const laneWidth = width / 3;
    
    for (let i = 1; i < 3; i++) {
      const x = laneWidth * i;
      
      // Create dashed line using multiple rectangles
      for (let y = -50; y < height + 50; y += 50) {
        this.scene.add.rectangle(
          x, 
          y, 
          10, 
          30, 
          0xffffff
        ).setDepth(1);
      }
    }
  }

  update(speed: number) {
    // Scroll the road based on game speed
    this.roadSprite.tilePositionY -= speed;
  }
}