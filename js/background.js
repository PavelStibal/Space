/**
 * Creates the Background object which will become a child of the Drawable object.
 * Creates the illusion of moving by panning the image.
 */
class Background extends Drawable{
    constructor(x, y, image) {
        super(x, y, image);
    }

    reset(x, y, speedX, speedY){
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        this.y += this.speedY;
        this.x += this.speedX * Math.round(Math.random());
        this.context.drawImage(this.image, this.x, this.y);
    };
}
