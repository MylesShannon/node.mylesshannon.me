var express = require('express'),
  router = express.Router(),
  jwt = require('njwt');
  mongoose = require('mongoose'),
  User = mongoose.model('User');

var google = require('googleapis'),
  gPlus = google.plus('v1'),
  OAuth2 = google.auth.OAuth2;

var encodeJWT = (userId) => {
  var claims = {
    iss: process.env.APP_HOST,
    sub: userId,
    iat: Date.now() / 1000,
    exp: Date.now() + process.env.JWT_EXP, // two weeks
    scope: "self"
  }
  var token = jwt.create(claims, process.env.JWT_SECRET);
  return token.compact();
};

module.exports = (app) => {
  app.use('/api/v1/auth', router);
}

router.post('/google', (req, res, next) => {
  var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, req.body.redirectUri);
  oauth2Client.getToken(req.body.code, (err, tokens) => {
    if(!err) {
      oauth2Client.setCredentials(tokens);
      gPlus.people.get({ userId: 'me', auth: oauth2Client }, (err, resp) => {
        if(!err) {
          // if uid is not in db, create new user
          User.findOne({'uid': resp.id}, (err, data) => {
            if(!err && data) {
              // return token for existing user
              User.count({}, (err, total) => {
                if(!err) {
                  res.json({'token': encodeJWT(data.id), 'user': Object.assign({}, data.toObject(), {total: total}) }).status(200);
                } else {
                  res.json({ msg: 'Failed to get user count', status: 500 }).status(500);
                }
              })
            } else if(!data || err) {
              // create new user
              var newUser = new User({
                email: resp.emails[0].value,
                provider: 'google',
                uid: resp.id,
                name: {
                  first: resp.name.givenName,
                  last: resp.name.familyName
                },
                profile_picture: resp.image.url,
                access_token: tokens.access_token
              });
              newUser.save((err) => {
                if (!err) {
                  User.count({}, (err, total) => {
                    if(!err) {
                      res.json({'token': encodeJWT(newUser.id), 'user': Object.assign({}, newUser.toObject(), {total: total}) }).status(200);
                    } else {
                      res.json({ msg: 'Failed to get user count', status: 500 }).status(500);
                    }
                  })
                } else {
                  res.json({ msg: 'Failed to create new user', status: 500 }).status(500);
                }
              });
            }
          });
        } else {
          res.json({ msg: 'Failed to get user data', status: 500 }).status(500);
        }
      });
    } else {
      res.json({ msg: 'Failed to get OAuth2 token', status: 500 }).status(500);
    }
  });
});
