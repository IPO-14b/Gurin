var pjs = new PointJS('2D', 800, 600, {
	backgroundColor: '#DDDDDD'
});
pjs.system.initFullPage();

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Object's manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager
var v2d    = pjs.vector.v2d;
var random = pjs.math.random;

var speed = 1;
var dX = 1, dY = random(-1, 1, true);
var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

var mouse = pjs.mouseControl;
mouse.initMouseControl();
	
var fon = game.newImageObject({
	x : 0, y : 0,
	file : 'background.jpg'
});

var ball = game.newImageObject({
	file: 'fireball.png',
	x: random(10, 350),
	y: random(10, 350),
	scale: 1
});

game.newLoop('game', function () {
	fon.draw();

	if(ball.x < 0 || ball.x + ball.w > 1600)
		dX *= -1;
	if(ball.y < 0 || ball.y + ball.h > 900)
		dY *= -1;

//<<<<<<< lab4
//	speed += 0.001;
//=======
	speed += 0.007;
//>>>>>>> master

	ball.move(v2d(speed * dX, speed * dY));

	ball.draw();

	var mp = mouse.getPosition();

	brush.drawRoundRect({
		x : mp.x - 12.5,
		y : mp.y - 12.5,    
		w : 25, h : 25,
		radius : 10,
		fillColor : '#515151',
		});

});

game.startLoop('game');