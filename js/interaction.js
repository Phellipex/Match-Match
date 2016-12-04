var numberOfFaces = 5;
var currentLevel = 1;

var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");
var levelPlaceholder = document.getElementById("level-placeholder")
var difficultyPlaceholder = document.getElementById("difficulty-placeholder")
var theBody = document.getElementsByTagName("body")[0];
var images = {1: 'watermelon.png',
    2: 'lemon.png',
    3: 'cut_pomegranate.png',
    4: 'cut_lemon.png',
    5: 'orange.png',
    6: 'cut_pear.png',
    7: 'strawberry.png',
    8: 'avocado.png',
    9 : 'cut_kiwi.png',
    10: 'cut_coconut.png',
    11: 'apple.png',
    12: 'tomato.png',
    13: 'cut_tomato.png',
    14: 'cut_apple.png',
    15: 'pear.png',
    16: 'cut_strawberry.png'
    }
var currentImage = 1;

function updatePlaceholder(placeholder, newValue){
    placeholder.innerHTML = newValue;
}

function clearNode(nodeToClear){
    while (nodeToClear.firstChild){
            nodeToClear.removeChild(nodeToClear.firstChild);
        }
}

function generateFaces(){

    clearNode(theLeftSide);
    clearNode(theRightSide);

    for (var i = 0; i < numberOfFaces; i++){
        var face = document.createElement("img");
        currentImage = Math.floor(1 + (Math.random() * 16));
        
        face.setAttribute("src", "./img/" + images[currentImage]);
        face.setAttribute("class", "absolute-positioned");
        face.style.top = (Math.random(0, 400) * 400).toString() + "px";
        face.style.left = (Math.random(0, 400) * 400).toString() + "px";
        theLeftSide.appendChild(face);
    }

    leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    while (leftSideImages.firstChild) {
theRightSide.appendChild(leftSideImages.firstChild);
    }
    
    theLeftSide.lastChild.onclick= function nextLevel(event){
        event.stopPropagation();
        numberOfFaces += 5;
        currentLevel += 1;
        alert("Congratulations, you completed level " + (currentLevel - 1).toString());
        updatePlaceholder(levelPlaceholder, currentLevel);
        updatePlaceholder(difficultyPlaceholder, numberOfFaces);
        generateFaces();
    };
    
        theBody.onclick = function gameOver() {
        alert("Game Over!");
        theBody.onclick = null;
        theLeftSide.lastChild.onclick = null;
        numberOfFaces = 5;
        currentLevel = 1;
        updatePlaceholder(levelPlaceholder, currentLevel);
        updatePlaceholder(difficultyPlaceholder, numberOfFaces);
        generateFaces();
    }; 
}