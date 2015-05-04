var express = require('express'),
    connectlr = require('connect-livereload'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    spahql = require('spahql'),
    uuid = require('node-uuid'),
    urljoin = require('url-join')
;

function handle(method){
  return function(req, res){
    var file = path.join(__dirname, 'data.json')
    fs.readFile(file, function(err, data){

      if(err){
        console.log(err);
        res.status(500).end();
        return;
      }

      try {

        var url = req.path.substr(5),
            db = spahql.db(JSON.parse(data)),
            node = db.select(url);
            value = method(node, url, db, req.body);

        json = JSON.stringify(db.sourceData(), null, 2);
        fs.writeFile(file, json);
        res.json(value);

      } catch(ex) {
        console.log(ex);
        res.status(500).end();
        return;
      }

    });
  }
}

function get(node, url, db, entity){
  return node.value();
}
function put(node, url, db, entity){
  var index = url.lastIndexOf('/') + 1,
      location = url.substr(0, index),
      key = url.substr(index);

  if(!db.assert(location)){
    var nodes = url.split('/'),
        prev = '/';
    for(var i=0; i < nodes.length; i++){
      var node = nodes[i],
          next = urljoin(prev, node);
      if(!db.assert(next)){
        db.select(prev).set(node, {});
      }
      prev = next;
    }
  }

  return db.select(location).set(key, entity);
}
function post(node, url, db, entity){
  var id = uuid.v4();
  return node.set(id, entity);
}
function del(node, url, db, entity){
  return node.destroy(undefined);
}

express()
    .use(bodyParser.json())
    .get('/data/*', handle(get))
    .put('/data/*', handle(put))
    .post('/data/*', handle(post))
    .delete('/data/*', handle(del))
    .use(connectlr())
    .use(express.static('static'))
    .listen(3000);
