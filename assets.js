let collectibles = [];
let flowers = [];
let roses = [];
let ufo;
let clouds = [];
let mountains = [];
let mountain;
let bolt;
let flower;
let rose;
let trees = [];
let starBackground;
let stars = [];


class Tree {

    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    show() {

        push();
        translate(scrollPosX, 0);

        translate(this.x, this.y);

        stroke(137, 149, 194);
        strokeWeight(1);
        fill(0);

        rect(0, 0, 14, 90);

        stroke(2, 100, 64);
        fill(0);

        triangle(-22, 3, 42, 3, 10, -79);
        triangle(-20, -37, 42, -35, 11, -105);

        pop();
    }
}


class Cloud {

    constructor(_x, _y, _size = 1, _opacity) {

        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.opacity = _opacity;
    }

    show() {

        push();
        translate(scrollPosX2, 0);

        fill(75, 81, 111, this.opacity);
        stroke(114, 122, 167);
        strokeWeight(0.2);

        scale(this.size);

        beginShape();
        line(this.x, this.y, this.x + 209, this.y);
        vertex(this.x + 209, this.y);
        quadraticVertex(this.x + 207, this.y - 50, this.x + 152, this.y - 42);
        quadraticVertex(this.x + 102, this.y - 90, this.x + 60, this.y - 40);
        quadraticVertex(this.x + 7, this.y - 59, this.x, this.y);
        endShape();

        pop();
    }

    move() {

        this.x += this.opacity / 700;
    }
}


class Mountain {

    constructor() {

        this.pg = createGraphics(670, 500);
        this.draw();
    }

    draw() {

        this.pg.push();

        this.pg.translate(-130, -76);

        this.pg.stroke(1);
        this.pg.fill(14, 15, 36);

        this.pg.triangle(130, 576, 400, 576, 430, 80);

        this.pg.fill(18, 18, 48);

        this.pg.triangle(300, 576, 800, 576, 430, 80);

        this.pg.pop();
    }

    render() {

        push();
        translate(scrollPosX2, 0);

        imageMode(CENTER);

        image(this.pg, 600, 330);

        pop();
    }
}


class Bolt {

    constructor() {

        this.collectableRange = 40;
        this.pg = createGraphics(20, 40);
        this.draw();
    }

    draw() {

        this.pg.angleMode(DEGREES);
        this.pg.push();

        this.pg.translate(15, 5);

        this.pg.scale(1.25);
        this.pg.rotate(14);

        this.pg.background(0, 0, 0, 0);
        this.pg.fill(0);
        this.pg.stroke(0, 255, 238);
        this.pg.strokeWeight(0.8);

        this.pg.beginShape();
        this.pg.vertex(0, 0);
        this.pg.vertex(0, 11.5);
        this.pg.vertex(4, 11.5);
        this.pg.vertex(0, 25);
        this.pg.vertex(0, 14.5);
        this.pg.vertex(-4, 14.5);
        this.pg.vertex(0, 0);
        this.pg.endShape();

        this.pg.pop();
    }

    render(x, y) {

        bobbing = map(sin(angle), 0, 40, 0, 60);

        push();
        translate(scrollPosX, 0);

        image(this.pg, x - 25, y + bobbing);

        angle += 12;

        pop();

    }

    isFound(x, y) {

        return dist(robot.x, robot.position.y, x, y) <= this.collectableRange;
    }
}


class Health {

    constructor(_x) {

        this.x = _x;
    }

    show() {

        push();
        scale(1.6);
        translate(-200, -8);

        noStroke();

        fill(95, 87, 111);
        ellipse(this.x + 6.5, 21, 5, 5);

        fill(77, 7, 30);
        rect(this.x, 20, 13, 25, 1);

        fill(52, 2, 19);
        rect(this.x, 20, 13, 3, 1);

        fill(255);
        textSize(6);
        fill(145, 122, 186);
        text('+', this.x + 7, 29);
        text('-', this.x + 8, 34);

        pop();
    }
}


class Flagpole {

    constructor(_x) {

        this.x = _x;
        this.y = 40;
        this.flySpeed = 10
    }

