/**
 * Draws the powerups that a player can take
 * Child of Drawable
 */
class PowerUpDrawable extends Drawable{
    constructor(x, y, image, powerUpText) {
        super(x, y, image);
        this.alive = false;
        this.pickedUp = false;
        this.powerUpText = powerUpText;
    }

    /**
     * Content determines what powerup is displayed and where at what speed will have
     */
    spawn(x, y, speedX, speedY, contents) {
        this.x = x;
        this.y = y - this.height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alive = true;
        this.health = 0;
        this.contents = contents;
        this.image = this.contents.powerUpImage;
        this.width = this.image.width;
        this.height = this.image.height;
    };

    /**
     * move for powerup
     */
    step() {
        this.move();
        this.draw();
        if (this.alive) {
            this.objectLogic();
        }
        return !this.alive;
    };

    move() {
        this.y += this.speedY;
        this.x += this.speedX;
    };

    draw() {
        this.drawImage(this.image);
        if (this.y >= this.canvasHeight || this.x > this.canvasWidth) {
            this.alive = false;
        } else {
            this.drawImage(this.image);
        }
    };

    objectLogic() {
        if (this.pickedUp) {
            this.alive = false;
            this.clear();
        }
    };

    /**
     * reset values for powerup
     */
    clear() {
        this.alive = false;
        this.pickedUp = false;
    }
}