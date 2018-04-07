 // Read and set environment variables
var configDotenv = require('dotenv').config();
var keys = require('./keys.js');

var Twitter = require('twitter');
var twitterHandle = 'clemmie0913';
var client = new Twitter(keys.twitter);



function myTweets() {
    client.get('statuses/user_timeline', twitterHandle, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            console.log(' ');
            console.log('Latest Tweets:');
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
            }
        }
    });
}

myTweets();


