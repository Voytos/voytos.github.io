
var bgmenusound;
var bgmenusoundIsPlaying = false;
var b2;
var nicknameInput;
var nickname;
var nicknameText=" ";

var settingsKey;

GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {

            bgmenusound = this.sound.add('bgmenu');
            bgmenusound.volume = 0.01 * volume;
            bgmenusound.loop = true;
            if (!bgmenusound.isPlaying)
            {
                bgmenusound.play();
            }
            

            this.stage.backgroundColor = '#3B3738';
     
        var logo = this.add.sprite(this.world.centerX, this.world.centerY-190, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.7, 0.7);
        this.add.tween(logo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true);
        
        nicknameText = "Hi " + nickname + "!";
        var textNickname = this.add.text(this.game.world.centerX, 370, nicknameText, { font: "32px monospace", fill: "#fff", align: "center" });
        textNickname.anchor.setTo(0.5, 0.5);

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

        var textB2 = this.add.text(b2.x, b2.y, "HOW TO PLAY", { font: "32px monospace", fill: "#fff", align: "center" });
        textB2.anchor.setTo(0.5, 0.5);

        var textB2_2 = this.add.text(b2.x, b2.y+24, "[ H ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB2_2.anchor.setTo(0.5, 0.5);

        b3 = this.game.add.button(this.world.centerX, this.world.centerY + 300, 'menuButton', this.startSettings, this, 2, 1, 0);
        b3.anchor.setTo(0.5, 0.5);
        b3.scale.setTo(0.7, 0.7);

        var textB3 = this.add.text(b3.x, b3.y, "SETTINGS", { font: "32px monospace", fill: "#fff", align: "center" });
        textB3.anchor.setTo(0.5, 0.5);

        var textB3_2 = this.add.text(b3.x, b3.y + 24, "[ S ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textB3_2.anchor.setTo(0.5, 0.5);
        
        
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.startGame, this);

        this.helpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        this.helpKey.onDown.add(this.startInstructions, this);

        settingsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        settingsKey.onDown.add(this.startSettings, this);
        

        this.game.input.mouse.mouseOverCallback = function () {
            this.paused = false;
        };

        this.game.input.mouse.mouseOutCallback = function () {
            this.paused = true;
        };
        
    },

    update: function () {
        nicknameText = "Hi " + nickname + "!";
    },

    startGame: function () {
        bgmenusound.destroy();
        this.state.start('Game');
    },

    startInstructions: function () {
        this.state.start('Instructions');
    },

    startSettings: function () {
        this.state.start('Settings');
    },

};
