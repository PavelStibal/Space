/**
 * Create the enemy space ship, which is destructive and can strike.
 * This is a child of Drawable and the parent of a Improved space ship
 */
class EnemySpaceShip extends Drawable{

    constructor(x, y, image, chanceToFire, score, maximumHealth, projectileSpeed) {
        super(x, y, image);
        this.chanceToFire = chanceToFire;
        this.score = score;
        this.alive = false;
        this.health = maximumHealth;
        this.maximumHealth = maximumHealth;
        this.isColliding = false;
        this.projectileSpeed = projectileSpeed;
    }

    /**
     * sets Where and how much speed it will have
     */
    spawn(x, y, speedX, speedY) {
        this.x = x;
        this.y = y - this.height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alive = true;
        this.health = this.maximumHealth;
    };

    /**
     * Move the enemy
     * The method is used move, drqw, objectLogic
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
        if (this.isColliding) {
            return;
        }
        if (this.y >= this.canvasHeight || this.x > this.canvasWidth) {
            this.alive = false;
        } else {
            this.drawImage(this.image);
        }
    };

    objectLogic() {
        if (Math.random() < this.chanceToFire) {
            this.fire();
        }
        if (this.isColliding) {
            this.onHit();
        }
        if (this.health < 1) {
            this.onDeath();
        }
    };

    /**
     * Get damage
     */
    onHit(damage) {
        this.isColliding = false;
        this.health -= damage;
    };

    /**
     * Destroy object
     */
    onDeath() {
        ObjectPools.explosionSound.getSound();
        ObjectPools.explosion.get(this.x, this.y, this.speedX, this.speedY, this.image);

        this.alive = false;
        controller.playerScore += this.score;
    };


    /**
     * Shoot
     */
    fire() {
        ObjectPools.enemyLaser.get(this.x + this.width/2, this.y + this.height, 0, this.projectileSpeed, 0);
        ObjectPools.laserSound.getSound();
    };


    /**
     * Resets the values
     */
    clear() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
        this.isColliding = false;
        this.health = this.maximumHealth;
    };
}

/**
 * Improved space ship
 * Stops at random Y and stays there untill destroyed.
 */
class EnemyStrongSpaceShip extends EnemySpaceShip{
    constructor(x, y, image, chanceToFire, score, maximumHealth, projectileSpeed) {
        super(x, y, image, chanceToFire, score, maximumHealth, projectileSpeed);
        this.stop = false;
        this.stopY = 50 + Math.round(Math.random() * 350);
        this.canGoingRight = true;
    }

    move() {
        if (this.stop == false) {
            this.y += this.speedY;
            if (this.y > this.stopY) {
                this.stop = true;
            }
        } else {
            if (this.x + this.width >= this.canvasWidth) {
                this.canGoingRight = false;
            }
            if (this.x <= 0) {
                this.canGoingRight = true;
            }
            if (this.canGoingRight) {
                this.x += this.speedX;
            } else {
                this.x -= this.speedX;
            }
        }
    };

    clear() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
        this.isColliding = false;
        this.stop = false;
        this.stopY = 50 + Math.round(Math.random() * 300);
        this.health = this.maximumHealth;
    };
}

/**
 * Final boss high HP, shoots two lasers at once.
 */
class EnemyBossSpaceShip extends EnemyStrongSpaceShip{

    constructor(x, y, image, chanceToFire, score, maximumHealth, projectileSpeed) {
        super(x, y, image, chanceToFire, score, maximumHealth, projectileSpeed);
        this.stopY = 5 + Math.round(Math.random() * 20);
    }

    fire() {
        ObjectPools.enemyLaser.get(this.x + this.width/2 - 52, this.y + this.height, 0, this.projectileSpeed, 0);
        ObjectPools.enemyLaser.get(this.x + this.width/2 + 52, this.y + this.height, 0, this.projectileSpeed, 0);
        ObjectPools.laserSound.getSound();
    };

    onDeath() {
        ObjectPools.explosionSound.getSound();
        ObjectPools.explosion.get(this.x, this.y, this.speedX, this.speedY, this.image);

        this.alive = false;
        controller.level3.victory = true;
        controller.level3.bossAlive = false;
        controller.playerScore += this.score;
    };
}

