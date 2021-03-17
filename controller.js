let lastPressed;
let keyRel;

let isLeft;
let isRight;
let isJumping;
let isFalling;

let scrollPosX;
let scrollPosX2;

function keyPressed() {

    // Next level logic.
    if(ufo.isReached() && key === ' ')
    {
        nextLevel();
    }
    else if((healthAmount === 0 || numOfSecs === 0) && key === ' ')
    {
        returnToStart();
    }

    if ((keyCode === 37 || key === 'a') && isOnPlatform()) {

        isLeft = !isFalling;
    }

    if ((keyCode === 39 || key === 'd') && isOnPlatform()) {

        isRight = !isFalling;
    }

    if (key === ' ' || key === 'w') {

        if (!isJumping && !checkVerticalPlatformCollision()) {

            isJumping = true
        }
    }
}


function keyReleased() {

    if (keyCode === 37 || key === 'a') {

        isLeft = false;
        lastPressed = 'Left';
        keyRel = true;
    }

    if (keyCode === 39 || key === 'd') {

        isRight = false;
        lastPressed = 'Right';
        keyRel = true;
    }
}
