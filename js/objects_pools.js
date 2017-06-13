/**
 * Custom object pool for all object
 */
const ObjectPools = new function() {
    let objectPools = [];
    let soundPools = [];

    this.init = function() {
        this.initObjects();
        this.initSound();
    };

    this.initObjects = function() {
        this.enemies = new ObjectPool(20);
        this.enemies.init("baseEnemy");
        objectPools[0] = this.enemies;
        controller.enemyBaseSpaceShipPool = this.enemies;

        this.enemyLaser = new ObjectPool(20);
        this.enemyLaser.init("enemyWeapon");
        objectPools[1] = this.enemyLaser;
        controller.enemyLaserPool = this.enemyLaser;

        this.enemies2 = new ObjectPool(5);
        this.enemies2.init("strongEnemy");
        objectPools[2] = this.enemies2;
        controller.enemyStrongSpaceShipPool = this.enemies2;

        this.enemies3 = new ObjectPool(5);
        this.enemies3.init("fastEnemy");
        objectPools[3] = this.enemies3;
        controller.enemyFastSpaceShipPool = this.enemies3;

        this.enemies4 = new ObjectPool(2);
        this.enemies4.init("boss");
        objectPools[4] = this.enemies4;
        controller.enemyBossSpaceShipPool = this.enemies4;

        this.weapon = new ObjectPool(5);
        this.weapon.init("weapon");
        objectPools[5] = this.weapon;
        controller.weaponPool = this.weapon;

        this.shield = new ObjectPool(5);
        this.shield.init("shield");
        objectPools[6] = this.shield;
        controller.shieldPool = this.shield;

        objectPools[7] = controller.player.shotPool;

        this.explosion = new ObjectPool(10);
        this.explosion.init("explosion");
        objectPools[8] = this.explosion;
        controller.explosionPool = this.explosion;
    };

    this.initSound = function() {
        this.laserSound = new SoundPool(10);
        this.laserSound.init("laserSound");
        soundPools[0] = this.laserSound;

        this.explosionSound = new SoundPool(10);
        this.explosionSound.init("explosionSound");
        soundPools[1] = this.explosionSound;
    };

    this.animate = function() {
        for(let i = 0; i < objectPools.length; i++) {
            objectPools[i].animate();
        }
    }
};

/**
 * image (object) pool to use for display
 */
class ObjectPool {
    constructor(size){
        this.size = size;
        this.pool = [];
    }

    init(string) {
        switch(string) {
            case "playerWeapon":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new ShotDrawable(0, 0, ImageStorage.playerWeapon);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "baseEnemy":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new EnemySpaceShip(0, 0, ImageStorage.enemyShip1, 0.007, 25, 3, 8);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "strongEnemy":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new EnemyStrongSpaceShip(0, 0, ImageStorage.enemyShip2, 0.012, 50, 16, 10)
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "fastEnemy":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new EnemySpaceShip(0, 0, ImageStorage.enemyShip3, 0.06, 75, 11, 5);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "enemyWeapon":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new ShotDrawable(0, 0, ImageStorage.enemyWeapon);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "weapon":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new PowerUpDrawable(0, 0, ImageStorage.powerUp1, "weapon");
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "shield":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new PowerUpDrawable(0, 0, ImageStorage.powerUp4, "shield");
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "explosion":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new ExplosionEffect(0, 0, ImageStorage.explosion);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
            case "boss":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = new EnemyBossSpaceShip(0, 0, ImageStorage.enemyShip4, 0.03, 1000, 300, 12);
                    this.pool[i].context = controller.mainContext;
                    this.pool[i].canvasWidth = controller.mainCanvas.width;
                    this.pool[i].canvasHeight = controller.mainCanvas.height;
                }
                break;
        }
    };

    getPool() {
        let pollObject = [];
        for (let i = 0; i < this.size; i++) {
            if (this.pool[i].alive) {
                pollObject.push(this.pool[i]);
            }
        }
        return pollObject;
    }

    /**
     * Grabs the last item in the list and initializes it and pushes it to the front of the array.
     */
    get(x, y, speedX, speedY, item) {
        if(!this.pool[this.size - 1].alive) {
            if(typeof(item) === "undefined"){
                this.pool[this.size - 1].spawn(x, y, speedX, speedY);
            } else {
                this.pool[this.size - 1].spawn(x, y, speedX, speedY, item);
            }
            this.pool.unshift(this.pool.pop());
        }
    }

    /**
     * Draws any in use shot. If a shot goes off the screen, clears it and pushes
     * it to the front of the array.
     */
    animate() {
        for (let i = 0; i < this.size; i++) {
            if (this.pool[i].alive) {
                if (this.pool[i].step()) {
                    this.pool[i].clear();
                    this.pool.push((this.pool.splice(i, 1))[0]);
                }
            }
        }
    }
}

/**
 *  Sound pool to use for the sound effects
 */
class SoundPool {
    constructor(size){
        this.size = size;
        this.pool = [];
        this.currSound = 0;
    }

    init(string) {
        switch (string) {
            case "laserSound":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = SoundStorage.getLaserSound();
                }
                break;
            case "explosionSound":
                for (let i = 0; i < this.size; i++) {
                    this.pool[i] = SoundStorage.getExplosionSound();

                }
                break;
        }
    }

    getSound() {
        if(this.pool[this.currSound].currentTime == 0 || this.pool[this.currSound].ended) {
            this.pool[this.currSound].play();
        }
        this.currSound = (this.currSound + 1) % this.size;
    };
}