// create_json.js

const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

console.info("create_json.js");

const starting_dir = path.join(__dirname, "..", "audio");
const directories = fs.readdirSync(starting_dir, {withFileTypes: true})
  .filter(c => c.isDirectory())
  .map(c => c.name);

//console.dir(directories);
//process.exit();

const make_empty_json = (category_slug, json_path) => {
  json_obj = {
    'category': '',
    'slug': category_slug,
    'slug2': '',
    'links': [],
    'podcasts': [],
  };
  json_txt2 = "// " + category_slug + '_list.json (json5 format)\n\n'
  json_txt2 += JSON5.stringify(json_obj, null,2);
  //console.log(json_txt2);
  console.log('Write file: ' + json_path);
  try {
    fs.writeFileSync(json_path, json_txt2);
  } catch(err) {
    console.error("ERR053: error by writing file " + json_path + " : " + err);
  }
}

let created_json = 0;
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
  if(! jsons.find(f => {return expected_json_name === f})){
    make_empty_json(category, path.join(category_dir, expected_json_name));
    created_json += 1;
  }
};
console.log('number of created json: ' + created_json);

