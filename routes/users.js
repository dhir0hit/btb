var express = require('express');
var router = express.Router();

/* GET Users listing. */
/*show user detail which is logged ijn*/
router.get('/', function(req, res) {
  let userName;
  if (req.session.loggedIn != undefined && req.session.loggedIn) {
    userName = req.session.username
    res.render('Users/user', { title: 'BTB - '+ userName + ' ', user: userName});
  } else {
    userName = ""
    res.redirect("/user/login");
  }

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
  let user = req.body.username;
  let pass = req.body.password;
  let db = req.db;
  let collection = db.get('users');

  let bools;

  collection.findOne({username: user}, {}, function (e, docs) {
    if (e) {
      next(e)
    } else if (docs) {
      bools = true;
      if(docs.password === pass){
        req.session.username = docs.username;
        req.session.loggedIn = true;
        req.session.businessAccount = docs.businessAccount;
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
        req.session.businessAccount = docs.businessAccount;
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
  let pass2 = req.body.password2;

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

  let business_account = false
  if (req.body.business_account && req.body.business_account == "on") {
    business_account = true;
  }
  let cart = [];

  let db = req.db;
  let collection = db.get('users');

  // find user from db
  if (email) {
    if (pass === pass2) {
      req.session.email = email;
      req.session.password = pass;
      res.render('Users/signup', {title: 'BTB - Signup', user: "", loggedIn: true})
    } else{
      res.render('Users/signup', { title: 'BTB - Signup', user: "", error: "passwords did not match" , loggedIn: false});
    }
  }
  if(user) {
    let Email = req.session.email;
    let Pass = req.session.password;

    req.session.loggedIn = true;
    req.session.username = user;
    req.session.businessAccount = business_account;


    collection.insert({username: user, password: Pass, profilePic: profilePic, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: Email, address1: addressL1, address2: addressL2, city: city, province: province, postalCode: postalCode, businessAccount: business_account, cart: cart}, function (error, result) {
      if(error){next(error)}
      else{
        res.render('Users/signup', {title: 'BTB - Signup', user:req.session.username, loggedIn: false})
      }
    })
  }
});


/* Get Edit page */
router.get("/edit", function (req, res, next) {
  let userName;
  if (req.session.loggedIn != undefined && req.session.loggedIn) {
    userName = req.session.username
    res.render("Users/edit", {title: userName + " - Edit", user: userName})
  } else {
    res.redirect("/user/login");
  }
})

/* post Edit page */
router.post("/edit/save", function (req, res, next) {
  let email = req.body.email;
  let pass = req.body.password;
  let userName = req.body.user_name;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let phoneNumber = req.body.phone_number;
  let addressL1 = req.body.address_l1;
  let addressL2 = req.body.address_l2;
  let city = req.body.city;
  let province = req.body.province;
  let postalCode = req.body.postal_code;

  let business_account = false
  if (req.body.business_account && req.body.business_account === "on") {
    let business_account = true;
  }

  let profilePic = "1";

  let db = req.db;
  let collection = db.get('users');

  if (!req.session.username) {
    res.redirect("/user/login");
  } else {
    if (userName && email && pass && firstName && addressL1 && city && province && postalCode) {
      collection.update({username: req.session.username}, {$set: {username: userName, password: pass, profilePic: profilePic, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address1: addressL1, address2: addressL2, city: city, province: province, postalCode: postalCode, businessAccount: business_account}}, function (error, result){
        if (error) {res.send("<h1>Unable to update</h1>")}
        else {
          req.session.username = userName;
        }
      })
      res.redirect("/user");
    } else {
      if (!userName) {
        res.render("Users/edit", {
          title: userName + " - Edit",
          user: req.session.username,
          error: "User name cannot be empty"
        })
      } else if (!email) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "Email cannot be empty"})
      } else if (!pass) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "Password cannot be empty"})
      } else if (!firstName) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "First Name cannot be empty"})
      } else if (!addressL1) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "address cannot be empty"})
      } else if (!city) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "City cannot be empty"})
      } else if (!province) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "province cannot be empty"})
      } else if (!postalCode) {
        res.render("Users/edit", {title: userName + " - Edit", user: userName, error: "Postal Code cannot be empty"})
      }
    }
  }
});

router.get("/delete", function (req, res, next) {
  var db = req.db;
  var collection = db.get('users');

  collection.remove({username: req.session.username}, function (error, result) {
    if(error){
      res.send("<h1>unable to delete</h1>")
    } else{
      req.session.username = "";
      req.session.loggedIn = false;
      res.redirect("/user/login")
    }
  });

});

router.get("/logout", function (req, res, next) {
  var db = req.db;
  var collection = db.get('users');

  req.session.username = "";
  req.session.loggedIn = false;
  req.session.businessAccount = false;

  res.redirect("/user/login")
})


/*
* USER'S CART
* */
/*Get Cart*/
router.get("/cart", function (req, res, next) {
  let db = req.db;
  var collection = db.get("users");

  if (req.session.loggedIn) {
    collection.find({username: req.session.username}, {}, function (error, userData) {
      res.render("Users/cart", {title: "Cart - " + req.session.username, cart_info: userData[0].cart});
    })
  } else {
    res.redirect("/user/login");
  }
})

/*Add to cart*/
router.get("/add_to_cart/:Id", function (req, res, next) {
  let db = req.db;
  let collection = db.get('users');
  let productId = req.params.Id

  if(req.session.loggedIn) {
    collection.find({username: req.session.username}, {}, function (error, Userdata) {
      if (error) {
        next(error)
      } else {
        let userCart = Userdata[0].cart;
        userCart.push(productId)


        collection.update({username: req.session.username}, {$set: {cart: userCart}}, function (error, result) {
          if (error) {
            next(error)
          } else {
            res.redirect("/product");
          }
        })
      }
    })
  } else{
    res.redirect("/user/login")
  }
})




router.get('/data', function (req, res, next) {
  var db = req.db;
  var collection = db.get('users');

  collection.find({}, {}, function (error, docs) {
    if (error) {next(error)}
    else {res.json(docs);}
  });
});



module.exports = router;
