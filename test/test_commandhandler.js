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
  "text": "abc turn to play",
  "response_type": "ephemeral",
  "attachments": [{
    "callback_id": "tic_tac_game",
    "fallback": "Your are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "0",
      "text": "E",
      "type": "button",
      "value": "X"
    }, {
      "name": "1",
      "text": "O",
      "type": "button",
      "value": "X"
    }, {
      "name": "2",
      "text": "E",
      "type": "button",
      "value": "X"
    }]
  }, {
    "callback_id": "tic_tac_game",
    "fallback": "You are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "3",
      "text": "E",
      "type": "button",
      "value": "X"
    }, {
      "name": "4",
      "text": "E",
      "type": "button",
      "value": "X"
    }, {
      "name": "5",
      "text": "E",
      "type": "button",
      "value": "X"
    }]
  }, {
    "callback_id": "tic_tac_game",
    "fallback": "You are unable to choose a game",
    "attachment_type": "default",
    "actions": [{
      "name": "6",
      "text": "E",
      "type": "button",
      "value": "X"
    }, {
      "name": "7",
      "text": "E",
      "type": "button",
      "value": "X"
    }, {
      "name": "8",
      "text": "E",
      "type": "button",
      "value": "X"
    }]
  }]
}

describe('CommandHandler Testing', function() {
  describe('Check game challenge posted', function() {
    it('Return challenge to user', function() {

      let p1 = new Player('X' , 'abc');
      let p2 = new Player('Y' , 'xyz');
      let gameid = "";
      let game = new Game(p1, p2);
      let commandhandler = new CommandHandler();
      data = commandhandler.handleCommand(body, game, gameid);
      assert.equal(JSON.stringify(data), JSON.stringify(resultData));
    });
  });
});

describe('CommandHandler Testing', function() {
  describe('Check game already in channel', function() {
    it('Return text to confirm', function() {

      let p1 = new Player('X' , 'abc');
      let p2 = new Player('Y' , 'xyz');
      let gameid = "C9M04NJMB";
      let game = new Game(p1, p2);
      let commandhandler = new CommandHandler();
      data = commandhandler.handleCommand(body, game, gameid);
      assert.equal(JSON.stringify(data), JSON.stringify({text: "Game already in progress on this channel"}));
    });
  });
});

describe('CommandHandler Testing', function() {
  describe('Check game status', function() {
    it('Return game status', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let gameid = "1";
      let game = new Game(p1, p2);
      let result = game.move("1", "O" , "xyz");
      let commandhandler = new CommandHandler();
      let text = "status";
      body.text = text;
      data = commandhandler.handleCommand(body, game, gameid);
      assert.equal(JSON.stringify(data), JSON.stringify(statusData));
    });
  });
});

describe('CommandHandler Testing', function() {
  describe('Quit Game', function() {
    it('End game and return', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let gameid = "1";
      let game = new Game(p1, p2);
      let result = game.move("1", "O" , "xyz");
      let commandhandler = new CommandHandler();
      let text = "quit";
      body.text = text;
      data = commandhandler.handleCommand(body, game, gameid);
      assert.equal(JSON.stringify(data), JSON.stringify({text : "Game Ended!!"}));
    });
  });
});

describe('CommandHandler Testing', function() {
  describe('Emty command', function() {
    it('Print usage', function() {
      let p1 = new Player('X' , 'abc');
      let p2 = new Player('O' , 'xyz');
      let gameid = "1";
      let game = new Game(p1, p2);
      let commandhandler = new CommandHandler();
      let text = "";
      body.text = text;
      data = commandhandler.handleCommand(body, game, gameid);
      assert.equal(JSON.stringify(data), JSON.stringify({text: "Usage: /ttt @usrename, /ttt quit, /ttt status"}));
    });
  });
});




