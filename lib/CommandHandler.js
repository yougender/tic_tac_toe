
'use strict'



class CommandHandler {
  constructor() {
     
  }

  handleCommand(body, game, gameid) {
    let commandArgs = body.text.split(" ")
    let firstArg = commandArgs[0];
    let data;

	  if(firstArg.indexOf("@") == -1){
	    switch (firstArg) {
	        case "status":
	            if(game != null) data = game.generateBoard(game.currentPlayer.username +  " turn to play");
	            break;
	        case "quit":
	            data = {text : "Game Ended!!"};
	            gameid = "";
	            game = null;
	            break;
	        case "":
	            data = {text: "Usage: /ttt @usrename, /ttt quit, /ttt status"};
	    }
	  }
	  else{
	     
	      if(gameid == body.channel_id){
	          data = {text: "Game already in progress on this channel"};
	      }else{
	          data = {
	                  text : firstArg + '! Would you like to play a game of Tic Tac Toe !',
	                  response_type: 'in_channel',
	                  attachments: [
	                      {
	                          text: 'Click here to accept the challenge',
	                          fallback: 'gf',
	                          callback_id: 'tictactoe_game',
	                          attachment_type: 'default',
	                          actions: [
	                              {
	                                  name: 'Accept',
	                                  text: 'Accept',
	                                  type: 'button',
	                                  value: 'accept'
	                              }
	                          ]
	                  }]
	                }; 
	      }
	     
	  }
    return data;
  }
}

module.exports = CommandHandler;