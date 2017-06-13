/**
 * Define an object to hold all our sounds for the game so sounds are only ever created once.
 */
const SoundStorage = new function () {
    this.volume = 0.30;
    this.load = function () {
        this.pickUpSound = new Audio("resources/sounds/pick_up.mp3");
        this.pickUpSound.volume = this.volume - 0.25;
        this.pickUpSound.load();

        this.backgroundSound = new Audio("resources/sounds/background.mp3");
        this.backgroundSound.volume = this.volume;
        this.backgroundSound.loop = true;
        this.backgroundSound.load();

        this.gameOverSound = new Audio("resources/sounds/gameover.mp3");
        this.gameOverSound.volume = this.volume;
        this.gameOverSound.loop = true;
        this.gameOverSound.load();
    };

    this.getLaserSound = function () {
        let sound = new Audio("resources/sounds/laser.mp3");
        sound.volume = this.volume * 0.5;
        sound.load();
        return sound;
    };

    this.getExplosionSound = function () {
        let sound = new Audio("resources/sounds/explosion.mp3");
        sound.volume = this.volume - 0.1;
        sound.load();
        return sound;
    };

    this.load();
};