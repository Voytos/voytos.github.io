
var bgmenusound;
var bgmenusoundIsPlaying = false;
var b2;
var nicknameInput;
var nickname;
var nicknameText = "Enter your nickname to save highscore ->";

var settingsKey;

GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {

      //  if (!bgmenusoundIsPlaying)
      //  {
            bgmenusound = this.sound.add('bgmenu');
            bgmenusound.volume = 0.01 * volume;
            bgmenusound.loop = true;
            if (!bgmenusound.isPlaying)
            {
                bgmenusound.play();
            }
            
           // bgmenusoundIsPlaying = true;
      //  }
        
        //bgmenusound.volume = 0.1;

            this.stage.backgroundColor = '#3B3738';

            
            
        var logo = this.add.sprite(this.world.centerX, this.world.centerY-190, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.7, 0.7);
        this.add.tween(logo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true);
        
        //this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 650, "Press Enter to start", { font: "20px monospace", fill: "#fff", align: "center" });
        //this.loadingText.anchor.setTo(0.5, 0.5);
        nicknameText = "Hi " + nickname + "!";
        var textNickname = this.add.text(this.game.world.centerX, 350, nicknameText, { font: "32px monospace", fill: "#fff", align: "center" });
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

        b2.onInputOver.add(this.over, this);
        //b2.onInputOut.add(this.out, this);
        //b2.onInputUp.add(this.up, this);

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
            //this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //this.enterKey.onDown.add(this.startGame, this);

            //this.helpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
            //this.helpKey.onDown.add(this.startInstructions, this);

            //this.settingsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            //this.settingsKey.onDown.add(this.startSettings, this);
            //settingsKey.enabled = true;
            this.paused = false;
        };

        this.game.input.mouse.mouseOutCallback = function () {
            //this.enterKey=this.game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
            //this.helpKey=this.game.input.keyboard.removeKey(Phaser.Keyboard.H);
            //this.settingsKey=this.game.input.keyboard.removeKey(Phaser.Keyboard.S);
            //this.enterKey.enabled = false;
            //this.helpKey = this.game.input.keyboard.removeKey(Phaser.Keyboard.H);
            //settingsKey.enabled = false;
            
            this.paused = true;
        };
        
        
/*canvasinput
        nicknameInput = this.createInput(this.game.world.centerX, 350);
        nicknameInput.anchor.set(0.5);
        nicknameInput.canvasInput.value('lolo');
        //nicknameInput.inputFocus;
        nicknameInput.canvasInput.focus();
        
        //nickname = nicknameInput.canvasInput.selectText;
        console.log("nicknamestart",nickname);
        */
    },

    update: function () {
        //nickname = document.getElementById("nickname").value;
        //console.log("nickaname_right: ", nickname);
        nicknameText = "Hi " + nickname + "!";
        //textNickname.setText(nicknameText);
    },

    startGame: function () {
        bgmenusound.destroy();
        this.state.start('Game');
    },

    startInstructions: function () {
        //nickname = nicknameInput.selectText;
        //console.log("nextstatenickname", nickname);
        this.state.start('Instructions');
    },

    startSettings: function () {
        this.state.start('Settings');
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
},

inputFocus: function (sprite) {
    sprite.canvasInput.focus();
},
createInput: function (x, y) {
    var bmd = this.add.bitmapData(400, 50);
    var myInput = this.game.add.sprite(x, y, bmd);

    myInput.canvasInput = new CanvasInput({
        canvas: bmd.canvas,
        fontSize: 30,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 400,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Enter your nickname.',
        onsubmit: function () {
            //nickname = nicknameInput.selectText;
            //nickname = nicknameInput.text;
            nickname = myInput.selectText;
            //nicknameInput.selectText(nickname);
            //nickname = nicknameInput.value;
            console.log("onsubmitnickname", nickname);
            //nicknameInput.destroy;
            myInput.destroy;
        }
    });
    myInput.inputEnabled = true;
    myInput.input.useHandCursor = true;
    myInput.events.onInputUp.add(this.inputFocus, this);

    return myInput;
},

};
