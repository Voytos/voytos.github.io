
var player;
var bgmusic;
var timer;
var enemies;
var cursors;

var enemies_count = 20;
var lvl = 1;
var playerVelocity = 700;
var enemyVelocity = 200;
var enemyInterval = 700;
var points = 0;

var timerPoints;
var timerLvlUp;

var textPoints;
var textPoints2;
var textLvl;
//var textLvl2;
var textHighScore;

var keyPause;
var paused_ = false;
var keyMute;
var muted_ = false;


GameStates.Game = function (game) {

};

GameStates.Game.prototype = {

    create: function () {
        enemies_count = 20;
        lvl = 1;
        playerVelocity = 700;
        enemyVelocity = 200;
        enemyInterval = 700;
        points = 0;

        if (localStorage.getItem('avoidSquaresHighPoints') === null) {
            localStorage.setItem('avoidSquaresHighPoints', points)
        }

        //this.stage.backgroundColor = '#6688ee';
        //this.stage.backgroundColor = 'rgb(40,40,240)';
        //this.stage.backgroundColor = 'rgb(255,255,255)';
        this.stage.backgroundColor = '#3B3738';
        
        //this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.input.onDown.add(gofull, this);

        //game.physics.setBoundsToWorld();
        /*
        var lolol = localStorage.getItem('avoidSquaresHighPoints');
        console.log(lolol);

        if (localStorage.getItem('avoidSquaresHighPoints') == undefined) {
            localStorage.setItem('avoidSquaresHighPoints', '0');
        }
        //localStorage.setItem('avoidSquaresHighPoints', '0');
        lolol = localStorage.getItem('avoidSquaresHighPoints');
        console.log(lolol);
        console.log(localStorage.getItem('avoidSquaresHighPoints'));
        */

        var textLvl2 = this.add.text(this.world.centerX, 220, 'level', { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textLvl2.anchor.setTo(0.5, 0.5);

        textLvl = this.add.text(this.world.centerX, 280, '1', { font: "96px Arial", fill: "rgb(100,100,100)", align: "center" });
        textLvl.anchor.setTo(0.5, 0.5);

        textPoints2 = this.add.text(this.world.centerX, 420, 'points', { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textPoints2.anchor.setTo(0.5, 0.5);

        textPoints = this.add.text(this.world.centerX, 480, '0', { font: "96px Arial", fill: "rgb(100,100,100)", align: "center" });
        textPoints.anchor.setTo(0.5, 0.5);

        var textHighScore2 = this.add.text(this.world.centerX, 550, 'highscore', { font: "16px Arial", fill: "rgb(100,100,100)", align: "center" });
        textHighScore2.anchor.setTo(0.5, 0.5);

        textHighScore = this.add.text(this.world.centerX, 580, localStorage.getItem("avoidSquaresHighPoints"), { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textHighScore.anchor.setTo(0.5, 0.5);

        this.paused = false;
 /*
        keyPause = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
       keyPause.onDown.add(function () {
            if (this.paused == false) {
                this.paused = true;
                console.log("P1");
                console.log(this.paused);
            }
            else {
                this.paused = false;
                console.log("P2");
                console.log(this.paused);
            } 
        });

        window.onkeydown = function (event) {
            console.log("ok")
            if (keyPause.onDown) {
                console.log("P");
                console.log(this.paused);
                this.paused = true;
                console.log(this.paused);
            }
        }

       window.onkeydown = function () {
           if (this.input.keyboard.event.keyCode == 80) {
               this.paused = !this.paused;
           }
       }
*/
    ///    this.helpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
    ///    this.helpKey.onDown.add(this.startInstructions, this);
        //keyMute = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        //keyMute.onDown.add(addPhaserLogo, this);

        //this.game.input.onDown.add(this.requestLock, this);
        //this.canvas.addEventListener('mousedown', this.requestLock);
        this.input.addMoveCallback(this.moveMouse, this);
        //this.input.mouse.mouseOverCallback = this.moveMouse(this);
        this.game.input.onDown.add(this.requestLock, this);
        //this.game.input.onHold.add(this.requestLock, this);
        
        this.game.input.mouse.mouseOutCallback = function () { this.paused = true; };
        this.game.input.mouse.mouseOverCallback = function () { this.paused = false; };

        this.physics.startSystem(Phaser.Physics.ARCADE);

        enemies = this.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        

        player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.5);
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        bgmusic = this.sound.add('bggame');
        bgmusic.volume = 0.5;
        bgmusic.loop = true;
        bgmusic.play();

        //timer = this.time.create(false);
        //timer.add(1000, createEnemy);
        //timer.loop(1000, createEnemy);
        //timer.start();
/*
        for (var i = 0; i < 20; i++)
        {
            this.createEnemy(this);
            //enemy = enemies.create(64 + Math.random() * 872, -64, 'enemy');
            //this.physics.enable(enemy, Phaser.Physics.ARCADE);
            //enemy.pendingMove = false;
            //enemy.body.velocity.y = 200;
        }
*/
        //  POINTS TIMER
 //   timerPoints = this.time.create(false);
 //   timerPoints.loop(enemyInterval, this.updatePoints, this);
 //   timerPoints.start();


    timerLvlUp = this.time.create(false);
    timerLvlUp.loop(17500, this.updateLvl, this);
    timerLvlUp.start();
        
        this.startEnemies();

        //cursors = this.input.keyboard.createCursorKeys();
        
    },

    requestLock: function () {
    this.game.input.mouse.requestPointerLock();
    },

    moveMouse: function (pointer, x, y, click) {

    //  If the cursor is locked to the game, and the callback was not fired from a 'click' event
    //  (such as a mouse click or touch down) - as then it might contain incorrect movement values
    if (this.game.input.mouse.locked && !click)
    {
        player.x += this.game.input.mouse.event.movementX*0.5;
        player.y += this.game.input.mouse.event.movementY*0.5;
    }
        
    },

    updatePoints: function(){
        points++;
        textPoints.setText(points);
    },

    updateLvl: function () {
        lvl++;

        if (lvl < 8) {
            enemyVelocity += 50;
            enemyInterval *= 0.8;
        }
        else if (lvl < 13) {
            enemyVelocity += 40;
            enemyInterval *= 0.9;
        }
        else {
            enemyVelocity += 30;
            enemyInterval *= 0.97;
        }

        textLvl.setText(lvl);
    },

    startEnemies: function(){
        this.time.events.add(enemyInterval, function () {
            this.createEnemy(this);
            this.updatePoints(this);
            this.startEnemies();
            
        },this);
    },

    update: function () {
        this.stage.backgroundColor = '#3B3738';

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.angle += 5;
/*
        if (cursors.left.isDown) {
            player.body.velocity.x = -playerVelocity;
            player.angle -= 5;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = playerVelocity;
            player.angle += 3;
        }

        if (cursors.up.isDown) {
            player.body.velocity.y = -playerVelocity;
            player.angle += 1;
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y = playerVelocity;
            player.angle -= 3;
        }
*/
        enemies.forEach(function (enemy) {
            if (enemy.y > 700) {
                enemy.kill();
            }
        }


        );

        textHighScore.text = localStorage.getItem("avoidSquaresHighPoints");

        this.game.physics.arcade.overlap(player, enemies, this.collisionHandler, null, this);

/*
        // loop through our 'assets' group
        enemies.forEach(function (enemy) {
            // check to see if the enemy is fully outside of the camera and is not currently being repositioned
            if (enemy.y>500 && !enemy.pendingMove) {
                // set our 'pendingMove' flag so the object isn't checked again
                enemy.pendingMove = true;
                // stop the enemy moving (if using physics)
                enemy.body.velocity.setTo(0, 0);
                // create a timer which waits between 10 and 500ms then repositions the enemy randomly within the game world
                // and resets our 'pendingMove' flag so it can be checked again in the future
                this.time.events.add(this.rnd.integerInRange(10, 500), function () {
                    enemy.position.setTo(Math.random() * 1000, 0);
                    enemy.pendingMove = false;
                }
                );
            }
        }
        );
*/
       // if(enemies_count<20)
        //     this.createEnemy(this);
        /*
        if (this.physics.arcade.distanceToPointer(player) > 1000)
        {
            this.physics.arcade.moveToPointer(player, 1000, 1);
        }
        else
        {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
        */
        
    },

    collisionHandler: function () {
        console.log(' Colission detected! ');
        this.stage.backgroundColor = '#6688ee';
        this.gameOver(this);
    },

    render: function () {
        /*
        this.game.debug.text('lvl: ' + lvl, 32, 32);
        this.game.debug.text('points: ' + points, 32, 48);
        this.game.debug.text('enemyVelocity: ' + enemyVelocity, 32, 64);
        this.game.debug.text('enemyInterval: ' + enemyInterval, 32, 80);
        */
    },

    
    createEnemy: function () {

        //var enemy = this.add.sprite(this.world.randomX, -64, 'enemy');
        var enemy = enemies.create(Math.random() * 936, -100, 'enemy');
        enemy.scale.setTo(Math.random()+0.5);
        this.physics.enable(enemy, Phaser.Physics.ARCADE);

        enemy.body.velocity.y = enemyVelocity+50-Math.random()*100;
        // enemy.body.collideWorldBounds = false;
        enemy.checkWorldBounds = true;
        //enemies.events.onOutOfBounds.add(enemyOut, this);
        //enemy.onOutOfBounds.add(enemyOut, this);

         enemies_count++;
    },

    enemyOut: function (obj) {
        enemies_count--;
        obj.kill();
    },

    gofull: function () {

        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        }
        else {
            this.scale.startFullScreen(false);
        }

    },

    gameOver: function(){

        if (localStorage.getItem('avoidSquaresHighPoints') === null) {

            localStorage.setItem('avoidSquaresHighPoints', points);

    }
        else if (points > localStorage.getItem('avoidSquaresHighPoints')) {

            localStorage.setItem('avoidSquaresHighPoints', points);
        }
        //Phaser.Mouse.pointerLock = false;
        bgmusic.destroy();
        this.game.input.mouse.locked = false;

        this.state.start('GameOver');
    }
};
