// These functions creates the positioning coordinates for the assets.
function createTreeArray(treeDescriptor) {

    let treeArray = [];

    for(let i = 0; i < treeDescriptor.length; i++) {

        let tree = {

            x: platform[treeDescriptor[i].platformNum].x + treeDescriptor[i].xPos,
            y: random(platform[treeDescriptor[i].platformNum].height - 40, platform[treeDescriptor[i].platformNum].height - 60)
        };

        treeArray.push(tree);
    }

    return treeArray;
}


function createCollectibleArray(collectibleDescriptor) {

    let collectibles = [];

    for (let i = 0; i < collectibleDescriptor.length; i++) {

        let collectible = {

                xPos: platform[collectibleDescriptor[i].platformNum].x + collectibleDescriptor[i].xPos,
                yPos: platform[collectibleDescriptor[i].platformNum].height
            };

        collectibles.push(collectible);
    }

    return collectibles;
}


function createFlowerArray(flowerDescriptor) {

    let flowers = [];

    for (let i = 0; i < flowerDescriptor.length; i++) {

        let flower = {

            xPos: platform[flowerDescriptor[i].platformNum].x + flowerDescriptor[i].xPos,
            yPos: platform[flowerDescriptor[i].platformNum].height - 28
        };

        flowers.push(flower);
    }

    return flowers;
}


function createRoseArray(roseDescriptor) {

    let roses = [];

    for (let i = 0; i < roseDescriptor.length; i++) {

        let rose = {

            xPos: platform[roseDescriptor[i].platformNum].x + roseDescriptor[i].xPos + 144,
            yPos: roseDescriptor[i].yPos
        };

        roses.push(rose);
    }

    return roses;
}


function createPlatformRenderingArray(levelDescriptor) {

    let level = [];

    let x = 0;

    for (let i = 0; i < levelDescriptor.length; i++) {

        let platform = {
            xPos: levelDescriptor[i].gap + x,
            width: levelDescriptor[i].length + levelDescriptor[i].gap + x,
            height: levelDescriptor[i].height,
            edge1: random(levelDescriptor[i].height + 30, height - 30),
            edge2: random(levelDescriptor[i].height + 30, height - 30)
        };

        level.push(platform);

        if (i <= 0) {

            levelDescriptor[i].gap = levelDescriptor[i + 1].gap;
        }

        x = levelDescriptor[i].gap + platform.width;
    }

    return level;
}