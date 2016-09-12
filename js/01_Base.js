
/*eslint-env browser */
// Set Up Variables
var canvas;
var context;
var WIDTH = 600;
var HEIGHT = 400;
var x = 300;
var y = 0;
var dx = 0;
var dy = -0.1;
var speedTop = 2;

var pauseMode = false
var startTime = Date.now();
var timePlayed = 0;

var escape = false

var collectables = [];
var enemies = [];
var trash = [];

var Key = {
  _pressed: {},

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
}

Key.RIGHT = 68
Key.LEFT = 65

function collectables_function(){
var j = 0;
var isOnTooClose = false;
collectables = [];
while (collectables.length < 20) {
		var cx = (Math.random() * (500 - 100)) + 100;
		var cy = (Math.random() * (2000 - 400)) + 400;

      // for (var k = 0; k < collectables.length; k++) {
  		// 	if(distance(cx,cy,collectables[k].x,collectables[k].y) < 50){
  		// 		isOnTooClose = true;
  		// 	}
  		// }

      //if(!isOnTooClose){
  		  collectables.push(new Sprite());
  	    collectables[j].x = cx;
  	    collectables[j].y = cy;
  	    collectables[j].WIDTH = 25;
  	    collectables[j].HEIGHT = 25;
  			j++;
      //}
	}
}


function enemies_function(){
var k = 0;
enemies = [];
while (enemies.length < 10) {
		var cx = (Math.random() * (500 - 100)) + 100;
		var cy = (Math.random() * (3500 - 1500)) + 1500;

		  enemies.push(new Sprite());
	    enemies[k].x = cx;
	    enemies[k].y = cy;
	    enemies[k].WIDTH = 25;
	    enemies[k].HEIGHT = 25;
			k++;
	}
}
/*
function trash_function(){
var l = 0;
trash = [];
while (trash.length < 5) {
		var cx = (Math.random() * (500 - 100)) + 100;
		var cy = (Math.random() * (1500 - 400)) + 400;

		  trash.push(new Sprite());
	    trash[l].x = cx;
	    trash[l].y = cy;
	    trash[l].WIDTH = 25;
	    trash[l].HEIGHT = 25;
			l++;
	}
}
*/

//Images
var backgroundImage = new Image();
backgroundImage.src = "images/Background.png"

//var backgroundOverlay = new Image();
//backgroundImage.src = "images/BackgroundOverlay.png"

var hudImage = new Image();
hudImage.src = "images/HUD.png"

var fishImage = new Image();
fishImage.src = "images/Fish.png"

var jellyFishImage = new Image();
jellyFishImage.src = "images/Jellyfish.png"

// Set Up Functions
function init (){
    // Get reference to canvas
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');

    //Make the program listen for any clicks on the keyboard the player makes
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    window.addEventListener( "keydown", doKeyDown, false);

    collectables_function();
    enemies_function();
    // trash_function();

    //Set Update Speed
    setInterval(update, 10);
}

function doKeyDown(e){
  if(e.keyCode === 32){
    pauseMode = !pauseMode
      if(!pauseMode){
        startTime = Date.now();
      } else {
        timePlayed = timePlayed + Date.now() - startTime;
      }
  }

}

function update(){
  context.drawImage(backgroundImage, 0, y)
  if(!pauseMode){
    if(y > -3700){
      y = y + dy
    }

    if(x >= 50 && x <= 550){
      x = x + dx
    }else{
      dx = -dx
      x = x + dx
    }
    dx = dx * 0.99
  }

  for (var i = 0; i < collectables.length; i++) {
      var collectable = collectables[i];
      if (collectable.isVisible == true) {
          context.drawImage(fishImage, collectable.x - 41,collectable.y + y, 41, 22);
      }
  }

  for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemy.isVisible == true) {
          context.drawImage(jellyFishImage, enemy.x - 41,enemy.y + y, 60, 80);
      }
  }

  if(dy >= -1 && !pauseMode && !escape){
    dy = dy - 0.001
  }

  //Draw player
  circle(x, 200, 25)


  //Fog
  //context.drawImage(backgroundOverlay, 0, y)

  if(pauseMode){
    print(225, 80, 50, "Paused", 'red')
  }

  //Movement

    // LEFT
    if (Key.isDown(Key.LEFT) && dx > -speedTop + 0.1){
      dx = dx - 0.025;
    }

    // RIGHT
    if (Key.isDown(Key.RIGHT) && dx < speedTop - 0.1){
      dx = dx + 0.025;
    }
    context.drawImage(hudImage, 0, 0)
    print(480, 390, 40,time(), 'black')
}

function circle(centerX, centerY, radius, color, lineWIDTH, strokeStyle){
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color || 'blue';
      context.fill();
      context.lineWidth = lineWIDTH || 5;
      context.strokeStyle = strokeStyle || '#FFF733';
      context.stroke();

}

function print(x, y, size, words, color){
  context.beginPath();
	context.fillStyle = color || "#FFFFFF"
	context.font = size+"px Times";
	context.fillText(words,x,y);
}
/*
function time(){
	//Time Calculaions
	var tim = 0;
	if(!pauseMode){
		tim = Math.floor((timePlayed + (Date.now()-startTime))/1000);
	} else {
		tim = Math.floor(timePlayed/1000);
	}
	var min = Math.floor((tim / 60));
	var sec = tim - min * 60;
	//Formating Calcuations
	var s = sec + "";
	while (s.length < 2) s = "0" + s;
	//Returning Time
	return min + ':' + s;
}
*/
function Sprite() {
    this.x = 0;
    this.y = 0;
    this.WIDTH = 100;
    this.HEIGHT = 100;
    this.isVisible = true;
}

function distance(x1, y1, x2, y2){
	 return Math.sqrt((x2 -x1)*(x2 -x1) + (y2- y1)*(y2- y1));
}

//Call the init function as soon as the page has finished loading
window.onload = init;
