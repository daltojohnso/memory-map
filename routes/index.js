var express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    dbFileName = './db.json',
    shortid = require('shortid');

  var parsedDb = JSON.parse(fs.readFileSync(dbFileName, 'utf8'));

router.get('/api/map', function(req, res, next) {
  var user = req.query.user;
  if (!user || !user.id){
    res.send(null);
    return;
  } else {
    var iddb = require('../iddb.json');
    if (!iddb[user.id]) {
      res.send(null);
      return;
    }

    var db = require('../db.json');
    console.log(db);
    res.send(db);
  }
});

router.post('/api/map', function(req, res, next) {
  var noteId = req.body.id,
      content = req.body.content,
      lat = req.body['position[lat]'],
      lng = req.body['position[lng]'],
      userId = req.body['user[id]'];

  var iddb = require('../iddb.json');
  console.log(req.body);

  if (!userId || !iddb[userId]) {
    res.send(false);
    return;
  }

  console.log(req.body);
  var db = require('../db.json');
  var hit = false;
  for (var i = 0, length = db.length; i < length; i++) {
    if (db[i].id === noteId) {
      if (!content) {
        db.splice(i, 1);
      } else {
        db[i].content = content;
      }
      hit = true;
      break;
    }
  }

  if (hit === false && content) {
    db.push({
      id: noteId,
      content: content,
      position: {lat: +lat, lng: +lng}
    })
  }

  fs.writeFile('./db.json', JSON.stringify(db), function(err) {
    if (err) res.send(false);
    else res.send(noteId);
  })


});


router.post('/api/login', function(req, res, next) {
  console.log(req.body);
  var username = req.body.user;
  var password = req.body.password;

  var userDb = require('../userdb.json');
  if (userDb[username] && userDb[username] === password) {
    var idDb = require('../iddb.json');
    console.log(shortid);
    var id = shortid.generate() + shortid.generate() + shortid.generate() + shortid.generate();
    console.log(id);
    idDb[id] = true;

    fs.writeFile('./iddb.json', JSON.stringify(idDb), function(err) {
      if (err) res.send(false);
      else res.send({id:id, user:username});
    });
  } else {
    res.send(false);
  }
});

router.get('/', function(req, res, next) {
  res.redirect(path.resolve('../dist/index.html'));
});

router.get('/mapview', function(req, res, next) {
  res.redirect(path.resolve('../dist/index.html'));
});


module.exports = router;
