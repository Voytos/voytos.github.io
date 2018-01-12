var tVol2;
var tDif2;
var difficulty = 1;
var showDif = "EASY";
var volume = 50;
var showVol = "50%";

GameStates.Settings = function (game) {

};

GameStates.Settings.prototype = {
    create: function () {

        this.stage.backgroundColor = '#3B3738';

        this.tDif = this.add.text(this.world.centerX, this.world.centerY - 170, "DIFFICULTY", { font: "32px monospace", fill: "#fff", align: "center" });
        this.tDif.anchor.setTo(0.5, 0.5);

        tDif2 = this.add.text(this.world.centerX, this.world.centerY - 120, showDif, { font: "24px monospace", fill: "#fff", align: "center" });
        tDif2.anchor.setTo(0.5, 0.5);

        var bl1 = this.game.add.button(tDif2.x - 120, tDif2.y, 'menuArrow', this.difficultyToLower, this, 2, 1, 0);
        bl1.anchor.setTo(0.5, 0.5);
        bl1.scale.setTo(0.7, 0.7);

        var textBl1 = this.add.text(bl1.x, bl1.y, "<", { font: "32px monospace", fill: "#fff", align: "center" });
        textBl1.anchor.setTo(0.5, 0.5);

        var br1 = this.game.add.button(tDif2.x + 120, tDif2.y, 'menuArrow', this.difficultyToHigher, this, 2, 1, 0);
        br1.anchor.setTo(0.5, 0.5);
        br1.scale.setTo(0.7, 0.7);

        var textBr1 = this.add.text(br1.x, br1.y, ">", { font: "32px monospace", fill: "#fff", align: "center" });
        textBr1.anchor.setTo(0.5, 0.5);


        this.tVol = this.add.text(this.world.centerX, this.world.centerY, "VOLUME", { font: "32px monospace", fill: "#fff", align: "center" });
        this.tVol.anchor.setTo(0.5, 0.5);

        tVol2 = this.add.text(this.world.centerX, this.world.centerY + 50, showVol, { font: "24px monospace", fill: "#fff", align: "center" });
        tVol2.anchor.setTo(0.5, 0.5);

        var bl2 = this.game.add.button(tVol2.x - 120, tVol2.y, 'menuArrow', this.volumeDown, this, 2, 1, 0);
        bl2.anchor.setTo(0.5, 0.5);
        bl2.scale.setTo(0.7, 0.7);

        var textBl2 = this.add.text(bl2.x, bl2.y, "<", { font: "48px monospace", fill: "#fff", align: "center" });
        textBl2.anchor.setTo(0.5, 0.5);

        var br2 = this.game.add.button(tVol2.x + 120, tVol2.y, 'menuArrow', this.volumeUp, this, 2, 1, 0);
        br2.anchor.setTo(0.5, 0.5);
        br2.scale.setTo(0.7, 0.7);

        var textBr2 = this.add.text(br2.x, br2.y, ">", { font: "40px monospace", fill: "#fff", align: "center" });
        textBr2.anchor.setTo(0.5, 0.5);


        var bBack = this.game.add.button(this.world.centerX, this.world.centerY + 200, 'menuButton', this.startMainMenu, this, 2, 1, 0);
        bBack.anchor.setTo(0.5, 0.5);
        bBack.scale.setTo(0.7, 0.7);

        var textBBack = this.add.text(bBack.x, bBack.y, "BACK", { font: "32px monospace", fill: "#fff", align: "center" });
        textBBack.anchor.setTo(0.5, 0.5);

        var textBBack2 = this.add.text(bBack.x, bBack.y + 24, "[ backspace ]", { font: "16px monospace", fill: "#fff", align: "center" });
        textBBack2.anchor.setTo(0.5, 0.5);
        

        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escKey.onDown.add(this.startMainMenu, this);

        this.backspaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.backspaceKey.onDown.add(this.startMainMenu, this);
    },

    difficultyToLower: function () {
        if (difficulty > 1)
        {
            difficulty--;
            if (difficulty === 1)
            {
                showDif = "EASY";
            }
            else
            {
                showDif = "MEDIUM";
            }
            tDif2.setText(showDif); 
        }
    },

    difficultyToHigher: function () {
        if (difficulty < 3) {
            difficulty++;
            if (difficulty === 3) {
                showDif = "HARD";
            }
            else {
                showDif = "MEDIUM";
            }
            tDif2.setText(showDif);
        }
    },

    volumeDown: function () {
        if (volume > 0)
        {
            console.log("before",volume);
            volume -= 10;
            if (volume === 0)
            {
                showVol = "MUTED";
            }
            else
            {
                showVol = volume + "%";
            }
            bgmenusound.volume = 0.01 * volume;
            tVol2.setText(showVol);
            console.log("after", volume);
        }
        
    },

    volumeUp: function () {
        if (volume < 100) {
            console.log("before", volume);
            volume += 10;
            //tVol2.setText(volume + "%");
            bgmenusound.volume = 0.01 * volume;
            showVol = volume + "%";
            tVol2.setText(showVol);
            console.log("after", volume);
        }
    },

    startGame: function () {
        this.state.start('Game');
    },

    startOptions: function () {
    //this.state.start('Game');
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

    out: function () {
        console.log('button out');
    }

};