// Create a new router
const express = require("express")
const router = express.Router()

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {res.redirect('/users/login')
    } else {
        next()
    }
}


router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword)
});

router.get('/list', redirectLogin, function(req, res, next) {

    let sqlquery = "SELECT * FROM books";
    
    db.query(sqlquery, (err, result) => {
        if (err) { next(err); }
        res.render("list.ejs", {availableBooks:result})
    });
});

router.get('/addbook', redirectLogin, function(req, res) {

    res.render('addbook.ejs');
  });
  
  router.post('/bookadded', redirectLogin, function (req, res, next) {

    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.send('This book is added to database, name: '
              + req.body.name +
              ' price ' + req.body.price);
        }
    });
});


// Export the router object so index.js can access it
module.exports = router


