
var tStep;
var counter = 0;
var step = Math.PI * 2 / 360;

GameStates.Instructions = function (game) {

};

GameStates.Instructions.prototype = {
    create: function () {
        // create main menu text and images -
        // create a "Start Game" mechanism - variety of ways to do this...

        this.stage.backgroundColor = '#3B3738';

        this.text1 = this.add.text(this.world.centerX, this.world.centerY-200, "The main goal of the game is to avoid red squares\nand get the most points.\nEvery level increases the number of points obtained,\nthe speed of squares and their number.", { font: "32px monospace", fill: "#fff", align: "center" });
        this.text1.anchor.setTo(0.5, 0.5);

        var bBack = this.game.add.button(this.world.centerX, this.world.centerY + 200, 'menuButton', this.startMainMenu, this, 2, 1, 0);
        bBack.anchor.setTo(0.5, 0.5);
        bBack.scale.setTo(0.7, 0.7);

        var textBBack = this.add.text(bBack.x, bBack.y, "BACK", { font: "32px monospace", fill: "#fff", align: "center" });
        textBBack.anchor.setTo(0.5, 0.5);

        var textBBack2 = this.add.text(bBack.x, bBack.y + 24, "[ backspace ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textBBack2.anchor.setTo(0.5, 0.5);


        player = this.game.add.sprite(this.world.centerX - 300, this.world.centerY - 50, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.7);

        this.text2 = this.add.text(this.world.centerX, this.world.centerY - 50, "- it's you, control with mouse", { font: "32px monospace", fill: "#fff", align: "center" });
        this.text2.anchor.setTo(0.5, 0.5);

        enemy = this.game.add.sprite(this.world.centerX - 300, this.world.centerY + 50 , 'enemy');
        enemy.anchor.setTo(0.5, 0.5);
        this.physics.enable(enemy, Phaser.Physics.ARCADE);

        this.text3 = this.add.text(this.world.centerX, this.world.centerY + 50, "- if you touch it, you die", { font: "32px monospace", fill: "#fff", align: "center" });
        this.text3.anchor.setTo(0.5, 0.5);

        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escKey.onDown.add(this.startMainMenu, this);

        this.backspaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.backspaceKey.onDown.add(this.startMainMenu, this);

        //this.physics.startSystem(Phaser.Physics.ARCADE);
        //enemy.body.velocity=0;
    },

    update: function () {

        player.angle += 5;

        tStep = Math.sin(counter);
        //console.log(tStep);
        enemy.body.x = this.world.centerX - 350 + tStep * 60;
        counter += step;
    },

    startMainMenu: function () {
        bgmenusound.destroy();
        this.state.start('MainMenu');
    },

up: function () {
    console.log('button up', arguments);
},

over: function () {
    console.log('button over');
    //this.b2.alpha = 0.2;
},

out: function() {
    console.log('button out');
}

};