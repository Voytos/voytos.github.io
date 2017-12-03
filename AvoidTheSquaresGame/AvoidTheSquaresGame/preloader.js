﻿
GameStates.Preloader = function (game) {
    this.preloadBar = null;
};

GameStates.Preloader.prototype = {
    preload: function () {
        this.stage.backgroundColor = '#3B3738';

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+300, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.preloadBar.scale.setTo(2);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('logo', 'assets/logo.png');
        this.load.image('menuButton', 'assets/menu_button.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/redsquare.png');
        this.load.audio('bgmenu', 'assets/POL-smiley-island-short.wav');
        this.load.audio('bggame', 'assets/POL-chubby-cat-short.wav');
        this.load.audio('gameoversound', 'assets/game_over.mp3');
    },

    create: function () {

        //this.stage.backgroundColor = '#3B3738';

        //this.enterKeyy = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
       // this.enterKeyy.onDown.add(this.startMainMenu, this);

        this.state.start('MainMenu');
    },

    startMainMenu: function () {
        this.state.start('MainMenu');
    }
};