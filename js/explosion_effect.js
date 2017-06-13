/**
 * Create an explosion effect. Child Drawable
 */
class ExplosionEffect extends Drawable{
    constructor(x, y, image) {
        super(x, y, image);
        this.offsetX = 100;
        this.offsetY = 100;
        this.rows = 7;
        this.columns = 6;
        this.animationSpeed = 1;
    }

    /**
     * sets Where and how much speed it will have
     */
    spawn(x, y, speedX, speedY, origin) {
        this.x = x;
        this.y = y;
        this.height = origin.height;
        this.width = origin.width;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alive = true;
        this.timer = 0;
        this.T = Date.now();
        this.stepX = 0;
        this.stepY = 0;
    };

    /**
     * Move object
     * The method is used move, drqw, objectLogic
     */
    step() {
        this.draw();
        return !this.alive;
    }

    draw() {
        this.t = Date.now();
        this.timer += (this.t - this.T) * this.animationSpeed;
        this.T = this.t;
        if(this.timer > 20) {

            this.stepX += 1;
            if (this.stepX == this.columns) {
                this.stepX = 0;
                this.stepY += 1;
            }
            if (this.stepY > this.rows) {
                this.alive = false;
            }
            this.timer = 0;
        }
        this.context.drawImage(this.image, this.offsetX * this.stepX, this.offsetY * this.stepY, this.offsetX, this.offsetY, this.x, this.y, this.width, this.height);
    }

    /**
     * Resets the values
     */
    clear() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
    };
}