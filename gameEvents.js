function drawAllAssets() {

    // Draw Stars
    for (let i = 0; i < stars.length; i++) {

        stars[i].twinkleStar();
    }

    // Draw Mountains.
    for (let i = 0; i < mountains.length; i++){

        mountains[i].show();
    }

    mountain.render();

    // Draw Clouds
    for (let i = 0; i < clouds.length; i++) {

        clouds[i].show();
        clouds[i].move();
    }

    // Draw Trees.
    for (let i = 0; i < trees.length; i++) {

        if (trees[i].x + scrollPosX > 0 && trees[i].x + scrollPosX < width) {

            trees[i].show();
        }
    }

    // Draw flowers
    for (let i = 0; i < flowers.length; i++) {

        if (flowers[i].x  + scrollPosX > 0 && flowers[i].x + scrollPosX < width) {

            flower.render(flowers[i].x, flowers[i].y);
        }
    }

    // Draw roses.
    for (let i = 0; i < roses.length; i++) {

        rose.render(roses[i].x, roses[i].y);
    }

    // Draw platforms.
    for (let i = 0; i < platform.length; i++) {

        if (platform[i].width + scrollPosX > 0 && platform[i].x + scrollPosX < width) {

            platform[i].show();
        }
    }
}


function checkPlatformCollision() {

    if(!isOnPlatform()) {

        isFalling = true;
    }
}


function checkCollectableCollection() {

    for (let i = 0; i < collectibles.length; i++) {

        if (collectibles[i].x + scrollPosX > 0 && collectibles[i].x + scrollPosX < width) {

            bolt.render(collectibles[i].x, collectibles[i].y - 55);
        }

        if (bolt.isFound(collectibles[i].x, collectibles[i].y - 40)) {

            score += 10;
            collectibles.splice(i, 1);
        }
    }
}


function drawScoreAndHealth() {

    fill(255);
    stroke(255);
    text("SCORE: " + score, 20, 30);
    text("TIMER: " + numOfSecs, 950, 30);

    for (let i = 0; i < healthAmount; i++) {

        health[i].show();
    }
}


function drawEndOfGameScene() {

    if (checkEndOfGame()) {

        ufo.flying()
    }
    else if (robot.x > platform[platform.length - 1].x) {

        ufo.show();
        ufo.isReached();
    }
}