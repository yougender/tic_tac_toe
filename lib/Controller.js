'use strict'

const Player = require('./Player');
const Game = require('./game');
const CommandHandler = require('./CommandHandler');
const Constants = require('../Constants');

let player1;
let player2;
let game;
let gameid = "";
let commandhandler = new CommandHandler();


class Controller {
	constructor() {
     
  	}
	controlGame(req, res){

	  let body = req.body;
	  let payload = body.payload;
	  let token = body.token || null;
	  let json_payload; 
	  let data;
	  let command = body.command || null;

	  try{
		  if (token == null) {
		    json_payload = JSON.parse(payload);
		    token = json_payload.token;
		  }

		  if(null == token || token !== Constants.token) {
		    data = {text: "Unauthorized"};
		    throw new Error('Token missing');
		  }

		  if(command){
		    // Call command handler for initiating the game and checking status and quiting the game
		    data = commandhandler.handleCommand(body, game, gameid);
		    player1 = new Player('X', req.body.user_name);
		    res.json(data);

		  } else{

		      // Handle all actions and manage the traffic
		      // Check if user is clicking on abandoned or old game
		      if(gameid == "" && !json_payload.actions){
		        data = {text: "Game has already ended, try to create a new one!"}
		        res.json(data);
		      }

		      if(payload != null && json_payload.actions){
		          if(json_payload.actions[0].name == "Accept"){

		            //Create a new Game  and assign players and start game.
		            player2 = new Player('O' , json_payload.user.name);
		            game = new Game(player1, player2);

		            //Assign a id to the game.
		            gameid = json_payload.channel.id;
		            data = game.generateBoard("");

		          } else if(gameid = json_payload.channel.id){

		            // Play interactively games between players
		            var result = game.move(json_payload.actions[0].name, json_payload.actions[0].value , json_payload.user.name);

		            if (result.win){
		              var winUser = result.winner == 'X' ? game.player1.username : game.player2.username;
		              data = game.generateBoard(winUser + "!! You are the TIC TAC TOE Champion" );
		              gameid = "";
		              game = null;
		                  
		            } else if(result.tied){
		              data = game.generateBoard("GAME TIED !!!!");
		              
		              // initialize the game
		              gameid = "";
		              game = null;

		            } else {
		              data = game.generateBoard("");
		              if(game.result) game.result.err = '';
		            }
		          }
		        }
		        res.json(data);
		  }
		} catch(Error){
			res.json(data);
		}
	}
}

module.exports = Controller;