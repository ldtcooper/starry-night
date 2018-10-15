document.addEventListener("DOMContentLoaded", function(event) {
    const sky = document.getElementById('sky');
    const buildingContainer = document.getElementById('building-container');

    const skyDimensions = sky.getBoundingClientRect();
    const buildingContainerDimensions = buildingContainer.getBoundingClientRect();

    function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    const makeStar = function makeStar() {
        const newStar = document.createElement('div');
        const xPos = randomIntFromInterval(0, skyDimensions.width);
        const yPos = randomIntFromInterval(0, (skyDimensions.height - 100));
        const timeToDeath = randomIntFromInterval(5, 15) * 1000;
        newStar.className = 'star';
        newStar.style.top = `${yPos}px`;
        newStar.style.left = `${xPos}px`;

        sky.appendChild(newStar);
        setTimeout(function() { killStar(newStar); }, timeToDeath);
    };

    const killStar = function killStar(star) {
        sky.removeChild(star);
    };

    const makeWindowRow = function makeWindows(buildingWidth, windowHeight) {
        const windowRow = document.createElement('div');
        windowRow.className = 'window-row';
        windowRow.style.height = `${windowHeight}px`;
        const numWindows = randomIntFromInterval(10, 25);
        const windowWidth = (buildingWidth / numWindows);
        for (let i = 0; i <= numWindows; i++) {
            const newWindow = document.createElement('div');
            newWindow.className = 'window';
            newWindow.style.height = `${windowHeight - 4}px`;
            newWindow.style.width = `${windowWidth - 2}px`;
            windowRow.appendChild(newWindow);
        }
        return windowRow;
    };

    const makeBuilding = function makeBuilding(startCoord, width, height) {
        const newBuilding = document.createElement('div');
        const numStories = height / 20;
        const windowHeight = (height / numStories) / 2;
        for (let i = 0; i < windowHeight; i++) {
            const windowRow = makeWindowRow(width, windowHeight);
            newBuilding.appendChild(windowRow);
        }
        newBuilding.className = 'building';
        newBuilding.style.height = `${height}px`;
        newBuilding.style.width = `${width}px`;
        newBuilding.style.left = `${startCoord}px`;
        buildingContainer.appendChild(newBuilding);
    };

    const getWidth = function getWidth (totalWidth) {
        const minPct = 6;
        const maxPct = 12;
        const widthPct = randomIntFromInterval(minPct, maxPct) / 100;
        const width = totalWidth * widthPct;
        return width;
    };

    const getHeight = function getHeight (totalHeight) {
        const minPct = 50;
        const maxPct = 110;
        const heightPct = randomIntFromInterval(minPct, maxPct) / 100;
        const height = totalHeight * heightPct;
        return height;
    };

    const makeBuildings = function makeBuildings () {
        const totalWidth = buildingContainerDimensions.width;
        let remainingWidth = buildingContainerDimensions.width;

        const totalHeight = buildingContainerDimensions.height;

        while (remainingWidth > 0) {
            const buildingHeight = getHeight(totalHeight);
            const buildingWidth = getWidth(totalWidth);
            const startCoord = totalWidth - remainingWidth;
            makeBuilding(startCoord, buildingWidth, buildingHeight);
            remainingWidth -= buildingWidth;
        }
    };

    const switchWindow = function switchWindow() {
        const allWindows = document.querySelectorAll('.window');
        const roll = randomIntFromInterval(0, allWindows.length - 1);
        const randomWindow = allWindows[roll];
        if (randomWindow.classList.contains('on')) {
            switchWindow();
        } else {
            randomWindow.classList.toggle('on');
            const timeToLightsOut = randomIntFromInterval(5000, 20000);
            setInterval(function () {
                randomWindow.classList.toggle('on');
            }, timeToLightsOut);
        }
    };

    makeBuildings();
    setInterval(switchWindow, 10);
    setInterval(makeStar, 30);
});
