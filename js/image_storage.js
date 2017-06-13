/**
 * Define an object to hold all our images for the game so images are only ever created once.
 */
const ImageStorage = new function () {
    this.numLoaded = 0;
    this.numImages = 18;

    /**
     * load images, If all are not loaded, the method for initializing the game is not invoked
     */
    this.imageLoaded = function () {
        this.numLoaded++;
        if (this.numLoaded === this.numImages) {
            console.log("Images loaded.");
            this.ready = true;
            init();
        }
    };

    this.load = function () {
        this.loadBackground();
        this.loadPlanet();
        this.loadPlayer();
        this.loadEnemy();
        this.loadWeapon();
        this.loadPowerUps();
        this.loadEffect();
    };

    /**
     * load image for background
     */
    this.loadBackground = function () {
        this.background = new Image();
        this.background.onload = function () {
            ImageStorage.imageLoaded()

        };
        this.background.src = "resources/background/black.png";
    };

    /**
     * load images for planets
     */
    this.loadPlanet = function () {
        this.planet1 = new Image();
        this.planet1.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.planet1.src = "resources/background/planet1.png";

        this.planet2 = new Image();
        this.planet2.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.planet2.src = "resources/background/planet2.png";

        this.planet3 = new Image();
        this.planet3.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.planet3.src = "resources/background/planet3.png";
    };

    /**
     * load image for player space ship
     */
    this.loadPlayer = function () {
        this.playerShip = new Image();
        this.playerShip.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.playerShip.src = "resources/ship/playerShip.png";
    };

    /**
     * load images for enemies
     */
    this.loadEnemy = function () {
        this.enemyShip1 = new Image();
        this.enemyShip1.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.enemyShip1.src = "resources/ship/enemyShip1.png";

        this.enemyShip2 = new Image();
        this.enemyShip2.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.enemyShip2.src = "resources/ship/enemyShip2.png";

        this.enemyShip3 = new Image();
        this.enemyShip3.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.enemyShip3.src = "resources/ship/enemyShip3.png";

        this.enemyShip4 = new Image();
        this.enemyShip4.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.enemyShip4.src = "resources/ship/enemyShip4.png";
    };

    /**
     * load images for weapon (lasers)
     */
    this.loadWeapon = function () {
        this.playerWeapon = new Image();
        this.playerWeapon.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.playerWeapon.src = "resources/ship/playerWeapon.png";

        this.enemyWeapon = new Image();
        this.enemyWeapon.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.enemyWeapon.src = "resources/ship/enemyWeapon.png";

    };

    /**
     * load images for power ups
     */
    this.loadPowerUps = function () {
        this.powerUp1 = new Image();
        this.powerUp1.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp1.src = "resources/powerup/powerup1.png";

        this.powerUp2 = new Image();
        this.powerUp2.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp2.src = "resources/powerup/powerup2.png";

        this.powerUp3 = new Image();
        this.powerUp3.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp3.src = "resources/powerup/powerup3.png";

        this.powerUp4 = new Image();
        this.powerUp4.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp4.src = "resources/powerup/shield1.png";

        this.powerUp5 = new Image();
        this.powerUp5.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp5.src = "resources/powerup/shield2.png";

        this.powerUp6 = new Image();
        this.powerUp6.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.powerUp6.src = "resources/powerup/shield3.png";
    };

    /**
     * load image for explosion
     */
    this.loadEffect = function () {
        this.explosion = new Image();
        this.explosion.onload = function () {
            ImageStorage.imageLoaded()
        };
        this.explosion.src = "resources/effect/explosion.png";
    };

    this.load();
};