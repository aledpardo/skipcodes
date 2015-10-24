var http = require('http');
var twilio = require('twilio');
var express = require('express');
var bodyParser = require('body-parser');

var twilioSid = 'AC0d76a1ee1101757e790331dd76ea0d1b';
var twilioToken = 'BABIannaN!k0@l3';
var twilioClient = require('twilio')(twilioSid, twilioToken);

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

// Twilio will POST to this route when SMS/MMS is received
app.post('/twiml', function(req, res) {
  // Log the data sent by Twilio
  console.log(req.body);
  messageResponse('Hello World.', res);
});

// Launch the HTTP server serving the Express app
http.createServer(app).listen(process.env.PORT);

// Respond with TwiML indicating an SMS reply message
function messageResponse(message, res) {
  var resp = new twilio.TwimlResponse();
  resp.message(function() {
    this.body(message);
  });
  res.type('text/xml');
  res.send(resp.toString());
}
