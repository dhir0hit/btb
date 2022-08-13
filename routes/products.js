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
router.get('/filter/:Id', function(req, res, next) {
    let userName;
    let db = req.db;
    let collection = db.get('products');


    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }

    let searchBar = req.params.Id;
    collection.find({$or: [
        {tags:{'$regex':searchBar, '$options':'i'}},
            {brandName:{'$regex':searchBar, '$options':'i'}},
            {name:{'$regex':searchBar, '$options':'i'}},
            {productType:{'$regex':searchBar, '$options':'i'}},
            {features:{'$regex':searchBar, '$options':'i'}}]} , {}, function (error, docs) {
        // Showing error page if there is an error
        if(error) {next(error)}
        else {
            // write here
            res.render('Products/list', {title: "Search", user: userName, products: docs});
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

router.post('/create',function (req, res, next) {
    let userName;

    let db = req.db;
    let collection = db.get('products');

    if (req.session.loggedIn != undefined && req.session.loggedIn) {
        userName = req.session.username;
    } else {
        userName = "";
    }


    let Image = req.body.image;
    let productName = req.body.name;
    let productType = req.body.type;
    let brandName = req.body.brandName;
    let productFeatures = req.body.features;
    let productPrice = req.body.price;
    let productStock = req.body.stock;
    let productTags = req.body.tags;


    collection.find({}, {}, function (error, data) {
        let productId = data.length + 1;

        collection.insert(
          {
              id: productId,
              name: productName,
              productType: productType,
              brandName: brandName,
              features: productFeatures,
              price: productPrice,
              stock: productStock,
              review: 0,
              tags: productTags
          }, function (error, result) {
            if (error) {next(error)}
            else {
                res.redirect("/product/")
            }
        })
    })


    // res.render("Products/create", {title: "Create", user: userName});
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
