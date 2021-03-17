function draw() {

	background(starBackground);
	drawAllAssets();
	checkPlatformCollision();
	checkCollectableCollection();
	drawScoreAndHealth();

	// Update Character.
	if (!checkEndOfGame()) {

		robot.update();
		robot.show();
	}

	checkPlayerDead();
	drawEndOfGameScene();
}


