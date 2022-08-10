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
            res.render('Products/list', {title: "Explore", user: userName, products: docs});
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
            res.render('Products/list', {title: "Explore", user: userName, products: docs});
        }
    });
})

router.get('/create', function (req, res,next) {
    let userName;
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }

    res.render("Products/create", {title: "Create", user: userName});
})


router.get('/edit',function (req, res,next){
    let userName;
    const prodId = parseInt(req.query.id);
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }

    res.render("Products/edit", {title: "Edit", user: userName, prod_id: prodId});
})

router.post('/edit/save',function (req, res, next){
    let name = req.body.name;
    let prodType = req.body.type;
    let brandName = req.body.brandName;
    let features = req.body.features;
    let price = req.body.price;
    let stock = req.body.stock;
    let tags = req.body.tags;

    let db = req.db;
    let collection = db.get('products');

    let userName;
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username
        collection.update({name: req.session.name}, {$set:{name: name, type: prodType, brandName: brandName, features: features, price: price, stock: stock, tags: tags}}, function (error, result){
            if (error) {res.send("<h1>Unable to update</h1>")}
            else {
                req.session.name = name;
            }
            res.redirect("../");
        })
    } else {
        userName = ""
        res.redirect("/user/login");
    }

})

router.get('/details',function (req, res,next){
    const prodId = parseInt(req.query.id);
    const prodName = req.query.name;


    let userName;
    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }

    let db = req.db;
    let collection = db.get('products');

    collection.find({id: prodId}, {}, function (error, docs) {
       if(error) {next(error)}
       else {
           res.render("Products/details", {title: "Details", user: userName, product: docs[0], businessAccount: req.session.businessAccount});
       }
    })
})

/*// ...

// routes will go here
// ...

http://example.com/api/users?id=4&name=sdfa3

app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;

    res.send({
        'user_id': user_id,
        'token': token,
        'geo': geo
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);*/




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
