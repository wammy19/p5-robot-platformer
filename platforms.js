let platformCollision;
let floorPos_y;
let platform = [];
let pindex;


class Platform {

    constructor(_x, _length, _height, _edge, _edge2) {

        this.x = _x;
        this.width = _length;
        this.height = _height;
        this.edge = _edge;
        this.edge2 = _edge2;
    }

    show() {

        push();
        translate(scrollPosX, 0);

        beginShape();
        stroke(173, 149, 191);
        fill(31, 32, 57);
        vertex(this.x - 10, height);
        vertex(this.x - 20, this.edge);
        vertex(this.x, this.height);
        vertex(this.width, this.height);
        vertex(this.width + 23, this.edge2);
        vertex(this.width + 15, height);
        endShape();

        pop();
    }
}


// Function to determine if the character is on the platform and not falling.
function isOnPlatform() {

    let leeway = 30;

    if ((pindex + 1 < platform.length) && (robot.x > platform[pindex + 1].x - leeway) && (!platformCollision)) {

        pindex += 1;
        floorPos_y = platform[pindex].height - 40;
    }

    if ((pindex - 1 >= 0) && (robot.x < platform[pindex - 1].width + leeway) && (!platformCollision)) {

        pindex -= 1;
        floorPos_y = platform[pindex].height - 40;
    }

    if ((robot.x > platform[pindex].x - leeway &&
        robot.x < platform[pindex].width + leeway) ||
        robot.position.y < floorPos_y) {

        return true;
    }
}


// Function determines if the character has collided with the walls of the platforms
function checkVerticalPlatformCollision() {

    let leeway = 35;
    let verticalLeeway = 11;

    if (pindex - 1 >= 0 &&
        robot.position.y + leeway >= platform[pindex - 1].height - verticalLeeway &&
        robot.position.y <= height &&
        robot.x - 50 <=  platform[pindex - 1].width) {

        platformCollision = true;
    }

    if (pindex + 1 < platform.length &&
        robot.position.y + leeway >= platform[pindex + 1].height - verticalLeeway &&
        robot.position.y <= height &&
        robot.x + 50 >=  platform[pindex + 1].x) {

        platformCollision = true;
    }
}