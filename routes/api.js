

const express = require("express");
const router = express.Router();



router.get('/books', function (req, res, next) {

    let baseQuery = "SELECT * FROM books";
    let filters = [];
    let params = [];

    // 3
    if (req.query.search) {
        filters.push("name LIKE ?");
        params.push(`%${req.query.search}%`);
    }

    // 4
    if (req.query.minprice) {
        filters.push("price >= ?");
        params.push(req.query.minprice);
    }

    if (req.query.maxprice) {
        filters.push("price <= ?");
        params.push(req.query.maxprice);
    }

    
    if (filters.length > 0) {
        baseQuery += " WHERE " + filters.join(" AND ");
    }

    // 5
    if (req.query.sort === "name") {
        baseQuery += " ORDER BY name";
    }
    else if (req.query.sort === "price") {
        baseQuery += " ORDER BY price";
    }

    db.query(baseQuery, params, (err, result) => {
        if (err) {
            res.json(err);
            next(err);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;
