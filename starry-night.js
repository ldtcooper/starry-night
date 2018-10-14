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

    setInterval(makeStar, 100);

    window.makeStar = makeStar;
});
