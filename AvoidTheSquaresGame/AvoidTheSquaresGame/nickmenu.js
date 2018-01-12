
GameStates.NickMenu = function (game) {

};

GameStates.NickMenu.prototype = {

    create: function () {

        
        var nickPrompt = prompt("Please enter your nickname:", "");
        if (nickPrompt == null || nickPrompt == "") {
            this.state.start('NickMenu');
        } else {
            nickname = nickPrompt;
            this.state.start('MainMenu');
        }
        
    },
    
};
