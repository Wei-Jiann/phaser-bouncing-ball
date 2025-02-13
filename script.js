let WIDTH = 400
let HEIGHT = 300
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

let ball;
let yspeed = 1;
let xspeed = 1;
let ballSIZE = 80
let Lives = 10
let liveText; 
let disapointment;

function preload() {
    // Load assets here
    this.load.image("ball", "Assets/ball.png");
}

function create() {
    // Initializing Game Objects here!
    ball = this.add.sprite (WIDTH/2, HEIGHT/2, "ball");
    ball.setDisplaySize (ballSIZE,ballSIZE) 

    ball.setInteractive ()
    ball.on('pointerdown', function(){
        console.log('Ball clicked!');
        yspeed *= 1.05
        xspeed *= 1.05
        ball.setDisplaySize (ballSIZE, ballSIZE);
        Lives += 1
        liveText.setText (`Lives = ${Lives}`)
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
}

function update() {
    if (Lives <= 0) {
        return;
    }

    // Game logic here
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
    function checkGameOver () {
        if (Lives <= 0) {
        Lives = 0;
        liveText.setText (`Lives = 0`);
        disapointment.setVisible(true);
        ball.setVisible(false);
    }}
}
