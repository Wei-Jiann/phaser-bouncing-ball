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
        let ball = this.add.sprite(x, y, "ball");
        ball.setDisplaySize(ballSIZE, ballSIZE);

        let xspeed = Phaser.Math.FloatBetween(-1, 2) * (Math.random() < 0.5 ? -1 : 1);
        let yspeed = Phaser.Math.FloatBetween(-1, 2) * (Math.random() < 0.5 ? -1 : 1);

        balls.push(ball);
        speeds.push([xspeed, yspeed]);

        ball.setInteractive();
        ball.on('pointerdown', function() {
            console.log('Ball clicked!');
            speeds[i][1] *= 1.05;
            speeds[i][0] *= 1.09;
            Lives += 1;
            liveText.setText(`Lives = ${Lives}`);
            checkGameWin();
        });
    }

    liveText = this.add.text(600, 500, `Lives : ${Lives}`, {
        fontSize: '24px',
        fill: '#808080'
    });
    disapointment = this.add.text(WIDTH / 2, HEIGHT / 2, 'GAME OVER!', {
        fontSize: '64px',
        fill: '#ff0000'
    });
    disapointment.setOrigin(0.5);
    disapointment.setVisible(false);
    success = this.add.text(WIDTH / 2, HEIGHT / 2, 'YOU WIN!', {
        fontSize: '64px',
        fill: '#00ff00'
    });
    success.setOrigin(0.5);
    success.setVisible(false);
}

function update() {
    // Game logic here
    if (Lives <= 0) {
        return;
    }

    for (let i = 0; i < balls.length; i++) {
        moveBall(balls[i], i);
    }
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
function moveBall(ball, index) {
    ball.y += speeds[index][1]; // Update y position with yspeed
    ball.x += speeds[index][0]; // Update x position with xspeed
    if (ball.y >= HEIGHT - ballSIZE/2 || ball.y <= ballSIZE/2) {
        speeds[index][1] *= -1; // Reverse yspeed
        Lives -= 1;
        liveText.setText(`Lives = ${Lives}`);
        checkGameOver();
    }
    if (ball.x >= WIDTH - ballSIZE/2 || ball.x <= ballSIZE/2) {
        speeds[index][0] *= -1; // Reverse xspeed
        Lives -= 1;
        liveText.setText(`Lives = ${Lives}`);
        checkGameOver();
    }
}