 // Read and set environment variables
var configDotenv = require('dotenv').config();
var keys = require('./keys.js');

//set Twitter variables
var Twitter = require('twitter');
var params = {screen_name: 'clemmie0913', count: 20}; 
var client = new Twitter(keys.twitter);

//set Spotify variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//need request module for OMDB API request
var request = require('request');

//setting the command and input variables from the process.argv array
var command = process.argv[2];
var input = process.argv[3];

//Function to grab the last 20 tweets for the my-tweets command
function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
        if (!error && response.statusCode == 200) {
            console.log('=================================');
            console.log('Latest Tweets:');
            
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log('=================================');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log('=================================');
            }
        }
    });
}

//creating the function for the spotify-this-song-command
function spotifyThis(input) {
    
    // If the user fails to specify a song, return "The Sign" by Ace of Base.
    if (input == null) {
        input = 'The Sign Ace of Base';
    }
    
    
    // Create the search of the spotify and input our parameters
    spotify.search({ type: 'track', query: input }, function(error, data) {
        if (!error && input != null) {
          for (var i = 0; i < data.tracks.items.length; i++) {
            var artists = data.tracks.items[i].artists[0].name; 
            var name = data.tracks.items[i].name;
            var preview = data.tracks.items[i].preview_url;
            var album = data.tracks.items[i].album.name;
            
            console.log('=================================');
            console.log('Artist: ' + artists);
            console.log('Song Title: '+ name);
            console.log('Preview URL: '+ preview);
            console.log('Album Title: '+ album);
            console.log('=================================');
          }  
        } else {
            console.log("Error occurred: " + error);
         }
    })
}

function movieThis(input) {
    // If the user doesn't specify a movie, return Mr. Nobody
    if (input == null) {
        input = 'Mr. Nobody';
    }
        request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    
            if (!error && response.statusCode === 200) {                
                console.log('===========================================');
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released in: " + JSON.parse(body).Year);
                console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country produced in: " + JSON.parse(body).Country);
                console.log("Language spoken: " + JSON.parse(body).Language); 
                console.log("Plot description: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log('===========================================');
            
            } else {
                
                console.log("Error: "+ error);
            
            }
    });
}


//Switch set up to call the functions for each of LIRI's commands
switch (command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis(input);
        break;
    case 'movie-this':
        movieThis(input);
        break;
    default: 
		console.log("That's not a valid command");
	}


