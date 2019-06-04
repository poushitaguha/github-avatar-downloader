var secretRequest = require('./secrets');
var request = require('request');
var fs = require('fs');
// Obtain command line arguments for repository owner and repository name
var comLineArg = process.argv.splice(2);

if (comLineArg.length !== 2) {
 console.log("Please provide only two names - Repo Owner & Repo Name");
}

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
    if (err) {
       console.log("error occured:", err);
       } else if (res.statusCode === 200) {
        var data = JSON.parse(body);
        cb(err, data);
       }
 });
}

function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
         .on('error', function (err) {
          console.log(err);
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .pipe(fs.createWriteStream(filePath));
}

// Call function
getRepoContributors(comLineArg[0], comLineArg[1], function(err, result) {
 console.log("Errors:", err);
 result.forEach((element) => {
   console.log(element.avatar_url);
   downloadImageByURL(element.avatar_url,
     './avatars/' + element.login + '.png');
 });
});