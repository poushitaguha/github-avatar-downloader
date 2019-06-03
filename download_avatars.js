var secretRequest = require('./secrets');
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secretRequest.GITHUB_TOKEN
    }
};

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
    console.log(data[i].avatar_url);
   }
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});