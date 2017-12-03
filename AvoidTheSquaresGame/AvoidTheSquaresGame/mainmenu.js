
var bgmenusound;
var b2;

GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {

        bgmenusound = this.sound.add('bgmenu');
        bgmenusound.volume = 0.6;
        bgmenusound.loop = true;
        bgmenusound.play();

        this.stage.backgroundColor = '#3B3738';

        var logo = this.add.sprite(this.world.centerX, this.world.centerY-150, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.7, 0.7);
        this.add.tween(logo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true);

        //this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 650, "Press Enter to start", { font: "20px monospace", fill: "#fff", align: "center" });
        //this.loadingText.anchor.setTo(0.5, 0.5);

        var b1 = this.game.add.button(this.world.centerX, this.world.centerY + 100, 'menuButton', this.startGame, this, 2, 1, 0);
        b1.anchor.setTo(0.5, 0.5);
        b1.scale.setTo(0.7, 0.7);

        b1.onInputOver.add(this.over, this);
        b1.onInputOut.add(this.out, this);
        b1.onInputUp.add(this.up, this);

        var textB1 = this.add.text(b1.x, b1.y, "START", { font: "32px monospace", fill: "#fff", align: "center" });
        textB1.anchor.setTo(0.5, 0.5);

        var textB1_2 = this.add.text(b1.x, b1.y+24, "[ enter ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB1_2.anchor.setTo(0.5, 0.5);

        b2 = this.game.add.button(this.world.centerX, this.world.centerY + 200, 'menuButton', this.startInstructions, this, 2, 1, 0);
        b2.anchor.setTo(0.5, 0.5);
        b2.scale.setTo(0.7, 0.7);

        b2.onInputOver.add(this.over, this);
        //b2.onInputOut.add(this.out, this);
        //b2.onInputUp.add(this.up, this);

        var textB2 = this.add.text(b2.x, b2.y, "HOW TO PLAY", { font: "32px monospace", fill: "#fff", align: "center" });
        textB2.anchor.setTo(0.5, 0.5);

        var textB2_2 = this.add.text(b2.x, b2.y+24, "[ H ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB2_2.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.startGame, this);

        this.helpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        this.helpKey.onDown.add(this.startInstructions, this);
    },

    startGame: function () {
        bgmenusound.destroy();
        this.state.start('Game');
    },

    startInstructions: function () {
        this.state.start('Instructions');
    },

up: function () {
    console.log('button up', arguments);
    b2.scale.setTo(1.2);
},

over: function () {
    console.log('button over');
    //this.scale.setTo(1.05);
},

out: function() {
    console.log('button out');
}

};