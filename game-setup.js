let endGame;
let interval;

// Song written and recorded by myself.
let song;

let score;
let numOfSecs;

// Reading p5 documentation states that disabling friendly errors can make the program run faster.
p5.disableFriendlyErrors = true;

function preload() {

    starBackground = loadImage('smallerstars.png');
    frontFacing = loadImage('./characterImages/frontFacing3.png');
    walkingRight = loadImage('./characterImages/walkingRight.png');
    walkingLeft = loadImage('./characterImages/walkingLeft.png');
    jumpingRight = loadImage('./characterImages/jumpingRight.png');
    jumpingLeft = loadImage('./characterImages/jumpingLeft.png');
    endGame = loadImage('./characterImages/jumpingFrontFrame1.png');


    let jumpingFront1 = loadImage('./characterImages/jumpingFrontFrame1.png');
    let jumpingFront2 = loadImage('./characterImages/jumpingFrontFrame2.png');
    let jumpingFront3 = loadImage('./characterImages/jumpingFrontFrame3.png');
    let jumpingFront4 = loadImage('./characterImages/jumpingFrontFrame4.png');
    let jumpingFront5 = loadImage('./characterImages/jumpingFrontFrame5.png');
    let jumpingFront6 = loadImage('./characterImages/jumpingFrontFrame6.png');
    let jumpingFront7 = loadImage('./characterImages/jumpingFrontFrame7.png');
    let jumpingFront8 = loadImage('./characterImages/jumpingFrontFrame8.png');

    // Array contains jumping keyframes.
    jumpingFrontArray.push(jumpingFront1);
    jumpingFrontArray.push(jumpingFront2);
    jumpingFrontArray.push(jumpingFront3);
    jumpingFrontArray.push(jumpingFront4);
    jumpingFrontArray.push(jumpingFront5);
    jumpingFrontArray.push(jumpingFront6);
    jumpingFrontArray.push(jumpingFront7);
    jumpingFrontArray.push(jumpingFront8);

    song = loadSound("./audio/spaceySong.wav");
}


function setup() {

    song.setVolume(0.5);
    song.play();

    let c = createCanvas(1024, 576);
    angleMode(DEGREES);

    starBackground.loadPixels();

    score = 0;
    floorPos_y = 460;
    numOfSecs = 60;

    healthX = [width / 2 - 30 , width / 2, width / 2 + 30];

    const numOfClouds = 10;

    for (let i = 0; i < numOfClouds; i++) {

        clouds[i] = new Cloud(random(10, 3000), random(70, 233), random(0.3, 1.2), random(90, 190));
    }

    for (let i = 0; i < healthX.length; i++) {

        health[i] = new Health(healthX[i]);
    }

    startGame();

    // Defines what platform and position I collectible to be.
    let collectibleDefinition = [

        {platformNum: 0, xPos: 40},
        {platformNum: 4, xPos: 50},
        {platformNum: 5, xPos: 260},
        {platformNum: 8, xPos: 50},
        {platformNum: 12, xPos: 40},
        {platformNum: 15, xPos: 180},
        {platformNum: 15, xPos: 180},
        {platformNum: 18, xPos: 30},
        {platformNum: 22, xPos: 35},
        {platformNum: 23, xPos: 30},
    ];

    let collectibleRendering = createCollectibleArray(collectibleDefinition);

    for (let i = 0; i < collectibleRendering.length; i++) {

        collectibles[i] = { x: collectibleRendering[i].xPos, y: collectibleRendering[i].yPos };
    }

    let flowerDefinition = [

        {platformNum: 2, xPos: 20},
        {platformNum: 5, xPos: 103},
        {platformNum: 9, xPos: 30},
        {platformNum: 13, xPos: 190},
        {platformNum: 21, xPos: 30},
        {platformNum: 23, xPos: 500},
    ];

    let flowerRendering = createFlowerArray(flowerDefinition);

    for (let i = 0; i < flowerRendering.length; i++) {

        flowers[i] = { x: flowerRendering[i].xPos, y: flowerRendering[i].yPos };
    }

    let roseDefinition = [

        {platformNum: 1, xPos: -110, yPos: platform[1].height + 70},
        {platformNum: 5, xPos: 100, yPos: platform[5].height + 110},
        {platformNum: 13, xPos: 750, yPos: platform[13].height + 60},
    ];

    let roseRendering = createRoseArray(roseDefinition);

    for (let i = 0; i < roseRendering.length; i++) {

        roses[i] = { x: roseRendering[i].xPos, y: roseRendering[i].yPos };
    }

    interval = setInterval(function () {

    	numOfSecs--;

    	if (numOfSecs === 0) {

    		clearInterval(interval);
    	}

    }, 1000);
}


