var mainChar = {};
var hat1 = {};
var mainCharHands = {};
var glasses1 = {};
var sprites = [];
var spriteLock = {};
var mask1 = {};
var mask2 = {};


function setup() {
	createCanvas(windowWidth, windowHeight);

	mask2.image = loadImage("images/mask2.png", function() {
		mask2.xSize = mask2.image.width;
		mask2.ySize = mask2.image.height;
		mask2.name = "mask2";
		// console.log(mainChar.image.height)
		// console.log(mainChar.image.width)
	});

	mask1.image = loadImage("images/mask1.png", function() {
		mask1.xSize = mask1.image.width;
		mask1.ySize = mask1.image.height;
		mask1.name = "mask1";
		// console.log(mainChar.image.height)
		// console.log(mainChar.image.width)
	});

	mainChar.image = loadImage("images/mainChar3.png", function() {
		mainChar.xSize = mainChar.image.width;
		mainChar.ySize = mainChar.image.height;
		mainChar.name = "mainChar";
		// console.log(mainChar.image.height)
		// console.log(mainChar.image.width)
	});
	hat1.image = loadImage("images/afhat1.png", function() {
		hat1.xSize = hat1.image.width;
		hat1.ySize = hat1.image.height;
		hat1.name = "hat1";
		// console.log(hat1.image.height)
		// console.log(hat1.image.width)
	});
	glasses1.image = loadImage("images/3dglasses1tran.png", function() {
		glasses1.xSize = glasses1.image.width;
		glasses1.ySize = glasses1.image.height;
		glasses1.name = "glasses1";
		// console.log(glasses1.image.height)
		// console.log(glasses1.image.width)
	});

	mainCharHands.image = loadImage("images/mainCharhands.png", function() {
		mainCharHands.xSize = mainCharHands.image.width;
		mainCharHands.ySize = mainCharHands.image.height;
		mainCharHands.name = "mainCharHands";
		// console.log(glasses1.image.height)
		// console.log(glasses1.image.width)
	});

	mainChar.x = windowWidth/2;
	mainChar.y = (windowHeight/2);
	hat1.x = 100;
	hat1.y = 100;
	glasses1.x = 200;
	glasses1.y = 200;
	mask1.x = 300;
	mask1.y = 100;
	mask2.x = 400;
	mask2.y = 100;
	mainCharHands.x = 500;
	mainCharHands.y = 100;

	sprites.push(mainChar, mask1, mask2, hat1,glasses1, mainCharHands);
}

function draw() {

	background(226, 184, 205);
	drawImageArea();
	checkLockAndMove(mouseIsPressed);
	resizeLocked();
	drawsprites();
	drawControls();
}

function drawControls() {
	button = createButton('Snap!');
	button.position(windowWidth/2, windowHeight-50);
	button.mousePressed(snap);
}

function snap() {
	console.log('Snap!');
}

function drawsprites() {
	for (var i=0; i<sprites.length; i++) {
		image(sprites[i].image, sprites[i].x, sprites[i].y, sprites[i].xSize, sprites[i].ySize);
		console.log(sprites[i].name);
		console.log("Width:" + sprites[i].xSize);
		console.log("Height:" + sprites[i].ySize);
		//ellipse(sprites[i].x+sprites[i].xSize/2,sprites[i].y+sprites[i].ySize/2, 20, 20);
	}
}

function checkLockAndMove(mouseIsPressed) {
	if (mouseIsPressed) {
		movesprite(mouseX, mouseY);
	} else {
		spriteLock = null;
	}
}
	function resizeLocked() {
	//if a sprite is selected keep moving that1 one dont switch to the closest match
		if (spriteLock) {
			if (keyIsDown(RIGHT_ARROW)) {
				console.log("ra");
				spriteLock.xSize = spriteLock.xSize * 1.01;
				spriteLock.ySize = spriteLock.ySize * 1.01;
			} else if (keyIsDown(LEFT_ARROW)) {
				console.log("la");
				spriteLock.xSize = spriteLock.xSize / 1.01;
				spriteLock.ySize = spriteLock.ySize / 1.01;
			}
		}
}

function drawImageArea() {
	strokeWeight(7)
	fill(201, 201, 201)
	rect(windowWidth/6, 100, (windowWidth/6)*4, windowHeight/1.6)
}


//loop through sprites and move the topmost element (or latest in the array)
function movesprite(mx, my) {
	if(spriteLock) {
		spriteLock.x =  mx-spriteLock.xSize/2;
		spriteLock.y = my-spriteLock.ySize/2;
	} else {
		var found=false;
		var index=sprites.length-1;
		while(found===false&&index>=0) {
			if(dist(mx,my,sprites[index].x+sprites[index].xSize/2,sprites[index].y+sprites[index].ySize/2)<100) {
					sprites[index].x = mx-sprites[index].xSize/2;
					sprites[index].y = my-sprites[index].ySize/2;
					found=true;
					spriteLock = sprites[index];
			}
			index--;
		}
	}
}
