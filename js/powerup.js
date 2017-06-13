/**
 * Adds a certain amount of health
 */
class Health {
    constructor(health, powerUpImage) {
        this._health = health;
        this._powerUpImage = powerUpImage;
    }

    get health() {
        return this._health;
    }

    get powerUpImage() {
        return this._powerUpImage;
    }
}

/**
 * Abstract class for all shots.
 * Here is defined for player: fireRate, speed shot, damage
 */
class Shot {
    constructor(fireRate, powerUpImage, damage) {
        this._fireRate = fireRate;
        this._speed = 12;
        this._powerUpImage = powerUpImage;
        this._damage = damage;
    }

    get fireRate() {
        return this._fireRate;
    }

    get powerUpImage() {
        return this._powerUpImage;
    }

    get damage() {
        return this._damage;
    }

    fire() {};
}

/**
 * Shoot only one bullet
 */
class SingleShot extends Shot {
    fire() {
        controller.player.shotPool.get(controller.player.x + 45, controller.player.y, 0, -this._speed);
        ObjectPools.laserSound.getSound();
    }
}

/**
 * Shoot two bullets at a time
 */
class DualShot extends Shot{
    fire() {
        controller.player.shotPool.get(controller.player.x + 38, controller.player.y, 0, -this._speed);
        controller.player.shotPool.get(controller.player.x + 52, controller.player.y, 0, -this._speed);
        ObjectPools.laserSound.getSound();
    }
}

/**
 * Shoot three bullets at a time
 */
class TripleShot extends Shot{
    fire() {
        controller.player.shotPool.get(controller.player.x + 45, controller.player.y, 0, -this._speed);
        controller.player.shotPool.get(controller.player.x - 8, controller.player.y + 15, -2, -this._speed, -0.25);
        controller.player.shotPool.get(controller.player.x + 98, controller.player.y + 15, 2, -this._speed, 0.25);
        ObjectPools.laserSound.getSound();
    };
}

/**
 * Define an object to hold all power ups for game
 */
const PowerUpStorage = new function () {
    this.init = function () {
        this.inventory = [];
        this.inventory["Single Shot"] = new SingleShot(20, ImageStorage.powerUp1, 1);
        this.inventory["Fast Shot"] = new SingleShot(15, ImageStorage.powerUp1, 1);
        this.inventory["Dual Shot"] = new DualShot(14, ImageStorage.powerUp2, 2);
        this.inventory["Triple Shot"] = new TripleShot(12, ImageStorage.powerUp3, 1);
        this.inventory["Single Health"] = new Health(1, ImageStorage.powerUp4);
        this.inventory["Dual Health"] = new Health(2, ImageStorage.powerUp5);
        this.inventory["Triple Health"] = new Health(3, ImageStorage.powerUp6);
    };

    this.init();
};