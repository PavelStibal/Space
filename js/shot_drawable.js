/**
 * Render of bullets
 * Child of Drawable
 */
class ShotDrawable extends Drawable{
    constructor(x, y, image) {
        super(x, y, image);
        this.alive = false;
        this.isColliding = false;
    }

    /**
     * Where to draw and how to move quickly
     */
    spawn(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alive = true;
    };

    /**
     * Move shot
     */
    step() {
        this.move();
        this.draw();
        return !this.alive;
    };

    move() {
        this.clearImage();
        this.y += this.speedY;
        this.x += this.speedX;
    };

    draw() {
        if (this.isColliding || this.y <= 0 - this.height || this.y >= this.canvasHeight) {
            this.alive = false;
            return;
        }
        this.drawImage(this.image, 0, 0);
    };

    /**
     * reset values for shot
     */
    clear() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
        this.isColliding = false;
    };
}