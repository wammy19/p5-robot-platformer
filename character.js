let velocity = 7;
let gravityAmount = 12;

let startPlatform = 3;

let robotResize = 0.1;

let scrollPosAmount1 = 8;
let scrollPosAmount2 = 1;

let jumpI = 0;

let robot;
let frontFacing;
let walkingRight;
let jumpingRight;
let walkingLeft;
let jumpingLeft;
let jumpingFrontArray = [];

let angle = 0;
let angleRobot = 0;

let bobbing;
let bobbingRobot;

let healthX = [];
let health = [];
let healthAmount = 3;

class Robot {

    constructor() {

        this.position = createVector(platform[startPlatform].x + 50, floorPos_y);
        this.velocity = createVector(velocity, 0);
        this.acc = createVector(0, 0);
        this.gravity = createVector(0, gravityAmount);
        this.slideForce = 1.99;
        this.floorAdjustment = 0;
        this.animationSpeed = 8;

        this.x = this.position.x - scrollPosX;
    }

    update() {

        this.velocity.add(this.acc);

        checkVerticalPlatformCollision();

        if (platformCollision) {

            isLeft = false;
            isRight = false;
            isJumping = false;
            isFalling = true;
        }

        if (isFalling) {

            this.gravity.set(0, -10);
            this.position.sub(this.gravity);
            this.gravity.add(0, -0.8);

            if (this.position.y >= floorPos_y && isOnPlatform()) {

                isFalling = false;
                this.position.y = floorPos_y - this.floorAdjustment;
                this.gravity.set(0, gravityAmount)
            }
        }

        if (isLeft) {

            if (this.position.x > width * 0.45) {

                this.position.sub(this.velocity);
            }

            else {

                scrollPosX += scrollPosAmount1;
                scrollPosX2 += scrollPosAmount2;
            }
        }

        if (keyRel && lastPressed === 'Left') {

            if (this.velocity.x > 0) {

                this.position.sub(this.velocity, 0);
                this.velocity.sub(this.slideForce, 0);
            }

            else {

                keyRel = false;
                this.velocity.set(velocity, 0);
            }
        }

        if (isRight) {

            if (this.position.x < width * 0.3) {

                this.position.add(this.velocity);
            }

            else {

                scrollPosX -= scrollPosAmount1;
                scrollPosX2 -= scrollPosAmount2;
            }
        }

        if (keyRel && lastPressed === 'Right') {

            if(this.velocity.x > 0) {

                this.position.add(this.velocity, 0);
                this.velocity.sub(this.slideForce, 0);
            }

            else {

                keyRel = false;
                this.velocity.set(velocity, 0);
            }
        }

        if (isJumping) {

            this.position.sub(this.gravity);
            this.gravity.add(0, -0.6);

            if (this.position.y >= floorPos_y && isOnPlatform()) {

                jumpI = 0;
                isJumping = false;
                this.position.y = floorPos_y - this.floorAdjustment;
                this.gravity.set(0, gravityAmount)
            }
        }

        this.x = this.position.x - scrollPosX;
    }


    show() {

        // Check for Game Over.
        if (healthAmount < 1 || numOfSecs === 0) {

            return;
        }

        // End Game.
        if (ufo.isReached()) {

            isLeft = false;
            isRight = false;

            push();
            translate(this.position.x, this.position.y);

            scale(robotResize);
            robotResize -= 0.002;

            imageMode(CENTER);

            image(endGame, 0, 0);

            pop();

            angleRobot += 5;
        }
        else if (isJumping && isLeft) {

            // Jumping Left/
            push();
            translate(this.position.x, this.position.y);

            imageMode(CENTER);
            scale(0.08);
            image(jumpingLeft, 0, 0);

            pop();

        }
        else if (isLeft) {

            // Walking Left.
            push();
            translate(this.position.x, this.position.y);

            imageMode(CENTER);
            scale(0.08);

            image(walkingLeft, 0, 0);

            pop();
        }
        else if (isJumping && isRight) {

            // Jumping Right.
            push();
            translate(this.position.x, this.position.y);

            imageMode(CENTER);
            scale(0.08);
            image(jumpingRight, 0, 0);

            pop();

        }
        else if (isRight) {

            // Walking right.
            push();
            translate(this.position.x, this.position.y);

            imageMode(CENTER);
            scale(0.08);

            image(walkingRight, 0, 0);

            pop();
        }
        else if (isJumping) {

            // Jumping Front Facing.
            push();
            translate(this.position.x, this.position.y);

            imageMode(CENTER);
            scale(0.08);

            if (jumpI > jumpingFrontArray.length) {

                jumpI = 0;
            }

            let index = floor(jumpI % this.animationSpeed);
            image(jumpingFrontArray[index], 0, 0);

            jumpI += 0.17;

            pop();
        }
        else {

            // Front Facing
            bobbingRobot = map(sin(angleRobot), 0, 50, 0, 90);

            push();
            translate(this.position.x, this.position.y + bobbingRobot);

            imageMode(CENTER);
            scale(0.08);
            image(frontFacing, 0, 0);
            pop();

            angleRobot += 5;
        }
    }
}
