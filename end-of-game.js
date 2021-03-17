function checkPlayerDead() {

    if (robot.position.y > height) {

        healthAmount--;
        floorPos_y = platform[startPlatform].height - 40;
        pindex = startPlatform;

        if (healthAmount > 0) {

            score -= 10;
            startGame();
        }
    }
}


function checkEndOfGame() {

    if (healthAmount < 1 || numOfSecs === 0) {

        drawGameOverScreen();
    }
    // Only draw UFO if character is close to it.
    if (ufo.isReached() && robot.position.y <= 150) {

        clearInterval(interval);
        drawEndOfGameScreen();

        return true;
    }
}


function drawGameOverScreen() {

    push();
    translate(350, 450);
    scale(10);

    stroke(0);
    strokeWeight(0);
    fill(140);

    // Computer Frame
    fill(66, 63, 73);
    rect(1, -30, 30, 30, 1);

    // Computer Screen
    fill(1, 0, 173);
    rect(3, -27, 25, 25, 2);

    // Computer Face
    fill(255);
    textSize(8);
    text(':(', 6, -17);

    textFont('Courier');
    textSize(1.1);

    text('This application has stopped \n' +
        'responding. \n\n' +
        '* Press the space bar to continue.', 4, -10);

    // Antenna 1
    strokeWeight(0.4);
    stroke(84, 81, 101);
    line(27, -30, 31, -38);
    line(27, -30, 22, -36);

    strokeWeight(2);
    stroke(136, 0, 19);
    fill(136, 0, 19);

    // Antenna Points
    point(22, -36);
    point(31, -38);

    pop();
}


function drawEndOfGameScreen() {

    push();
    translate(350, 450);
    scale(10);

    stroke(0);
    strokeWeight(0);
    fill(140);

    // Computer Frame
    fill(66, 63, 73);
    rect(1, -30, 30, 30, 1);

    // Computer Screen
    fill(0, 15, 0);
    rect(3, -27, 25, 25, 2);

    // Computer Face
    fill(0, 163, 24);
    textSize(8);
    text('＾∇＾', 5, -17);

    textFont('Courier');
    textSize(1.1);

    text('You Win! \n' +
        'Score: ' + score + '\n' +
        'Time Bonus: ' + numOfSecs * 10 + '\n' +
        'Total Score: ' + (score + (numOfSecs * 10)) + '\n\n' +
        'Press the space bar to continue.', 4, -13);

    // Antenna 1
    strokeWeight(0.4);
    stroke(84, 81, 101);
    line(27, -30, 31, -38);
    line(27, -30, 22, -36);

    strokeWeight(2);
    stroke(136, 0, 19);
    fill(136, 0, 19);

    // Antenna Points
    point(22, -36);
    point(31, -38);

    pop();
}