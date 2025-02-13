let WIDTH = 800
let HEIGHT = 600
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let balls = [];
let speeds = [];
let yspeed = 1;
let xspeed = 1;
let ballSIZE = 80
let Lives = 10
let liveText; 
let disapointment;
let numBalls = 5;

function preload() {
    // Load assets here
    this.load.image("ball", "Assets/ball.png");
}

function create() {
    // Initializing Game Objects here!
    for (let i = 0; i < numBalls ; i++) {
        let x = Phaser.Math.Between(ballSIZE, WIDTH - ballSIZE);
        let y = Phaser.Math.Between(ballSIZE, HEIGHT - ballSIZE);
        let ball = this.add.sprite (x,y,"ball");
        ball.setDisplaySize (ballSIZE,ballSIZE)

        let xspeed = Phaser.Math.floatBetween(-1,2) * (Math.random() < 0.5 ? -1 : 1);
        let yspeed = Phaser.Math.floatBetween(-1,2) * (Math.random() < 0.5 ? -1 : 1);

        balls.push(ball);
        speeds.push([xspeed,yspeed]);
    }
    
    balls.setInteractive ()
    balls.on('pointerdown', function(){
        console.log('Ball clicked!');
        yspeed *= 1.05
        xspeed *= 1.09
        Lives += 1
        liveText.setText (`Lives = ${Lives}`)
        checkGameWin();
    })
    liveText = this.add.text(600,500,`Lives : ${Lives}`, {
        fontSize: '24px',
        fill: '#808080'
    })
    disapointment = this.add.text (WIDTH/2, HEIGHT/2, 'GAME OVER!', {
        fontSize: '64px',
        fill: '#ff0000'
    })
    disapointment.setOrigin(0.5);
    disapointment.setVisible(false);
    success = this.add.text (WIDTH/2, HEIGHT/2, 'YOU WIN!', {
        dontSize: '64px',
        fill: '#00ff00'
    })
    success.setOrigin(0.5);
    success.setVisible(false);
}

function update() {
    // Game logic here
    if (Lives <= 0) {
        return;
    }

    for (let i = 0; i < numBalls; i++) {
        moveBall(balls[i], speeds[i]);
    }

    let borderY = HEIGHT - ballSIZE/2
    let borderX = WIDTH - ballSIZE/2
    if (ball.y >= borderY || ball.y <= ballSIZE/2) {
        yspeed *= -1;
        Lives -= 1
        liveText.setText (`Lives = ${Lives}`);
        checkGameOver();
    } 
    if (ball.x >= borderX || ball.x <= ballSIZE/2){
        xspeed *= -1;
        Lives -= 1
        liveText.setText (`Lives = ${Lives}`);
        checkGameOver();
    }
    ball.y += yspeed;
    ball.x += xspeed;
}
function checkGameOver () {
    if (Lives <= 0) {
        Lives = 0;
        liveText.setText (`Lives = 0`);
        disapointment.setVisible(true);
        ball.setVisible(false);
    }
}
function checkGameWin () {
    if (35 <= Lives) {
        Lives = 35
        liveText.setText (`Lives = 35`);
        success.setVisible(true);
        ball.setVisible(false);
    }
}
