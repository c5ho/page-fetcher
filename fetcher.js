const fs = require('fs');
const request = require('request');
const args = process.argv;

const URL = args.slice(2, 3)[0];
const localPath = args.slice(3, 4)[0];

console.log('-------------------');
console.log('Request URL: ', URL);
console.log('Local Path for file: ', localPath);

request(URL, (error, response, body) => {
  //Print the error if one occurred
  console.log('error:', error); 
  //Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode); 
  //Print the HTML for the page.
  //console.log('body:', body); //contents of site loaded is stored in "body"
 
  fs.writeFile(localPath, body, err => { //write "body" to file
    if (err) {
      console.error(err);
    };
    // file written successfully
    console.log('File written successfully.');
    
    fs.stat(localPath, (err, stats) => {
      if (err) {
          console.log(`File doesn't exist.`);
      } else {
          console.log(`File size: ${stats.size} bytes`);
      }
    });
  });
 });


