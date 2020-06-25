var assert = require('assert');
const CommandHandler = require('../lib/CommandHandler');
const Player = require('../lib/Player');
const Game = require('../lib/game');
const request = require('supertest');
const app = require('../app');

let baseJSON = {
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
  "text": "@testuser! Would you like to play a game of Tic Tac Toe !",
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

describe('Post command usage /ttt', function() {
  describe('Blank Command', function() {
    it('Check the usage', function(done) {
      let json = baseJSON;
      json.text = "";
      request(app)
        .post("")
        .send(json)
        .end(function(err, resp) {
            assert.ifError(err);
            let body = resp.body;
            assert.equal(JSON.stringify({"text":"Usage: /ttt @usrename, /ttt quit, /ttt status"}), JSON.stringify(body));
            done();
          });
    });
  });
});

describe('Command challenge a user', function() {
  describe('Challenge', function() {
    it('Check payload is valid', function(done) {
      let json = baseJSON;
      json.text = "@testuser";
      request(app)
        .post("")
        .send(json)
        .end(function(err, resp) {
            assert.ifError(err);
            let body = resp.body;
            assert.equal(JSON.stringify(resultData), JSON.stringify(body));
            done();
          });
    });
  });
});

describe('Controller check valid token', function() {
  describe('Return unauthorized', function() {
    it('Check payload is unauthorized', function(done) {
      let json = baseJSON;
      json.text = "@testuser";
      json.token = "somethingelse"
      request(app)
        .post("")
        .send(json)
        .end(function(err, resp) {
            assert.ifError(err);
            let body = resp.body;
            assert.equal(JSON.stringify({"text":"Unauthorized"}), JSON.stringify(body));
            done();
          });
    });
  });
});
