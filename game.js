/**
 * Пордключения окружения движка
 *
 * Используется для инициальзции всех переменных и объектов движка
 *
 * @var $pjs
 */
var pjs = new PointJS('2D', 800, 600, {
    backgroundColor: '#DDDDDD'
});
pjs.system.initFullPage();


/**
 * Скорость файрбола
 *
 * Используется для определения скорости файрбола
 *
 * @var int $speed
 */
var speed = 1;
/**
 * Координата X
 *
 * Используется для создания движения файрбола
 *
 * @var int $dX
 */
var dX = 1; 
/**
 * Координата Y
 *
 * Используется для создания движения файрбола
 *
 * @var int $dY
 */
var dY = pjs.math.random(-1, 1, true);

pjs.mouseControl.initMouseControl();

/**
 * Фон игры
 *
 * Испоьзуется дляя создания фона игры
 *
 * @var  $fon
 */    
var fon = pjs.game.newImageObject({
    x : 0, y : 0,
    file : 'background.jpg'
});

/**
 * Файрбол
 *
 * Исполльзуется для создания файрбола
 *
 * @var  $ball
 */
var ball = pjs.game.newImageObject({
    file: 'fireball.png',
    x: pjs.math.random(10, 350),
    y: pjs.math.random(10, 350),
    scale: 1
});

/**
 * Жизненые цикл игры 
 *
 * Функция, которая является жизненым циклом игры.
 */
function loop(){
    fon.draw();

    if(ball.x < 0 || ball.x + ball.w > 1600)
        dX *= -1;
    if(ball.y < 0 || ball.y + ball.h > 900)
        dY *= -1;

//<<<<<<< lab4
//    speed += 0.001;
//=======
    speed += 0.007;
//>>>>>>> master

    ball.move(pjs.vector.v2d(speed * dX, speed * dY));

    ball.draw();

    var mp = pjs.mouseControl.getPosition();

    pjs.brush.drawRoundRect({
        x : mp.x - 12.5,
        y : mp.y - 12.5,    
        w : 25, h : 25,
        radius : 10,
        fillColor : '#515151',
        });

}
pjs.game.newLoop('pjs.game', loop);

pjs.game.startLoop('pjs.game');