
var GameStates = {

};

GameStates.Boot = function (game) {

};

GameStates.Boot.prototype = {
    preload: function () {

        this.load.image('preloaderBar', 'assets/preloader-bar.png');
    },
    create: function () {

        this.state.start('Preloader');
    }
};

