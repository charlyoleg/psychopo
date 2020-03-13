// audio_lists.js

const fs = require('fs');
const JSON5 = require('json5');

async function read_list(category) {
  //console.log("category: " + category);
  const path = 'audio/' + category + '/' + category + '_list.json';
  //console.log("path: " + path);
  let json_txt = "";
  try {
    json_txt = fs.readFileSync(path);
    //console.log(json_txt);
  } catch(err) {
    console.error("ERR014: error by reading file " + path + " : " + err);
  }
  let json_obj = {};
  try {
    json_obj = JSON5.parse(json_txt);
  } catch(err) {
    console.error("ERR018: error by parsing file " + path + " : " + err);
  }
  //console.dir(json_obj);
  return json_obj;
}

async function modific(a_json, a_category, a_index) {
  //console.log("category: " + a_category + " index: " + a_index);
  let r_json = a_json;
  let slug_index = a_index.toString() + '/';
  if (slug_index == '0/') {
    slug_index = '';
  }
  a_json.slug = a_category + '/'; // the slug I'd like to use
  a_json.slug2 = 'podcast/' + slug_index; // the slug I have to use because to the 11ty+pug issue
  for (const title of a_json.podcasts) {
    title.url = 'audio/' + a_category + '/' + title.url
  }
  return r_json;
}

module.exports = async function() {
  let r_array = [];
  let categories = [
    '8bit',
    'chanson_francaise',
    'classique',
    ];

  let index = 0;
  for (const category of categories) {
    const tmp_json = await read_list(category);
    const tmp_json2 = await modific(tmp_json, category, index);
    r_array.push(tmp_json2);
    index += 1;
  };

  //console.log(r_array);
  return r_array;
};

