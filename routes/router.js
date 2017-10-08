var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/static/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //return res.sendFile(path.join(__dirname + '/views/profile.html'));

          return res.send('<h1 style="border: 1px solid;text-align: center;width: 50%;margin: 0 auto;height: 100px;line-height: 100px;">' + user.email + '</h1>'+
            '<div style="text-align: center;margin-top: 26px;">'+
            '<a style="background: blue;height: 40px;display: inline-block;line-height: 40px;color: white;width: 210px;text-align: center;border-radius: 6px;text-transform: uppercase;font-size: 20px;text-decoration: none;" type="button" href="/albums">See my albums</a>'+
            '</div>'+
            '<div style="text-align: center;margin-top: 26px;">'+
            '<a style="background: blue;height: 40px;display: inline-block;line-height: 40px;color: white;width: 210px;text-align: center;border-radius: 6px;text-transform: uppercase;font-size: 20px;text-decoration: none;" type="button" href="/logout">Logout</a>'+
            '</div>');
        }
      }
    });
});


router.get('/albums', function(req, res) {
  return res.sendFile(path.join(__dirname + '/views/albums.html'));
});
// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;