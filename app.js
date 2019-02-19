
/* global Phaser */

class SimpleScene extends Phaser.Scene {
  preload () {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create () {
    this.add.image(400, 300, 'sky')

    this.star = this.add.image(400, 300, 'star')
    this.cursors = this.input.keyboard.createCursorKeys()

    const helloButton = this.add.text(100, 100, 'START', { fill: '#0f0' })
    helloButton.setInteractive()

    helloButton.on('pointerdown', () => {
      this.startCountDown()
    })
  }

  startCountDown () {
    this.timestamp = null
    this.time = 4000
    this.clock = this.add.text(400, 320, this.time.toString(), { fill: '#0f0' })
  }

  update (time, delta) {
    this.time -= delta
    if (this.time > 0) {
      this.clock.setText(Math.floor(this.time).toString())
    }

    if (this.cursors.space.isDown && this.timestamp == null) {
      this.timestamp = this.time
      this.add.text(400, 340, this.time.toString(), { fill: '#f00' })
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: SimpleScene
}

window.game = new Phaser.Game(config)
