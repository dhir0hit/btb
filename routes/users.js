var express = require('express');
var router = express.Router();

/* GET Users listing. */
/*show user detail which is logged ijn*/
router.get('/', function(req, res) {
  let userName;
  if (req.session.loggedIn != undefined && req.session.loggedIn) {
    userName = req.session.username
  } else {
    userName = ""
  }

  res.render('Users/user', { title: 'BTB - '+ userName + ' ', user: userName});
});


/* GET login page. */
router.get('/login', function(req, res, next) {
  let userName;
  if (req.session.loggedIn != undefined && req.session.loggedIn) {
    userName = req.session.username
  } else {
    userName = ""
  }
  res.render('Users/login', { title: 'BTB - Login', user:userName });
});

/* GET home page. */
router.post('/login', function(req, res, next) {
  // res.render('login', { title: 'Login', user:"" });
  let user = req.body.username;
  let pass = req.body.password;
  let db = req.db;
  let collection = db.get('Users');
  // find user from db

  let bools;


  /*collection.findOne({$or: [{username: user}, {email: user}]}, {}, function (error, docs) {
    if(error) {next(error)}
    else if (docs) {

    } else{

    }
  })*/

  collection.findOne({username: user}, {}, function (e, docs) {
    if (e) {
      next(e)
    } else if (docs) {
      bools = true;
      if(docs.password === pass){
        req.session.username = docs.username;
        req.session.loggedIn = true;
        // res.render('user', { title: 'BTB - '+ req.session.username + ' ', user: req.session.username});
        res.redirect("/user");
      } else{
        res.render('Users/login', {title: 'BTB - Login', user: "", error: "password incorrect"});
      }
    } else {
      bools = false;
    }
  });

  collection.findOne({email: user}, {}, function (e, docs) {
    if (e) {
      next(e)
    } else if (docs) {
      bools = true;
      if(docs.password === pass){
        req.session.username = docs.username;
        req.session.loggedIn = true;
        // res.render('user', { title: 'BTB - '+ req.session.username + ' ', user: req.session.username});
        res.redirect("/user");
      } else{
        res.render('Users/login', {title: 'BTB - Login', user: "", error: "password incorrect"});
      }
    } else {
      if (!bools) {
        res.render('Users/login', {title: 'BTB - Login', user: "", error: "username not found"});
      }
    }
  });
});



/* GET Signup page. */
router.get('/signup', function(req, res, next) {
  let user;
  if (req.session.loggedIn != undefined && req.session.loggedIn) {
    user = req.session.username;
  } else {
    user = ""
    // req.session.loggedIn = false;
  }
  res.render('Users/signup', { title: 'BTB - Signup', user:user,  loggedIn: false});
});

/* GET login page. */
router.post('/signup', function(req, res, next) {
  let userLoggedIn = false;
  let email = req.body.email;
  let pass = req.body.password1;

  let profilePic = "1";

  let user = req.body.username;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let phoneNumber = req.body.phone_number;
  let addressL1 = req.body.address1;
  let addressL2 = req.body.address2;
  let city = req.body.city;
  let province = req.body.province;
  let postalCode = req.body.postal_code;

  let business_account = req.body.business_account;
  let cart = [];

  let db = req.db;
  let collection = db.get('Users');

  // find user from db
  if (email) {
    req.session.email = email;
    req.session.password = pass;
    res.render('Users/signup', {title: 'BTB - Signup', user:"", loggedIn: true})
  }
  if(user) {
    let Email = req.session.email;
    let Pass = req.session.password;

    req.session.loggedIn = true;
    req.session.username = user;

    collection.insert({user, Pass, profilePic, firstName, lastName, phoneNumber, Email, addressL1, addressL2, city, province, postalCode, business_account, cart}, function (error, result) {
      if(error){next(error)}
      else{
        res.render('Users/signup', {title: 'BTB - Signup', user:req.session.username, loggedIn: false})
      }
    })
  }
});




router.get('/data', function (req, res, next) {
  var db = req.db;
  var collection = db.get('Users');

  collection.find({}, {}, function (error, docs) {
    if (error) {next(error)}
    else {res.json(docs);}
  });
});



module.exports = router;