function startGame() {

    // Initializing variables.
    platformCollision = false;
    isFalling = false;
    isJumping = true;

    isLeft = false;
    isRight = false;

    scrollPosX = 0;
    scrollPosX2 = 0;

    pindex = startPlatform;

    const numOfStars = 5;

    for (let i = 0; i < numOfStars; i++) {

        stars[i] = new Stars(random(10, width), random(0, 300));
    }

    const platformDefinition = [

        {gap: -500, length: 70, height: 280}, //0
        {gap: 85, length: 90, height: 360}, //1
        {gap: 80, length: 200, height: 430}, //2
        {gap: 50, length: 120, height: 500}, //3
        {gap: 60, length: 90, height: 450}, //4
        {gap: 100, length: 300, height: 490}, //5
        {gap: 50, length: 90, height: 430}, //6
        {gap: 110, length: 200, height: 510}, //7
        {gap: 50, length: 90, height: 440}, //8
        {gap: 100, length: 90, height: 410}, //9
        {gap: 120, length: 90, height: 460}, //10
        {gap: 70, length: 90, height: 400}, //11
        {gap: 90, length: 70, height: 370}, //12
        {gap: 40, length: 400, height: 300}, //13
        {gap: 110, length: 200, height: 235}, //14
        {gap: 230, length: 200, height: 500}, //15
        {gap: 0, length: 60, height: 500}, //16
        {gap: 100, length: 50, height: 450}, //17
        {gap: 120, length: 50, height: 430}, //18
        {gap: 150, length: 50, height: 500}, //19
        {gap: 40, length: 45, height: 510}, //20
        {gap: 43, length: 55, height: 495}, //21
        {gap: 100, length: 53, height: 504}, //22
        {gap: 80, length: 700, height: 440} //23
    ];

    let platformRendering = createPlatformRenderingArray(platformDefinition);

    for (let i = 0; i < platformRendering.length; i++) {

        platform[i] = new Platform(platformRendering[i].xPos, platformRendering[i].width, platformRendering[i].height,
            platformRendering[i].edge1, platformRendering[i].edge2);
    }

    floorPos_y = platform[startPlatform].height - 40;

    const treeDefinition = [

        {platformNum: 2, xPos: 50},
        {platformNum: 5, xPos: 50},
        {platformNum: 5, xPos: 90},
        {platformNum: 13, xPos: 50},
        {platformNum: 13, xPos: 220},
        {platformNum: 14, xPos: 50},
        {platformNum: 23, xPos: 50},
        {platformNum: 23, xPos: 100},
        {platformNum: 23, xPos: 140},
    ];

    let treeRendering = createTreeArray(treeDefinition);

    for (let i = 0; i < treeRendering.length; i++) {

        trees[i] = new Tree(treeRendering[i].x, treeRendering[i].y);
    }

    // Assets
    flower = new Flower();
    rose = new Rose();
    bolt = new Bolt();
    mountain = new Mountain();
    ufo = new Flagpole(platform[platform.length - 1].x + 530);

    // Character
    robot = new Robot();
}