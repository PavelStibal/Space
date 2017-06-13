/**
 * Contains data about player and his ship. Takes care of movement, death, hit logic, weapon
 * firing and key inputs.
 * Chaild of Drawable
 */
class Player extends Drawable{
    constructor(x, y, image, shotPool) {
        super(x, y, image);
        this.speed = 10;
        this.maximumHealth = 5;
        this.shotPool = shotPool;
        this.counter = 0;
        this.health = this.maximumHealth;
        this.setWeapon(PowerUpStorage.inventory["Single Shot"]);
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    };

    /**
     * pick up only power up
     */
    pickUp(powerUp) {
        powerUp.pickedUp = true;
        if (powerUp.powerUpText == 'weapon') {
            this.setWeapon(powerUp.contents);
            this.playPickUpSound();
        } else if (powerUp.powerUpText == 'shield') {
            let content = powerUp.contents;
            this.health += content.health;
            if (this.health > this.maximumHealth) {
                this.health = this.maximumHealth;
            }
            this.playPickUpSound();
        }
    };

    playPickUpSound() {
        SoundStorage.pickUpSound.currentTime = 0;
        SoundStorage.pickUpSound.play();
    };

    draw() {
        this.context.drawImage(ImageStorage.playerShip, this.x, this.y);
    };

    /**
     * move logic for player ship
     */
    move() {
        this.counter++;
        if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
            this.context.clearRect(this.x, this.y, this.width, this.height);

            if (KEY_STATUS.left) {
                this.x -= this.speed;
                if (this.x <= 0) {
                    this.x = 0;
                }
            } else if (KEY_STATUS.right) {
                this.x += this.speed;
                if (this.x >= this.canvasWidth - this.width) {
                    this.x = this.canvasWidth - this.width;                    
                }
            }
            if (KEY_STATUS.up) {
                this.y -= this.speed;
                if (this.y <= this.canvasHeight / 10) {
                    this.y = this.canvasHeight / 10;
                }
            } else if (KEY_STATUS.down) {
                this.y += this.speed;
                if (this.y >= this.canvasHeight - this.height) {
                    this.y = this.canvasHeight - this.height;
                }
            }

            if (this.health > 0) {
                this.draw();
            }
        }

        if (KEY_STATUS.space && this.counter >= this.weapon.fireRate) {
            this.weapon.fire();
            this.counter = 0;
        }
    };

    /**
     * get damage
     */
    onHit(damage) {
        this.health -= damage;
    };

    /**
     * get how many health have player
     */
    getHealthText() {
        let text = "";
        for (let i = 0; i < this.health; i++) {
            text += "♥ ";
        }
        return text;
    };
}

KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};

KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[ KEY_CODES[ code ]] = false;
}

/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
    const keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};

/**
 * Sets up the document to listen to on key up events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
    const keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};