
GameStates.NickMenu = function (game) {

};

GameStates.NickMenu.prototype = {

    create: function () {

        
        var nickPrompt = prompt("Please enter your nickname:", "");
        if (nickPrompt == null || nickPrompt == "") {
            //txt = "User cancelled the prompt.";
            this.state.start('NickMenu');
        } else {
            //txt = "Hello " + person + "! How are you today?";
            nickname = nickPrompt;
            this.state.start('MainMenu');
        }
        
    },
    
};
