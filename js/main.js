/**
 * Controler for game
 */
class Controller{
    constructor() {
        this.playerScore = 0;
        this.initialized = false;
    }

    init() {
        this.initHtmlElements();

        if (this.backgroundCanvas.getContext) {
            this.background = new Background(0, 0, ImageStorage.background);
            this.backgroundPlanet = new Background(0, -150, ImageStorage.planet1);
            this.backgroundPlanet.speedY = 0.2;

            this.setCanvas();
            this.initPlayer();
            this.initLevels();
            PowerUpStorage.init();
            ObjectPools.init();
            this.initialized = true;
        }
    };


    initHtmlElements() {
        this.backgroundCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        this.scoreTable = document.getElementById('scoreTable');
        this.nextLevel = document.getElementById('nextLevel');
        this.health = document.getElementById('health');
        this.healthBar = document.getElementById('healthBar');
        this.score = document.getElementById('score');
        this.informationTable = document.getElementById('informationTable');
        this.playAgain = document.getElementById('playAgain');
    }

    setCanvas() {
        this.backgroundContext = this.backgroundCanvas.getContext('2d');
        this.shipContext = this.shipCanvas.getContext('2d');
        this.mainContext = this.mainCanvas.getContext('2d');

        this.background.context = this.backgroundContext;
        this.background.canvasWidth = this.backgroundCanvas.width;
        this.background.canvasHeight = this.backgroundCanvas.height;
        this.backgroundPlanet.context = this.backgroundContext;
        this.backgroundPlanet.canvasWidth = this.backgroundCanvas.width;
        this.backgroundPlanet.canvasHeight = this.backgroundCanvas.height;
    }

    initLevels() {
        this.level1 = new Level1();
        this.level2 = new Level2();
        this.level3 = new Level3();
    }

    /**
     * start game
     */
    start() {
        this.currentLevel = this.level1;
        this.player.draw();
        this.currentLevel.start();
        this.displayGame();
        animate();
    }

    /**
     * game over
     */
    gameOver() {
        this.currentLevel.stop();
        console.log("Game over.");
        SoundStorage.gameOverSound.currentTime = 0;
        SoundStorage.gameOverSound.play();
        this.checkHighscore();
        this.displayInformation(false);
    }

    /**
     * reset game (play again)
     */
    restart() {
        SoundStorage.gameOverSound.pause();
        console.log("Restarting game.");
        this.currentLevel = this.level1;
        this.clearCanvas();
        this.displayGame();
        this.initPlayer();
        ObjectPools.init();
        this.playerScore = 0;
        this.start();
    }

    /**
     * change level
     */
    changeLevel(level) {
        this.currentLevel = level;
        this.currentLevel.start();
    }

    clearCanvas() {
        this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.background.reset(0, 0, 0, 0);
        this.backgroundPlanet.reset(0, -150, 0.1, 0.05);
    }

    initPlayer() {
        let shipStartX = this.shipCanvas.width / 2 - ImageStorage.playerShip.width / 2;
        let shipStartY = this.shipCanvas.height / 4 * 2 + ImageStorage.playerShip.height * 2;
        let shotPool = new ObjectPool(50);
        shotPool.init("playerWeapon");

        this.player = new Player(shipStartX, shipStartY, ImageStorage.playerShip, shotPool);
        this.player.context = this.shipContext;
        this.player.canvasWidth = this.shipCanvas.width;
        this.player.canvasHeight = this.shipCanvas.height;
    };

