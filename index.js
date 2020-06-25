'use strict'
  

const program = require('commander');
const app = require('./app');


program
.option('--port [port]', 'listen on port')
.parse(process.argv);

let port = process.env.PORT || 3000;

if (!port) {
  return program.help();
}

const server = app.listen(port, function(){
  console.log('Awesome running on this port ' + port);
});
