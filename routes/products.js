var express = require('express');
var router = express.Router();


/*Get list page*/
router.get('/', function(req, res, next) {
    let userName;
    let db = req.db;
    let collection = db.get('products');

    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }
    collection.find({}, {}, function (error, docs) {
        // Showing error page if there is an error
        if(error) {next(error)}
        else {
            res.render('list', {title: "Explore", user: userName, products: docs});
        }
    });
})

/*Get list page*/
router.get('/filter/:tagId', function(req, res, next) {
    let userName;
    let db = req.db;
    let collection = db.get('products');


    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }

    let searchBar = req.params.tagId;
    collection.find({$or: [{tags:{'$regex':searchBar, '$options':'i'}}, {brandName:{'$regex':searchBar, '$options':'i'}}, {name:{'$regex':searchBar, '$options':'i'}}, {productType:{'$regex':searchBar, '$options':'i'}}, {features:{'$regex':searchBar, '$options':'i'}}]} , {}, function (error, docs) {
        // Showing error page if there is an error
        if(error) {next(error)}
        else {
            // write here
            res.render('list', {title: "Explore", user: userName, products: docs});
        }
    });
})


router.get('/getAll', function (req, res, next) {
    let db = req.db;
    let collection = db.get('products');
    let productsList;

    collection.find({}, {}, function (error, docs) {
        if(error) {next(error)}
        else {productsList = docs; res.json(docs);}
    });
});

module.exports = router;
