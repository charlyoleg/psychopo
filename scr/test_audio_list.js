// test_audio_list.js

afunc = require("../src/_data/audio_lists.js");

console.info("Testing audio_list.js ...");

afunc().then(result => {
  console.log("audio_list created:");
  console.log(result);
}).catch(err => {
  console.error("ERR007: " + err);
});


