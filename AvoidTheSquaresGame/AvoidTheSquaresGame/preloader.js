
GameStates.Preloader = function (game) {
    this.preloadBar = null;
};

GameStates.Preloader.prototype = {
    preload: function () {
        this.stage.backgroundColor = '#3B3738';

        this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 200, "Loading...", { font: "20px monospace", fill: "#fff", align: "center" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+300, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.preloadBar.scale.setTo(2);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('logo', 'assets/logo.png');
        this.load.image('menuButton', 'assets/menu_button.png');
        this.load.image('menuArrow', 'assets/menu_arrow.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/redsquare.png');
        this.load.audio('bgmenu', 'assets/POL-smiley-island-short.wav');
        this.load.audio('bggame', 'assets/POL-chubby-cat-short.wav');
        this.load.audio('gameoversound', 'assets/game_over.mp3');
    },

    create: function () {
        this.state.start('NickMenu');
    },

    startMainMenu: function () {
        this.state.start('MainMenu');
    }
};