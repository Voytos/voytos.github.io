window.onload = function () {

    var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game');

    game.state.add('Boot', GameStates.Boot);
    game.state.add('Preloader', GameStates.Preloader);
    game.state.add('NickMenu', GameStates.NickMenu);
    game.state.add('MainMenu', GameStates.MainMenu);
    game.state.add('Instructions', GameStates.Instructions);
    game.state.add('Settings', GameStates.Settings);
    game.state.add('Game', GameStates.Game);
    game.state.add('GameOver', GameStates.GameOver);


    if (localStorage.getItem('allPlayerScores') === null) {
    }
    else {
        allPlayerScores = JSON.parse(localStorage.getItem('allPlayerScores'));
    }

    var highscoresTable = "<table class=table>";

    highscoresTable += "<thead class=thead-inverse>";
    highscoresTable += "<tr>";
    highscoresTable += "<th>#</th>";
    highscoresTable += "<th>Nickname</th>";
    highscoresTable += "<th>Points</th>";
    highscoresTable += "</tr>";
    highscoresTable += "</thead>";

    var position = 0;
    var i = 0;
    var imax = 10;
    if (allPlayerScores.length < imax) imax = allPlayerScores.length;
    while (position < 10) {
        position++;
        if (i < imax) {
            highscoresTable += "<tr>";
            highscoresTable += "<th scope=row>" + position + "</th>";
            highscoresTable += "<td>" + allPlayerScores[i].nick + "</td>";
            highscoresTable += "<td>" + allPlayerScores[i].score + "</td>";
            highscoresTable += "</tr>";
        }
        else {
            highscoresTable += "<tr>";
            highscoresTable += "<th scope=row>" + position + "</th>";
            highscoresTable += "<td>" + "-" + "</td>";
            highscoresTable += "<td>" + "-" + "</td>";
            highscoresTable += "</tr>";
        }
        i++;
    }

    highscoresTable += "</table>";
    document.getElementById("table_highscore").innerHTML = highscoresTable;


    game.state.start('Boot');

};