    checkHighscore() {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem('highscore') === null) {
                localStorage.setItem('highscore', 0);
            }
            if (this.playerScore > localStorage.highscore) {
                localStorage.setItem('highscore', this.playerScore);
            }
        }
    };

    /**
     * Showing game and game components
     */
    displayGame() {
        this.scoreTable.style.display = "block";
        this.healthBar.style.display = "block";
        this.informationTable.style.display = "none";
        this.playAgain.style.display = "none";
    }

    /**
     * Display a scorecard after a loss or win
     */
    displayInformation(isVictory) {
        if(isVictory){
            document.getElementById('informationText').innerHTML = "Victory";
            document.getElementById('playAgainText').innerHTML = "Start game again"
        }else {
            document.getElementById('informationText').innerHTML = "Game over";
            document.getElementById('playAgainText').innerHTML = "Restart game"
        }

        document.getElementById('endScore').innerHTML = this.playerScore;

        if (typeof(Storage) !== "undefined") {
            document.getElementById('highScore').innerHTML = localStorage.highscore;
        } else {
            document.getElementById('highScore').innerHTML = this.playerScore;
        }
        this.scoreTable.style.display = "none";
        this.healthBar.style.display = "none";
        this.informationTable.style.display = "block";
        this.playAgain.style.display = "block";
    }
}

/**
 * Initialize the Game and starts it.
 */
let controller = new Controller();
function init() {
    controller.init();
}
controller.ready = window.setInterval(function(){checkReadyState()}, 1000);

function checkReadyState() {
    if (SoundStorage.backgroundSound.readyState === 4 &&
        ImageStorage.ready && controller.initialized) {
        console.log("Game starting.");
        window.clearInterval(controller.ready);
        controller.start();
    }
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to optimize
 * the game loop and draws all game objects. This  function must be a
 * global function and cannot be within an object.
 */
function animate() {
    step();
    if (controller.player.health > 0) {
        requestAnimFrame(animate);
    }
    controller.background.draw();
    controller.backgroundPlanet.draw();

    controller.mainContext.clearRect(0, 0, controller.mainCanvas.width, controller.mainCanvas.height);
    controller.player.move();
    ObjectPools.animate();
}

/**
 * time tick (step)
 */
function step() {
    if (controller.currentLevel.running == false) {
        return;
    }

    controller.currentLevel.step();
    controller.score.innerHTML = controller.playerScore;
    controller.health.innerHTML = controller.player.getHealthText();

    detectCollision();

    if (controller.player.health <= 0) {
        controller.health.innerHTML = controller.player.getHealthText();
        controller.gameOver();
    }
}

/**
 * Initialize which objects can be in a collision, and what happens
 */
function detectCollision() {
    let enemy1 = controller.enemyBaseSpaceShipPool.getPool();
    let enemy2 = controller.enemyStrongSpaceShipPool.getPool();
    let enemy3 = controller.enemyFastSpaceShipPool.getPool();
    let enemy4 = controller.enemyBossSpaceShipPool.getPool();
    let powerUp = controller.weaponPool.getPool();
    let powerUp2 = controller.shieldPool.getPool();
    let playerCanKill = enemy1.concat(enemy2, enemy3, enemy4);
    let playerShots = controller.player.shotPool.getPool();

    for (let i = 0; i < playerCanKill.length; i++) {
        for (let j = 0; j < playerShots.length; j++) {
            if (isInCollision(playerCanKill[i], playerShots[j])) {
                playerCanKill[i].onHit(controller.player.weapon.damage);
            }
        }
    }

    let playerCanDestroy = enemy1.concat(enemy2, enemy3);
    for (let i = 0; i < playerCanDestroy.length; i++) {
        if (isInCollision(playerCanDestroy[i], controller.player)) {
            playerCanKill[i].onDeath();
        }
    }

    let enemiesShot = controller.enemyLaserPool.getPool();
    let enemiesCanKillPlayer = enemy1.concat(enemy2, enemy3, enemy4, enemiesShot);
    for (let i = 0; i < enemiesCanKillPlayer.length; i++) {
        if (isInCollision(enemiesCanKillPlayer[i], controller.player)) {
            controller.player.onHit(1);
        }
    }

    powerUp = powerUp.concat(powerUp2);
    for (let i = 0; i < powerUp.length; i++) {
        if (isInCollision(powerUp[i], controller.player)) {
            powerUp[i].pickedUp = true;
            controller.player.pickUp(powerUp[i]);
        }
    }
}

/**
 * To find out if objects are colliding
 */
function isInCollision(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        return true;
    }
    return false;
}

/**
 * https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();