
/* global Phaser io */

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
    this.socket = io()

    this.star = this.add.image(400, 300, 'star')
    this.cursors = this.input.keyboard.createCursorKeys()

    const helloButton = this.add.text(100, 100, 'START', { fill: '#0f0' })
    helloButton.setInteractive()

    helloButton.on('pointerdown', () => {
      this.startCountDown()
    })

    this.clock = this.add.text(400, 320, '', { fill: '#0f0' })
    this.result = this.add.text(400, 340, '', { fill: '#f00' })
    this.result.visible = false
    this.started = false
  }

  startCountDown () {
    this.started = true
    this.timestamp = null
    this.timeLeft = 4000
    this.clock.visible = true
    this.result.visible = false
  }

  update (time, delta) {
    if (this.started) {
      this.timeLeft -= delta
      if (this.timeLeft > 0) {
        this.clock.setText(Math.floor(this.timeLeft).toString())
      } else {
        this.clock.setText('0')
      }

      if (this.cursors.space.isDown && this.timestamp == null) {
        this.timestamp = this.timeLeft
        this.result.visible = true
        this.result.setText(this.timeLeft.toString())
      }
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
