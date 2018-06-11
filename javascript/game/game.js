/*
    1. Enemy Functionality
        1.1 Add initial enemies (this should be done globally)
        1.2 Add Enemy functionality moveEnemies()
    2. Reset Game Functionality 
        2.1 Add functionality to checkLives()
        2.2 Add functionality to resetGame()
*/

window.requestAnimFrame = (function(){
 return  window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(/* function */ callback, /* DOMElement */ element){
           window.setTimeout(callback, 1000 / 60);
         };
})();

(function () {
	var playArea = document.createElement('div'),
		ship = document.createElement('div'),
		laser = document.createElement('div'),
		gameOverText = document.createElement('h1'),
		scoreDiv = document.createElement('div'),
        scoreLabel = document.createElement('p'),
        livesDiv = document.createElement('div'),
        livesLabel = document.createElement('p'),
		shipPos = {
			x: 0,
			y: 0,
			startX: 0,
			startY: 0
		},
		shipSpeed = 4,
		key = {
			right: false,
			left: false,
			up: false,
			down: false
		},
		shipWidth = ship.offsetWidth,
		shipHeight = ship.offsetHeight,
		lasers = [],
		laserSpeed = 4
		max_lasers = 5,
		enemies = [],
		enemySpeed = 2,
		enemyTotal = 4,
		enemyPos = {
		    x: 150,
		    y: -50
		},
		lives = 3,
		gameOver = false,
		scoreText = 'Score: ',
        score = 0,
        livesText = 'Lives: ';
		
	
    document.body.appendChild(scoreDiv);
    scoreDiv.classList.add('score-div');
    scoreDiv.appendChild(scoreLabel);
    scoreLabel.classList.add('score-label');
    document.body.appendChild(livesDiv);
    livesDiv.classList.add('lives-div');
    livesDiv.appendChild(livesLabel);
    livesLabel.classList.add('lives-label');

	document.body.appendChild(playArea);
	playArea.classList.add('playArea');
	playArea.appendChild(ship);
	ship.classList.add('ship'); 	//The ship is a child of the play area
    shipPos.x = (playArea.offsetWidth / 2) - (ship.offsetWidth / 2);
    shipPos.y = playArea.offsetHeight - (ship.offsetHeight * 2);
    
    /*starting position for the ship position*/
    shipPos.startX = shipPos.x;
    shipPos.startY = shipPos.y;
    
    playArea.leftBoundary = 0;
    playArea.rightBoundary = playArea.offsetWidth - ship.offsetWidth - 20;
    playArea.topBoundary = 0;
    playArea.bottomBoundary = playArea.offsetHeight - ship.offsetHeight - 20;
    
    /*
    1.1 TODO: add functionality to create enemies (hint: look at lasers)
    */
    for (var i = 0; i < enemyTotal; i++) {
        var enemy = Enemy();
        enemies.push([enemy, enemyPos.y]);
        playArea.appendChild(enemies[i][0]);
        enemies[i][0].classList.add('enemy');
        enemies[i][0].style.top = enemies[i][1] + 'px';
        enemies[i][0].style.left = enemyPos.x + 'px';
        enemyPos.x += 150;
    }
    //END of global definitions

    /*
    2.1 TODO: 
    Check lives remaining functionality
        - when more than 0 lives remain reset the game, resetGame()
        - when 0 lives remain:
            - remove ships, enemies, and lasers
            - add the text to game over text and set gameOver to true
    */
    function checkLives() {

    }
    /*
     2.2 TODO: reset game function
        - position ship at starting point
        - reset enemies to starting point
    */
    function resetGame() {
    }
    
    /*Defines a div element*/
    function Laser() {
        return document.createElement('div');
    }

    function Enemy() {
        return document.createElement('div');
    }
    
	function moveShip() {
		if (key.right === true) {
			shipPos.x += shipSpeed;
		} else if (key.left === true) {
			shipPos.x -= shipSpeed;
		}
		if (key.up === true) {
			shipPos.y -= shipSpeed;
		} else if (key.down === true) {
			shipPos.y += shipSpeed;
		}
		if (shipPos.x < playArea.leftBoundary) {
			shipPos.x = playArea.leftBoundary;
		}
		if (shipPos.x > playArea.rightBoundary) {
			shipPos.x = playArea.rightBoundary;
		}
		if (shipPos.y < playArea.topBoundary) {
			shipPos.y = playArea.topBoundary;
		}
		if (shipPos.y > playArea.bottomBoundary) {
			shipPos.y = playArea.bottomBoundary;
		}
		ship.style.left = shipPos.x + 'px';
		ship.style.top = shipPos.y + 'px';
	}
    
    
    /*
    functionality to allow the lasers to continue to move
        - call this method to propagate lasers
        - when the laser exceeds the game space it should be removed so that it 
            more lasers can be fired
        - next add functionality to check for a hit
    */
    function moveLasers() {
        for (var i = 0; i < lasers.length; i++) {
            
            if (parseInt(lasers[i][0].style.top) > playArea.topBoundary){
                lasers[i][1] -= laserSpeed;
                lasers[i][0].style.top = lasers[i][1] + 'px';
                checkHit(i)
            }else{
                playArea.removeChild(lasers[i][0]);
                lasers.splice(i,1);
            }
        }
    }
    
    /*
        Checks if a laser has hit an enemy. Given a laser position in the array
            - if so it removes the enemy and laser
            - increments score
    */    
    function checkHit(l) {
        var lx = parseInt(lasers[l][0].style.left),
              ly = parseInt(lasers[l][0].style.top);
        for (var i = 0; i < enemies.length; i++) {
            var ex = parseInt(enemies[i][0].style.left),
                  ey = parseInt(enemies[i][0].style.top),
                  ew = enemies[i][0].offsetWidth,
                  eh = enemies[i][0].offsetHeight;
                if (lx > ex && lx < ex + ew && ly > ey && ly < ey + eh) {
                    playArea.removeChild(lasers[l][0]);
                    playArea.removeChild(enemies[i][0]);
                    lasers.splice(l, 1);
                    enemies.splice(i, 1);
                    score += 100;
                }
          }
    }
    
    function updateScore() {
        scoreLabel.innerHTML = scoreText + score;
        livesLabel.innerHTML = livesText + lives;
    }
    
    /*
    1.2 TODO: create functionality to move enemies on the screen (make sure to call this method to propagate enemies)
        - if enemy length is less than total, add new enemies
            - can be random in terms of left to right position (Math.<function>)
        - move each enemy forward
            - if enemy exceeds boundary restart enemy at original height
        - check for ship contact with enemy
            - consider overlap between enemy and ship
    */
    function moveEnemies() {
        for (var i = 0; i < enemies.length; i++) {
            
            if (parseInt(enemies[i][0].style.top) < playArea.bottomBoundary){
                enemies[i][1] += enemySpeed;
                enemies[i][0].style.top = enemies[i][1] + 'px';
            }else{
                enemies[i][1] += enemyPos.y ;
//                 enemies[i][0].style.top = enemies[i][1] + 'px';
            }
        }
    }
       
	function keyDown(e) {
		if (e.keyCode === 39) {
			key.right = true;
		} else if (e.keyCode === 37) {
			key.left = true;
		}
		if (e.keyCode === 38) {
			key.up = true;
		} else if (e.keyCode === 40) {
			key.down = true;
		}
		if(e.keyCode==88){
		    if(lasers.length < max_lasers){
		        var laser = Laser();
		        lasers.push([laser, shipPos.y]);
		        playArea.appendChild(lasers[lasers.length - 1][0]);
		        lasers[lasers.length - 1][0].classList.add('laser'); //add class type references stylesheet
                lasers[lasers.length - 1][0].style.top = lasers[lasers.length - 1][1] + 'px';
                lasers[lasers.length - 1][0].style.left = shipPos.x + 25 + 'px';
		    }
		}
	}

	function keyUp(e) {
		if (e.keyCode === 39) {
			key.right = false;
		} else if (e.keyCode === 37) {
			key.left = false;
		}
		if (e.keyCode === 38) {
			key.up = false;
		} else if (e.keyCode === 40) {
			key.down = false;
		}
	}

	document.addEventListener('keydown', keyDown, false);
	document.addEventListener('keyup', keyUp, false);

	function loop() {
	    if (gameOver == false){
            moveShip();
            moveLasers();
            moveEnemies();
		}
		updateScore();
		requestAnimFrame(loop);
	}

	loop();

})();
