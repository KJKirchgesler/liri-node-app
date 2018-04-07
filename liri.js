 // Read and set environment variables
var configDotenv = require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
//var spotify = new Spotify(keys.spotify);


var client = new Twitter(keys.twitter);




var params = {screen_name: 'clemmie0913'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
}); 


