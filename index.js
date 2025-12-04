
require('dotenv').config()

var express = require ('express')
var ejs = require('ejs')
var mysql = require('mysql2');
var session = require('express-session')



const expressSanitizer = require('express-sanitizer');

const path = require('path')

const app = express()
const port = 8000


app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }))
app.use(expressSanitizer());


app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'somERandomstuff',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}))




app.locals.shopData = {shopName: "Bertie's Books"}

// b4

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.BB_USER,
    password: process.env.BB_PASSWORD,
    database: process.env.BB_DATABASE
});
global.db = db;

app.use((req, res, next) => {
    req.db = db;
    next();
  });
  


const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)


const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)


const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)


const apiRouter = require('./routes/api');


app.use('/api', apiRouter);





app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('dotenv').config()
