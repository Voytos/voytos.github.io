
var player;
var bgmusic;
var bgmusicIsMuted = false;
var bgmusicText;
var textMusic;
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
var textHighScore;

var keyPause;
var paused_ = false;
var keyMute;
var muted_ = false;

var allPlayerScores = [];
var objIndex;

var nick;
var score;


GameStates.Game = function (game) {

};

GameStates.Game.prototype = {

    create: function () {

        //nickname = document.getElementById("nickname").value;
        //console.log("nickaname_right: ", nickname);

        enemies_count = 50;
        lvl = 1;
        playerVelocity = 700;
        points = 0;

        if (difficulty === 1) {
            enemyVelocity = 200;
            enemyInterval = 700;
        } else if (difficulty === 2) {
            enemyVelocity = 300;
            enemyInterval = 500;
        } else {
            enemyVelocity = 400;
            enemyInterval = 300;
        }

        if (localStorage.getItem('avoidSquaresHighPoints') === null) {
            localStorage.setItem('avoidSquaresHighPoints', points);
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

        var textDif2 = this.add.text(this.world.centerX, 110, 'difficulty', { font: "28px Arial", fill: "rgb(100,100,100)", align: "center" });
        textDif2.anchor.setTo(0.5, 0.5);

        textDif = this.add.text(this.world.centerX, 150, showDif, { font: "48px Arial", fill: "rgb(100,100,100)", align: "center" });
        textDif.anchor.setTo(0.5, 0.5);

        var textLvl2 = this.add.text(this.world.centerX, 250, 'level', { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textLvl2.anchor.setTo(0.5, 0.5);

        textLvl = this.add.text(this.world.centerX, 310, '1', { font: "96px Arial", fill: "rgb(100,100,100)", align: "center" });
        textLvl.anchor.setTo(0.5, 0.5);

        textPoints2 = this.add.text(this.world.centerX, 400, 'points', { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textPoints2.anchor.setTo(0.5, 0.5);

        textPoints = this.add.text(this.world.centerX, 460, '0', { font: "96px Arial", fill: "rgb(100,100,100)", align: "center" });
        textPoints.anchor.setTo(0.5, 0.5);

        var textHighScore2 = this.add.text(this.world.centerX, 550, 'global highscore', { font: "16px Arial", fill: "rgb(100,100,100)", align: "center" });
        textHighScore2.anchor.setTo(0.5, 0.5);

        textHighScore = this.add.text(this.world.centerX, 580, localStorage.getItem("avoidSquaresHighPoints"), { font: "32px Arial", fill: "rgb(100,100,100)", align: "center" });
        textHighScore.anchor.setTo(0.5, 0.5);

        textMusic = this.add.text(this.world.centerX, 680, "press M to mute music", { font: "24px Arial", fill: "rgb(100,100,100)", align: "center" });
        textMusic.anchor.setTo(0.5, 0.5);

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

    this.muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.muteKey.onDown.add(this.muteBgmusic, this);

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

    muteBgmusic: function () {
        if (!bgmusicIsMuted) {
            bgmusic.volume = 0;
            bgmusicIsMuted = true;
            bgmusicText = "press M to unmute music";
            textMusic.setText(bgmusicText);
        }
        else {
            bgmusic.volume = 0.5;
            bgmusicIsMuted = false;
            bgmusicText = "press M to mute music";
            textMusic.setText(bgmusicText);
        }
        
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

        playerScore = {
            nick: nickname,
            score: points
        }
        console.log("score/points",playerScore.score,points)
        if (localStorage.getItem('allPlayerScores') === null) {

            allPlayerScores.push(playerScore);
            localStorage.setItem('allPlayerScores', JSON.stringify(allPlayerScores));
        }
        else {
            allPlayerScores = JSON.parse(localStorage.getItem('allPlayerScores'));
        }

        //if(checkIss(allPlayerScores,))

        //var found = allPlayerScores.some(function (el) {
        //    return el.nick === nickname;
        //});

        //if (found) {
         //   allPlayerScores.push(playerScore);
        objIndex = allPlayerScores.findIndex((obj => obj.nick == nickname));

        if (objIndex === -1)
        {
            allPlayerScores.push(playerScore);
        }
        else {
            //objIndex = allPlayerScores.findIndex((obj => obj.nick == nickname));
            //if (allPlayerScores[objIndex].playerScore.score !== undefined) {
            if (allPlayerScores[objIndex].score < points) {
                allPlayerScores[objIndex].score = points;
            }

       /*             for (var i in allPlayerScores) {
                        if (allPlayerScores[i].nick == nickname) {
                            if(allPlayerScores[i].score < points){
                                allPlayerScores[i].score = points;
                            }

                            break;
                        }
                    } */
              //  }
            }
        

        //}

        

        allPlayerScores.sort(compareScores);

        localStorage.setItem('allPlayerScores', JSON.stringify(allPlayerScores));
        
        var highscoresTable = "<table class=table>";

        highscoresTable += "<thead class=thead-inverse>";
        highscoresTable += "<tr>";
        highscoresTable += "<th>#</th>";
        highscoresTable += "<th>Nickname</th>";
        highscoresTable += "<th>Points</th>";
        highscoresTable += "</tr>";
        highscoresTable += "</thead>";

        var position = 0;
        var i = 0;
        var imax = 10;
        if (allPlayerScores.length < imax) imax = allPlayerScores.length;
        while (position < 10) {
            position++;
            if (i < imax) {
                highscoresTable += "<tr>";
                highscoresTable += "<th scope=row>" + position + "</th>";
                highscoresTable += "<td>" + allPlayerScores[i].nick + "</td>";
                highscoresTable += "<td>" + allPlayerScores[i].score + "</td>";
                highscoresTable += "</tr>";
            }
            else {
                highscoresTable += "<tr>";
                highscoresTable += "<th scope=row>" + position + "</th>";
                highscoresTable += "<td>" + "-" + "</td>";
                highscoresTable += "<td>" + "-" + "</td>";
                highscoresTable += "</tr>";
            }
            i++;
        }

        highscoresTable += "</table>";
        document.getElementById("table_highscore").innerHTML = highscoresTable;

        //Phaser.Mouse.pointerLock = false;
        bgmusic.destroy();
        this.game.input.mouse.locked = false;

        this.state.start('GameOver');
    }
};

function compareScores(a, b) {
    if (a.score > b.score)
        return -1;
    if (a.score < b.score)
        return 1;
    return 0;
}

function changeScore(nick, score) {
    for (var i in projects) {
        if (projects[i].value == nick) {
            projects[i].score = score;
            break; //Stop this loop, we found it!
        }
    }
}
