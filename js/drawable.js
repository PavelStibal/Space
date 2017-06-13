/**
 * Creates the Drawable object which will be the base class for all drawable objects in the game.
 */
class Drawable{
    constructor(x, y, image){
        this.x = x;
        this.y = y;
        this.width = image.width;
        this.height = image.height;
        this.image = image;
        this.speedX = 0;
        this.speedY = 0;
        this.canvasWidth = 700;
        this.canvasHeight = 550;

    }

    clearImage() {
        this.context.clearRect(this.x, this.y, this.width, this.height);
    };

    drawImage(image) {
        this.context.drawImage(image, this.x, this.y);
    };

    /**
     * Abstract methods
     */
    draw() {};
    move() {};
}