var assert = require('assert');
const CommandHandler = require('../lib/CommandHandler');
const Player = require('../lib/Player');
const Game = require('../lib/game');

let body = {
  "token": "testing",
  "team_id": "ssss",
  "team_domain": "doppa",
  "channel_id": "C9M04NJMB",
  "channel_name": "general",
  "user_id": "fffff",
  "user_name": "abc",
  "command": "/ttt",
  "text": "@yougender",
  "response_url": "https://hooks.slack.com/commands/T9MMJ02TG/330691486004/5FCYGPXRexdBaBRxgPUV9pqY",
  "trigger_id": "331567262422.327732002934.7bfd373047dfb01d7e5e94c6a75d3766"
}

let resultData = {
  "text": "@yougender! Would you like to play a game of Tic Tac Toe !",
  "response_type": "in_channel",
  "attachments": [{
    "text": "Click here to accept the challenge",
    "fallback": "gf",
    "callback_id": "tictactoe_game",
    "attachment_type": "default",
    "actions": [{
      "name": "Accept",
      "text": "Accept",
      "type": "button",
      "value": "accept"
    }]
  }]
}

let statusData = {
  "text": "xyz turn to play",
  "response_type": "ephemeral",
  "attachments": [{
    "callback_id": "tic_tac_game",
    "fallback": "Your are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "0",
      "text": "O",
      "type": "button",
      "value": "O"
    }, {
      "name": "1",
      "text": "X",
      "type": "button",
      "value": "O"
    }, {
      "name": "2",
      "text": "E",
      "type": "button",
      "value": "O"
    }]
  }, {
    "callback_id": "tic_tac_game",
    "fallback": "You are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "3",
      "text": "E",
      "type": "button",
      "value": "O"
    }, {
      "name": "4",
      "text": "E",
      "type": "button",
      "value": "O"
    }, {
      "name": "5",
      "text": "E",
      "type": "button",
      "value": "O"
    }]
  }, {
    "callback_id": "tic_tac_game",
    "fallback": "You are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "6",
      "text": "E",
      "type": "button",
      "value": "O"
    }, {
      "name": "7",
      "text": "E",
      "type": "button",
      "value": "O"
    }, {
      "name": "8",
      "text": "E",
      "type": "button",
      "value": "O"
    }]
  }]
}


describe('Game Testing', function() {
  describe('Generate correct data from board', function() {
    it('Board data', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let game = new Game(p1, p2);
      let result = game.move("0", "O" , "xyz");
      result = game.move("1", "X" , "abc");
      data = game.generateBoard('');
      assert.equal(JSON.stringify(data), JSON.stringify(statusData));
    });
  });
});

describe('Game Testing', function() {
  describe('Wrong player move', function() {
    it('Board data', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let game = new Game(p1, p2);
      let result = game.move("0", "O" , "xyz");
      result = game.move("1", "O" , "xyz");
      data = game.generateBoard('');
      assert.equal(data.text, "Wrong player");
    });
  });
});

describe('Game Testing', function() {
  describe('Check winner is undecided', function() {
    it('No winner yet', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let game = new Game(p1, p2);
      let result = game.move("0", "O" , "xyz");
      result = game.move("1", "X" , "abc");
      assert(JSON.stringify(result), "false");
    });
  });
});

describe('Game Testing', function() {
  describe('Check switch player', function() {
    it('players are switched', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let game = new Game(p1, p2);
      let result = game.move("0", "O" , "xyz");
      assert(game.currentPlayer.username, "abc");
      result = game.move("1", "X" , "abc");
      assert(game.currentPlayer.username, "xyz");
    });
  });
});







