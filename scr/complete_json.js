// complete_json.js

const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

console.info("complete_json.js");

const starting_dir = path.join(__dirname, "..", "audio");
const directories = fs.readdirSync(starting_dir, {withFileTypes: true})
  .filter(c => c.isDirectory())
  .map(c => c.name);

//console.dir(directories);
//process.exit();

const check_mp3_list = (category_slug, category_dir, json_name) => {
  json_path = path.join(category_dir, json_name);
  const json_path_name = 'audio/' + category_slug + '/' + category_slug + '_list.json';
  console.log("=====> json5 file path: " + json_path_name);
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
  // ===== check not exisiting url
  for (const track of json_obj.podcasts) {
    //console.log(track.url);
    if(! fs.existsSync(path.join(category_dir, track.url))){
      console.warn( 'Not existing file: ' + track.url);
    }
  }
  // ===== complete url list
  added_url = 0;
  urls = json_obj.podcasts.map(elem => elem.url);
  const mp3s = fs.readdirSync(category_dir, {withFileTypes: true})
    .filter(c => c.isFile())
    .filter(c => { return '.mp3' === path.extname(c.name); })
    .map(c => c.name);
  mp3s.forEach(mp3 => {
    //console.log('mp3: ' + mp3);
    if(! urls.find(f => {return mp3 === f})){
      console.log('Not listed mp3: ' + mp3);
      added_url += 1;
      json_obj.podcasts.push({
        'title': '',
        'date': '',
        'url': mp3,
      });
    }
  });
  console.log('Number of added urls: ' + added_url);
  // ===== back to file
  json_txt2 = "// " + category_slug + '_list.json (json5 format)\n\n'
  json_txt2 += JSON5.stringify(json_obj, null,2);
  //console.log(json_txt2);
  console.log('Write file: ' + json_path);
  try {
    fs.writeFileSync(json_path, json_txt2);
  } catch(err) {
    console.error("ERR053: error by writing file " + json_path + " : " + err);
  }
  return (added_url>0)?1:0;
}

let completed_json = 0;
for (const category of directories) {
  // ===== read json file
  //console.log("category: " + category);
  const expected_json_name = category + '_list.json';
  const category_dir = path.join(__dirname, '..', 'audio', category);
  const jsons = fs.readdirSync(category_dir, {withFileTypes: true})
    .filter(c => c.isFile())
    .filter(c => { return '.json' === path.extname(c.name); })
    .map(c => c.name);
  //console.dir(jsons);
  if(jsons.find(f => {return expected_json_name === f})){
    completed_json += check_mp3_list(category, category_dir, expected_json_name);
  } else {
    console.warn('Missing json file: ' + expected_json_name);
  }
};
console.log('number of completed json: ' + completed_json);

