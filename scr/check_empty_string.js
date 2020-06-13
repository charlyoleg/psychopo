// check_empty_string.js

const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

console.info("check_empty_string.js");

const starting_dir = path.join(__dirname, "..", "audio");
const directories = fs.readdirSync(starting_dir, {withFileTypes: true})
  .filter(c => c.isDirectory())
  .map(c => c.name);

err_nb = 0;
for (const category of directories) {
  // ===== read json file
  //console.log("category: " + category);
  const json_path = path.join( __dirname, '..', 'audio', category,  category + '_list.json');
  console.log("=====> json5 file path: " + json_path);
  let json_txt = "";
  try {
    json_txt = fs.readFileSync(json_path);
    //console.log(json_txt);
  } catch(err) {
    console.error("ERR014: error by reading file " + json_path + " : " + err);
    process.exit(1);
  }
  let json_obj = {};
  try {
    json_obj = JSON5.parse(json_txt);
  } catch(err) {
    console.error("ERR018: error by parsing file " + json_path + " : " + err);
  }
  // ===== category
  if(json_obj.category === ''){
    console.log('check: ' + category + ' : Empty Category');
    err_nb += 1;
  }
  // ===== check titles
  for (const track of json_obj.podcasts) {
    if(track.title === ''){
      console.log('check: ' + category + ' : ' + track.url + ' : Empty title');
      err_nb += 1;
    }
    if(track.date === ''){
      console.log('check: ' + category + ' : ' + track.url + ' : Empty date');
      err_nb += 1;
    }
  }
};
console.log('Check error number: ' + err_nb);

