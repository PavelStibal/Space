/**
 * Each level contains list of object. Index of this list represents time at which the object
 * inside the list is supposed to spawn. Level could be changes with the chanageLevel method.
 * Level is paranet all Levels, which have some number. In children Level is defined, when
 * object will be spown.
 */
class Level {
    constructor(){
        this.running = false;
        this.changeTime = 0;
        this.music = SoundStorage.backgroundSound;
        this.time = 0;
    }

    /**
     * start level
     */
    start() {
        this.loadSpawnPoints();
        this.time = 0;
        if (this.music.paused) {
            this.music.currentTime = 0;
            this.music.volume = SoundStorage.volume;
            this.music.play();
        }
        this.running = true;
    };

    /**
     * stop level
     */
    stop() {
        this.music.pause();
        this.running = false;
    };

    /**
     * create steps for level
     */
    step() {
        if (this.running) {
            this.time += 1;
            if (this.time % 10 == 0) {
                this.spawn(this.time / 10);
            }
        }
    };

    spawnObject(object) {
        object.pool.get(object.x, object.y, object.speedX, object.speedY, object.item);
    };

    getRandomIntegerNumber(minimum, maximum){
        return Math.round(minimum + Math.random() * maximum);
    }

    /**
     * Abstrast methods
     * spawn method: When could be object spawn
     * loadSpawn method: initialization, when will be onject spawn
     */
    spawn() {};
    loadSpawnPoints() {};
}

function ObjectSpawn(pool, x, y, speedX, speedY, item) {

    this.pool = pool;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.item = item;
}

class Level1 extends Level{
    constructor() {
        super();
        this.objectList = {};
        this.changeTime = 400;
    }

    loadSpawnPoints() {
        this.objectList[10] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 150),
            0, -0.1, 1);
        this.objectList[15] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(350, 450),
            0, 0.3, 1.1);

        this.objectList[40] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 50),
            0, 0.5, 1);
        this.objectList[45] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(100, 250),
            0, 0, 2);
        this.objectList[50] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(400, 550),
            0, -0.5, 1.5);
        this.objectList[60] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(150, 350),
            0, 0.2, 2);
        this.objectList[65] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700),
            0, -0.75, 1);


        this.objectList[90] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 100),
            0, 0.1, 2);
        this.objectList[95] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(300, 450),
            0, 0.1, 2);
        this.objectList[98] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 250),
            0, 0, 2);
        this.objectList[100] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 300),
            0, 0.5, 2);
        this.objectList[105] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 550),
            0, 0,1, 1.5);
        this.objectList[107] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700),
            0, 0, 2);
        this.objectList[110] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 350),
            0, 0.2, 1.75);


        this.objectList[125] = new ObjectSpawn(
            controller.weaponPool, this.getRandomIntegerNumber(0, 650),
            0, 0, 1.25, PowerUpStorage.inventory["Fast Shot"]);
        this.objectList[150] = new ObjectSpawn(
            controller.shieldPool, this.getRandomIntegerNumber(0, 650),
            0, 0, 1, PowerUpStorage.inventory["Single Health"]);
        this.objectList[175] = new ObjectSpawn(
            controller.shieldPool, this.getRandomIntegerNumber(0,700),
            0, 0, 1.5, PowerUpStorage.inventory["Single Health"]);


        this.objectList[200] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(150, 350),
            0, 0.2, 2);
        this.objectList[205] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700),
            0, -0.75, 1);
        this.objectList[210] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 100),
            0, 0.1, 2);
        this.objectList[215] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(300, 450),
            0, 0.1, 2);
        this.objectList[220] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 250),
            0, 0, 2);
        this.objectList[222] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 300),
            0, 0.5, 2);
        this.objectList[227] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 550),
            0, 0,1, 1.5);
        this.objectList[230] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700),
            0, 0, 2);
        this.objectList[240] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 350),
            0, 0.2, 1.75);


        this.objectList[270] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 550),
            0, 0,1, 1.5);
        this.objectList[275] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700),
            0, 0, 2);
        this.objectList[280] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 350),
            0, 0.2, 1.75);

        this.objectList[290] = new ObjectSpawn(
            controller.shieldPool, this.getRandomIntegerNumber(0, 650),
            0, 0, 1, PowerUpStorage.inventory["Single Health"]);

        this.objectList[315] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(300, 450),
            0, 0.1, 2);
        this.objectList[320] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 250),
            0, 0, 2);
        this.objectList[325] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 300),
            0, 0.5, 2);
        this.objectList[335] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 550),
            0, 0,1, 1.5);

    }

    spawn(time) {
        if (typeof this.objectList[time] == 'object') {
            this.spawnObject(this.objectList[time]);
        }

        if (time == this.changeTime) {
            controller.nextLevel.style.display = "block";
            controller.nextLevel.innerHTML = "Level 2";
        }  else if (time == (this.changeTime + 15)) {
            controller.nextLevel.style.display = "none";
            controller.backgroundPlanet.image = ImageStorage.planet2;
            controller.backgroundPlanet.y = -200;
            controller.backgroundPlanet.x = 15;
            controller.changeLevel(controller.level2);
        }
    }
}