    show() {

        bobbing = map(sin(angle), 0, 40, 0, 60);

        push();
        translate(scrollPosX, 0);

        translate(this.x, this.y);

        noStroke();
        fill(random(150, 255), random(0, 10), random(0, 255));

        ellipse(2, 50 + bobbing, 52, 25);

        stroke(255);
        fill(0);

        // fill(49, 53, 83);
        ellipse(0, 60 + bobbing, 140, 20);

        stroke(147, 147, 147);
        line(-90, 60 + bobbing, 90, 60 + bobbing);

        noStroke();
        fill(148, 146, 65, random(0, 200));
        triangle(0, 60 + bobbing,
            -80, platform[platform.length - 1].height - 40,
            80, platform[platform.length - 1].height - 40);
        pop();

        angle += 5;
    }

    isReached() {

        if (robot.x - 30 > platform[platform.length - 1].x + 450) {

            isRight = false;
            isLeft = false;

            robot.position.y -= 2;

            return true;
        }
    }

    flying() {

        push();
        translate(scrollPosX, 0);

        translate(this.x + this.flySpeed, this.y);
        this.flySpeed += 10;

        noStroke();
        fill(random(150, 255), random(0, 10), random(0, 255));

        // fill(25, 189, 129, 100);
        ellipse(2, 45 + bobbing, 52, 25);

        stroke(255);
        fill(0);

        // fill(49, 53, 83);
        ellipse(0, 60 + bobbing, 140, 30);

        stroke(147, 147, 147);
        line(-90, 60 + bobbing, 90, 60 + bobbing);

        pop();
    }
}


class Stars {

    constructor(_x, _y) {

        this.x = _x;
        this.y = _y;
    }

    twinkleStar() {

        let ranNum = random(20, 800);

        stroke(107, 106, 159, ranNum);
        fill(107, 106, 159, ranNum);
        triangle(this.x, this.y, this.x - 5, this.y,
            this.x - 2.5, this.y + 4.8);
        triangle(this.x, this.y + 3, this.x - 5, this.y + 3,
            this.x - 3, this.y - 2);
    }
}

class Rose {

    constructor() {

        this.pg = createGraphics(25, 45);
        this.draw();
    }

    draw() {

        this.pg.push();
        this.pg.translate(10, -460);

        this.pg.strokeWeight(1);
        this.pg.beginShape();
        this.pg.noFill();
        this.pg.stroke(21, 126, 87);

        this.pg.vertex(0, 500);
        this.pg.vertex(1, 494);
        this.pg.vertex(1, 489);
        this.pg.vertex(2, 481);
        this.pg.vertex(1, 475);
        this.pg.endShape();

        this.pg.beginShape();
        this.pg.stroke(176, 0, 80);
        this.pg.fill(50, 3, 24);
        this.pg.vertex(1, 475);
        this.pg.quadraticVertex(17, 479, 10, 465);
        this.pg.quadraticVertex(4, 470, -1, 463);
        this.pg.quadraticVertex(-13, 467, 1, 475);
        this.pg.endShape();

        this.pg.pop();
    }

    render(x, y) {

        push();
        translate(scrollPosX, 0);
        imageMode(CENTER);

        scale(0.8);

        image(this.pg, x, y);

        pop();
    }
}


class Flower {

    constructor() {

        this.pg = createGraphics(30, 35);
        this.draw();

    }

    draw() {

        this.pg.push();
        this.pg.scale(1.2);
        this.pg.translate(7, 24);
        this.pg.scale(1.4);

        this.pg.stroke(4, 158, 58);
        this.pg.strokeWeight(0.6);
        this.pg.noFill();

        this.pg.beginShape();
        this.pg.vertex(0, 0);
        this.pg.quadraticVertex(0,-10,3,-10);
        this.pg.endShape();

        this.pg.fill(87, 0, 1);
        this.pg.stroke(87, 0, 1);
        this.pg.strokeWeight(0.5);

        this.pg.push();
        this.pg.translate(4, -10);

        this.pg.ellipseMode(CENTER);
        this.pg.rotate(330);

        this.pg.ellipse(0, 0, 3, 3);
        this.pg.pop();


        this.pg.fill(77, 90, 119);
        this.pg.stroke(77, 90, 119);
        this.pg.strokeWeight(0.3);

        let angle = 0;
        for (let i = 0; i < 8; i++) {
            this.pg.push();
            this.pg.translate(4,-10);
            // line(0, -2, 0, -3.5);
            this.pg.rotate(angle);
            this.pg.ellipse(0, -3.4, 1.5, 3);
            this.pg.pop();
            angle +=  45;
        }
        this.pg.pop();
    }

    render(x, y) {

        push();
        translate(scrollPosX, 0);

        image(this.pg, x, y);

        pop();
    }
}