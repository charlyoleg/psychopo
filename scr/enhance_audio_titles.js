// enhance_audio_titles.js

const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

console.info("enhance_audio_titles.js");

const starting_dir = path.join(__dirname, "..", "audio");
const directories = fs.readdirSync(starting_dir, {withFileTypes: true})
  .filter(c => c.isDirectory())
  .map(c => c.name);

for (const category of directories) {
  // ===== read json file
  //console.log("category: " + category);
  const json_path = 'audio/' + category + '/' + category + '_list.json';
  console.log("=====> json5 file path: " + json_path);
  let json_txt = "";
  try {
    json_txt = fs.readFileSync(json_path);
    //console.log(json_txt);
  } catch(err) {
    console.error("ERR014: error by reading file " + json_path + " : " + err);
  }
  let json_obj = {};
  try {
    json_obj = JSON5.parse(json_txt);
  } catch(err) {
    console.error("ERR018: error by parsing file " + json_path + " : " + err);
  }
  // ===== rework titles
  for (const track of json_obj.podcasts) {
    //console.log(track.title);
    better_title = track.title.replace(/_/g, ' ');
    //console.log(better_title);
    track.title = better_title;
  }
  // ===== back to file
  json_txt2 = "// " + category + '_list.json (json5 format)\n\n'
  json_txt2 += JSON5.stringify(json_obj, null,2);
  //console.log(json_txt2);
  try {
    fs.writeFileSync(json_path, json_txt2);
  } catch(err) {
    console.error("ERR053: error by writing file " + json_path + " : " + err);
  }
};