class Level2 extends Level{
    constructor() {
        super();
        this.objectList = {};
        this.changeTime = 500;
    }


    loadSpawnPoints() {

        this.objectList[9] = new ObjectSpawn(
            controller.weaponPool, this.getRandomIntegerNumber(0, 690),
            0, 0, 2, PowerUpStorage.inventory["Fast Shot"]);

        this.objectList[20] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 100), 0, 0, 3);
        this.objectList[25] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(400, 600), 0, 0, 3);

        this.objectList[35] = new ObjectSpawn(
            controller.shieldPool, this.getRandomIntegerNumber(0, 690),
            0, 0, 2, PowerUpStorage.inventory["Dual Health"]);

        this.objectList[45] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 400), 0, 0, 3);
        this.objectList[55] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 200), 0, 0, 3);

        this.objectList[70] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 50), 0, 0, 3);
        this.objectList[75] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(100, 200), 0, 0, 3);
        this.objectList[80] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(300, 400), 0, 0, 3);
        this.objectList[85] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(350, 500), 0, 0, 3);

        this.objectList[100] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(0, 100), 0, 0, 3);
        this.objectList[105] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(100, 200), 0, 0, 3);
        this.objectList[110] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(200, 300), 0, 0, 3);
        this.objectList[115] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(300, 400), 0, 0, 3);
        this.objectList[120] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(400, 500), 0, 0, 3);
        this.objectList[125] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(500, 600), 0, 0, 3);
        this.objectList[130] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(600, 700), 0, 0, 3);


        this.objectList[150] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 2, 2);
        this.objectList[155] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 2, 2);
        this.objectList[160] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 2, 2);
        this.objectList[165] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 2, 2);
        this.objectList[170] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 2, 2);

        this.objectList[190] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -2, 2);
        this.objectList[195] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -2, 2);
        this.objectList[200] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -2, 2);
        this.objectList[205] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -2, 2);
        this.objectList[210] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -2, 2);

        this.objectList[220] = new ObjectSpawn(controller.shieldPool,
            this.getRandomIntegerNumber(50, 680), 0, 0.2, 2, PowerUpStorage.inventory["Dual Health"]);
        this.objectList[230] = new ObjectSpawn(controller.weaponPool,
            this.getRandomIntegerNumber(0, 700), 0, -0.2, 2, PowerUpStorage.inventory["Dual Shot"]);

        this.objectList[260] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[265] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[270] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[275] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[280] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[285] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[290] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[295] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[300] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[305] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);

        this.objectList[330] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[335] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[340] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[345] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[350] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[355] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[360] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[365] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[370] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[375] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);

        this.objectList[390] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(100, 500), 0, 1, 3);

        this.objectList[400] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(5, 60), 0, 0, 3);
        this.objectList[402] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(150, 550), 0, 0, 3);
        this.objectList[404] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[406] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[408] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[410] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[414] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[418] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[422] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[428] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[434] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[440] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);
        this.objectList[450] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 3);


        this.objectList[470] = new ObjectSpawn(controller.weaponPool,
            this.getRandomIntegerNumber(50, 650), 0, -0.5, 1.8, PowerUpStorage.inventory["Dual Shot"]);
        this.objectList[475] = new ObjectSpawn(controller.shieldPool,
            this.getRandomIntegerNumber(50, 650), 0, 0.1, 2.2, PowerUpStorage.inventory["Dual Health"]);
    }

    spawn(time) {
        if (typeof this.objectList[time] == 'object') {
            this.spawnObject(this.objectList[time]);
        }
        if (time == this.changeTime) {
            controller.nextLevel.style.display = "block";
            controller.nextLevel.innerHTML = "Level 3";
        } else if (time == this.changeTime + 15) {
            controller.nextLevel.style.display = "none";
            controller.backgroundPlanet.image = ImageStorage.planet3;
            controller.backgroundPlanet.y = -350;
            controller.backgroundPlanet.x = -25;
            controller.changeLevel(controller.level3);
        }
    }
}

class Level3 extends Level{
    constructor() {
        super();
        this.objectList = {};
        this.bossFightStart = 650;
        this.bossAlive = false;
        this.victory = false;
    }

