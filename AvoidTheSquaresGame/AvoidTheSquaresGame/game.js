
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

        this.stage.backgroundColor = '#3B3738';

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

        this.input.addMoveCallback(this.moveMouse, this);

        this.game.input.onDown.add(this.requestLock, this);


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


        timerLvlUp = this.time.create(false);
        timerLvlUp.loop(17500, this.updateLvl, this);
        timerLvlUp.start();

        this.startEnemies();

        this.muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.muteKey.onDown.add(this.muteBgmusic, this);
    },

    requestLock: function () {
        this.game.input.mouse.requestPointerLock();
    },

    moveMouse: function (pointer, x, y, click) {
        if (this.game.input.mouse.locked && !click) {
            player.x += this.game.input.mouse.event.movementX * 0.5;
            player.y += this.game.input.mouse.event.movementY * 0.5;
        }

    },

    updatePoints: function () {
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

    startEnemies: function () {
        this.time.events.add(enemyInterval, function () {
            this.createEnemy(this);
            this.updatePoints(this);
            this.startEnemies();

        }, this);
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

        enemies.forEach(function (enemy) {
            if (enemy.y > 700) {
                enemy.kill();
            }
        }
        );

        textHighScore.text = localStorage.getItem("avoidSquaresHighPoints");

        this.game.physics.arcade.overlap(player, enemies, this.collisionHandler, null, this);

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
        var enemy = enemies.create(Math.random() * 936, -100, 'enemy');
        enemy.scale.setTo(Math.random() + 0.5);
        this.physics.enable(enemy, Phaser.Physics.ARCADE);

        enemy.body.velocity.y = enemyVelocity + 50 - Math.random() * 100;
        enemy.checkWorldBounds = true;
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

    gameOver: function () {

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
        console.log("score/points", playerScore.score, points)
        if (localStorage.getItem('allPlayerScores') === null) {

            allPlayerScores.push(playerScore);
            localStorage.setItem('allPlayerScores', JSON.stringify(allPlayerScores));
        }
        else {
            allPlayerScores = JSON.parse(localStorage.getItem('allPlayerScores'));
        }


        objIndex = allPlayerScores.findIndex((obj => obj.nick == nickname));

        if (objIndex === -1) {
            allPlayerScores.push(playerScore);
        }
        else {
            if (allPlayerScores[objIndex].score < points) {
                allPlayerScores[objIndex].score = points;
            }
        }

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
            break;
        }
    }
}
