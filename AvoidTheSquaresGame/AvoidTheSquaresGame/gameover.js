
GameStates.GameOver = function (game) {

};

GameStates.GameOver.prototype = {
    create: function () {
        // create main menu text and images -
        // create a "Start Game" mechanism - variety of ways to do this...

        this.stage.backgroundColor = '#3B3738';

        this.gosound = this.sound.add('gameoversound');
        this.gosound.volume = 0.7;
        this.gosound.play();

        this.text1 = this.add.text(this.world.centerX, this.world.centerY-230, "GAME OVER", { font: "128px monospace", fill: "#fff", align: "center" });
        this.text1.anchor.setTo(0.5, 0.5);

        this.text2 = this.add.text(this.world.centerX, this.world.centerY - 100, "level\n"+lvl, { font: "32px monospace", fill: "#fff", align: "center" });
        this.text2.anchor.setTo(0.5, 0.5);

        this.text3 = this.add.text(this.world.centerX, this.world.centerY, "points\n"+points, { font: "32px monospace", fill: "#fff", align: "center" });
        this.text3.anchor.setTo(0.5, 0.5);

        var b1 = this.game.add.button(this.world.centerX, this.world.centerY + 100, 'menuButton', this.startGame, this, 2, 1, 0);
        b1.anchor.setTo(0.5, 0.5);
        b1.scale.setTo(0.7, 0.7);

        //b1.onInputOver.add(this.over, this);
        //b1.onInputOut.add(this.out, this);
        //b1.onInputUp.add(this.up, this);

        var textB1 = this.add.text(b1.x, b1.y, "RESTART", { font: "32px monospace", fill: "#fff", align: "center" });
        textB1.anchor.setTo(0.5, 0.5);

        var textB1_2 = this.add.text(b1.x, b1.y+24, "[ enter ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB1_2.anchor.setTo(0.5, 0.5);

        var b2 = this.game.add.button(this.world.centerX, this.world.centerY + 200, 'menuButton', this.startMainMenu, this, 2, 1, 0);
        b2.anchor.setTo(0.5, 0.5);
        b2.scale.setTo(0.7, 0.7);

        //b2.onInputOver.add(this.over, this);
        //b2.onInputOut.add(this.out, this);
        //b2.onInputUp.add(this.up, this);

        var textB2 = this.add.text(b2.x, b2.y, "MAIN MENU", { font: "32px monospace", fill: "#fff", align: "center" });
        textB2.anchor.setTo(0.5, 0.5);

        var textB2_2 = this.add.text(b2.x, b2.y+24, "[ backspace ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB2_2.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.startGame, this);

        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escKey.onDown.add(this.startMainMenu, this);

        this.backspaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.backspaceKey.onDown.add(this.startMainMenu, this);

    },

    update: function () {

    },

    startGame: function () {
        this.state.start('Game');
    },

    startMainMenu: function () {
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