var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let user;
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        user = req.session.username
    } else {
        user = ""
    }
    res.render('index', { title: 'BTB - Home', username: `${user}` });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
    let userName;
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }
   res.render('contact', {title: 'Contact', user: userName})
});



module.exports = router;