    loadSpawnPoints() {
        this.bossAlive = false;
        this.victory = false;

        this.objectList[15] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -1, 3);
        this.objectList[20] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -1, 3);
        this.objectList[25] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -1, 3);
        this.objectList[30] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, -1, 3);

        this.objectList[17] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(120, 320), 0, 1, 0.5);
        this.objectList[23] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.7, 1.6);
        this.objectList[28] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.9, 0.8);
        this.objectList[31] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);

        this.objectList[45] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 1, 3);
        this.objectList[48] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 1, 3);
        this.objectList[51] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 1, 3);
        this.objectList[54] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 1, 3);
        this.objectList[58] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 1, 3);

        this.objectList[70] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 0, 3);
        this.objectList[73] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 150, 0, 0, 3);
        this.objectList[76] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 350, 0, 0, 3);
        this.objectList[79] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 550, 0, 0, 3);
        this.objectList[82] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 0, 3);
        this.objectList[85] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 150, 0, 0, 3);


        this.objectList[90] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[92] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[94] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[96] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);


        this.objectList[110] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 2);
        this.objectList[115] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 2, 2);
        this.objectList[120] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 2);


        this.objectList[150] = new ObjectSpawn(controller.shieldPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2.2, PowerUpStorage.inventory["Triple Health"]);
        this.objectList[155] = new ObjectSpawn(controller.weaponPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 1.8, PowerUpStorage.inventory["Triple Shot"]);

        this.objectList[180] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[190] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[195] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[200] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[180] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[190] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[195] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);
        this.objectList[200] = new ObjectSpawn(
            controller.enemyBaseSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2);


        this.objectList[210] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 2);
        this.objectList[215] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 2, 2);
        this.objectList[220] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 2);


        this.objectList[225] = new ObjectSpawn(controller.shieldPool,
            this.getRandomIntegerNumber(50, 650), 0, 0, 2.2,
            PowerUpStorage.inventory["Single Health"]);

        this.objectList[230] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);
        this.objectList[232] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, 0, 2.8);
        this.objectList[234] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);
        this.objectList[236] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, 0, 2.8);
        this.objectList[238] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);
        this.objectList[240] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, 0, 2.8);
        this.objectList[242] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);
        this.objectList[244] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, 0, 2.8);
        this.objectList[246] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);
        this.objectList[248] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 600, 0, 0, 2.8);
        this.objectList[250] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 100, 0, 0, 2.8);

        this.objectList[250] = new ObjectSpawn(controller.weaponPool, 600, 0, -0.5, 1.8,
            PowerUpStorage.inventory["Triple Shot"]);


        this.objectList[300] = new ObjectSpawn(
            controller.enemyStrongSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 2);


        this.objectList[320] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[322] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[324] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[326] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[328] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[330] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[332] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[334] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[336] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[340] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[344] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[348] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[352] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);
        this.objectList[356] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 650, 0, -2, 2);
        this.objectList[360] = new ObjectSpawn(controller.enemyBaseSpaceShipPool, 50, 0, 2, 2);

        this.objectList[380] = new ObjectSpawn(controller.shieldPool, this.getRandomIntegerNumber(50, 650),
            0, 0.25, 2.5, PowerUpStorage.inventory["Dual Health"]);

        this.objectList[430] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 0, 0, 4, 5);
        this.objectList[440] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 0, 0, 4, 5);
        this.objectList[450] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 700, 0, -4, 5);
        this.objectList[455] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 700, 0, -4, 5);
        this.objectList[460] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 0, 0, 5, 3);
        this.objectList[465] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 700, 0, -4, 5);
        this.objectList[470] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 700, 0, -5, 3);
        this.objectList[480] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 0, 0, 5, 3);
        this.objectList[490] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 700, 0, -5, 3);

        this.objectList[520] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 50, 0, 2, 5);
        this.objectList[525] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 650, 0, -2, 5);

        this.objectList[550] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 50, 0, 2, 6);
        this.objectList[555] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 650, 0, -2, 5);
        this.objectList[560] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 250, 0, 2, 5);
        this.objectList[565] = new ObjectSpawn(controller.enemyFastSpaceShipPool, 450, 0, -2, 5);

        this.objectList[580] = new ObjectSpawn(controller.shieldPool, this.getRandomIntegerNumber(50, 650),
            0, 0, 2, PowerUpStorage.inventory["Triple Health"]);

        this.objectList[this.bossFightStart] = new ObjectSpawn(controller.enemyBossSpaceShipPool,
            this.getRandomIntegerNumber(50, 650), 0, 1.5, 1.5);
    }

    spawn(time) {
        if (typeof this.objectList[time] == 'object') {
            this.spawnObject(this.objectList[time]);
        }
        if (time == this.bossFightStart) {
            this.bossAlive = true;
        }

        if (this.bossAlive) {
            if (time % 50 == 0) {
                this.spawnObject(new ObjectSpawn(controller.enemyFastSpaceShipPool, 50, 0, 2, 5));
                this.spawnObject(new ObjectSpawn(controller.enemyFastSpaceShipPool, 650, 0, -2, 5));
            }

            if (time % 65 == 0) {
                this.spawnObject(new ObjectSpawn(controller.enemyStrongSpaceShipPool,
                    this.getRandomIntegerNumber(50, 650), 200, 2, 2));
            }
            if (time % 100 == 0) {
                this.spawnObject(new ObjectSpawn(controller.shieldPool,
                    this.getRandomIntegerNumber(50, 650), 0, 0, 2.75,
                    PowerUpStorage.inventory["Single Health"]));
            }
        }

        if (this.victory) {
            controller.checkHighscore();
            controller.informationTable(true);
        }
    }
}