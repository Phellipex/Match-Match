var numberOfFaces = 5;
var currentLevel = 1;
var currentWidth = document.getElementById('leftSide').clientWidth-100;

var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");
var levelPlaceholder = document.getElementById("level-placeholder")
var difficultyPlaceholder = document.getElementById("difficulty-placeholder")
var theBody = document.getElementsByTagName("body")[0];

var hints = {
                1:{
                    "available":true,
                    "action": function () {
                        theLeftSide.lastChild.className += " selected";                        
	               	}
	            },
                
                2:{
                    "available":true,
                    "action": function () {
                        var nodes = [].slice.call(theLeftSide.children);
	               	    for (node of nodes.slice(0, -1)) {
	                        theLeftSide.removeChild(node);
	               	    } 
	                }
                },
             
                3:{"available":true,
                    "action": function (event) {
                        nextLevel(event);
	                }
                },
                
                4:{"available":true,
                    "action": function () {
                        generateFaces();
	                }
                },
            }

var images = {
                1: 'watermelon.png',
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

/**
 * Replaces the content of placeholder with the specified newValue
 */
function updatePlaceholder(placeholder, newValue) {
    placeholder.innerHTML = newValue;
}

/**
 * Removes all the children nodes of the nodeToClear
 */
function clearNode(nodeToClear) {
    while (nodeToClear.firstChild){
        nodeToClear.removeChild(nodeToClear.firstChild);
    }
}

/**
 * Takes a node of the DOM and applies a function to it.
 * The function is bound to the onclick event only.
 */
function applyEvent(node, appliedFunction) {
    node.onclick = appliedFunction;
}

/**
 * Stores the aids available to players. Each aid 
 * has an action and a state associated to it.
 * The action is the function that is executed upon
 * using the aid. The state is a boolean value used
 * to check if the aid has already been used.
 */
function useHint(hintNumber, event) {
    if (hints[hintNumber]["available"]) {
        if (event != null) {
            hints[hintNumber]["action"](event);
        } else {
            hints[hintNumber]["action"]();
        }
        hints[hintNumber]["available"] = false;
    } else {
        alert("You already used that action!");
    }
}

/**
 * Resets level, difficulty, number of faces and aid availability.
 * It also repopulates the panels with new images. This is triggered
 * upon losing.
 */
var gameOver = function () {
    alert("Game Over!");
    theLeftSide.lastChild.onclick = null;
    numberOfFaces = 5;
    currentLevel = 1;
    for (var i=1; i <= Object.keys(hints).length; i++) {
        hints[i]['available'] = true;
    }
    updatePlaceholder(levelPlaceholder, currentLevel);
    updatePlaceholder(difficultyPlaceholder, numberOfFaces);
    generateFaces();
}

/**
 * Updates current level and difficulty. It also repopulates panels
 * with more images for the next level. This is triggered upon
 * clearing a level.
 */
var nextLevel = function (event) {
    event.stopPropagation();
    numberOfFaces += 5;
    currentLevel += 1;
    theLeftSide.removeChild(theLeftSide.lastChild);
    alert("Congratulations, you completed level " + (currentLevel - 1).toString());
    updatePlaceholder(levelPlaceholder, currentLevel);
    updatePlaceholder(difficultyPlaceholder, numberOfFaces);
    generateFaces();
};

/**
 * Populates the panels with images chosen randomly from the images object.
 * Images are randomly distributed on their respective panel (left or right).
 * The left panel always has an extra image which triggers nextLevel on click.
 * The remaining images all trigger gameOver when clicked.
 */
function generateFaces() {
    clearNode(theLeftSide);
    clearNode(theRightSide);

    for (var i = 0; i < numberOfFaces; i++) {
        var face = document.createElement("img");
        currentImage = Math.floor(1 + (Math.random() * 16));
        
        face.setAttribute("src", "./img/" + images[currentImage]);
        face.setAttribute("class", "absolute-positioned responsive-img");
        face.style.top = (Math.random(0, currentWidth) * currentWidth).toString() + "px";
        face.style.left = (Math.random(0, currentWidth) * currentWidth).toString() + "px";

        if (i != numberOfFaces - 1) {
            applyEvent(face, gameOver);
        }

        theLeftSide.appendChild(face);
    }

    leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);

    while (leftSideImages.firstChild) {
        theRightSide.appendChild(leftSideImages.firstChild);
    }

    theLeftSide.style = "height: " + (currentWidth + 100).toString() + "px";
    theRightSide.style = "height: " + (currentWidth + 100).toString() + "px;left: " + (currentWidth + 88).toString() + "px";

    for (rightNode of theRightSide.children) {
        applyEvent(rightNode, gameOver);
    }

    applyEvent(theLeftSide.lastChild, nextLevel);
}
