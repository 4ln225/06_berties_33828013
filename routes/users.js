// Create a new router
const bcrypt = require('bcrypt');
const express = require("express")
const router = express.Router()
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) { res.redirect('./login');
    } else {
        next();
    }
}


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})
n
router.post('/registered', function (req, res, next) {

    const saltRounds = 10;
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            return next(err);
        }

        const sql = `
            INSERT INTO users (first, last, email, password)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPassword,
        ];

        req.db.query(sql, values, function(err, result) {
            if (err) {
                return next(err);
            }

            res.send(
                'Hello ' + req.body.first + ' ' + req.body.last +
                ', you are now registered with a secure password!'
            );
        });
    });
});

router.get('/list', function(req, res, next) {
    const sql = 'SELECT first, last, email FROM users';

    req.db.query(sql, function(err, result) {

        if (err) {
            return next(err);
        }
        res.render('listusers.ejs', {users: result});
    });
});

router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

router.post('/loggedin', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE email = ?';

    req.db.query(sql, [email], function(err, result) {
        if (err) return next(err);

        if (result.length === 0) {
            return res.send('User not found');
        }

        const hashedPassword = result[0].password;

        bcrypt.compare(password, hashedPassword, function(err, match) {
            if (err) return next(err);

            if (match) {
                req.session.userId = email;   // ✅ save session
                return res.redirect('/users/list');  // ✅ single response
            } else {
                return res.send('Incorrect password');
            }
        });
    });
});





// Export the router object so index.js can access it
module.exports = router
