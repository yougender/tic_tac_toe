'use strict'

const Board = require('./board');

class Game {
  constructor(player1, player2) {

    this.board = new Board();
    this.player1 = player1;
    this.player2 = player2;

    // set the current player to be player1
    this.players = [player1, player2];
    this.currentPlayer = player1;

    this.results = {
      win: false,
      tied: false,
      err: '',
      winner: null
    }
    this._alternate();
  }

  /*
  make a move
  */

  move(move, playerid, username) {

    this.results.err = '';
    if (playerid != this.currentPlayer.id || username != this.currentPlayer.username) {
      this.results.err = 'WP';
      return this.results;
    }

    if(this.board.move(move, playerid) != null){
      this.results.err = this.board.move(move, playerid);
      return this.results;
    }
    
    // Check if there is winner

    var winplayer = this.board.checkWinner();


    if (winplayer && winplayer != 'E' && winplayer != 'D') {
      this._winner(winplayer);
      this.results.win = true;
      this.results.winner = winplayer;
      return this.results;
    } else if(winplayer && winplayer == 'D'){
      this.results.tied = true;
      return this.results;
    }

    this._alternate();

    return this.results;
  }

  /**
  * Generate the board with proper ui
  */
  generateBoard(textMsg) {
   var array = this.board.getBoardData();

   
   if(this.results.err != '' && this.results.err == 'WP'){
      textMsg = "Wrong player";
   }
   else if(textMsg == ""){
      textMsg = this.currentPlayer.username + " turn to play";
   }

   let data = { 
                 text: textMsg ,
                 response_type: 'ephemeral',
                 attachments: [
                                {
                                  callback_id: "tic_tac_game",
                                  fallback: "Your are unable to choose a game",
                                  attachment_type: "default",
                                  actions: [
                                      {
                                          name: "0",
                                          text: array[0],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      },
                                      {
                                          name: "1",
                                          text: array[1],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      },
                                      {
                                          name: "2",
                                          text: array[2],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      }
                                  ]
                                },
                                {
                                  callback_id: "tic_tac_game",
                                  fallback: "You are unable to choose a game",
                                  attachment_type: "default",
                                  actions: [
                                      {
                                          name: "3",
                                          text: array[3],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      },
                                      {
                                          name: "4",
                                          text: array[4],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      },
                                      {
                                          name: "5",
                                          text: array[5],
                                          type: "button",
                                          value: this.currentPlayer.id
                                      }
                                  ]
                              },
                              {
                                callback_id: "tic_tac_game",
                                fallback: "You are unable to choose a game",
                                attachment_type: "default",
                                actions: [
                                    {
                                        name: "6",
                                        text: array[6],
                                        type: "button",
                                        value: this.currentPlayer.id
                                    },
                                    {
                                        name: "7",
                                        text: array[7],
                                        type: "button",
                                        value: this.currentPlayer.id
                                    },
                                    {
                                        name: "8",
                                        text: array[8],
                                        type: "button",
                                        value: this.currentPlayer.id
                                    }
                                ]
                              }
                            ]
                  };

    return data;
  }

  /**
  *  Find winner
  */
  _winner(player) {
    if (player == 'D') this.results.tied = true;
    this.results.winner == player;
  }

  /**
  * this function swaps player
  */
  _alternate() {

    if (this.currentPlayer == this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  }
}

module.exports = Game;