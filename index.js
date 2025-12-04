
require('dotenv').config()
// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
var mysql = require('mysql2');
var session = require('express-session')

console.log("🔥 Server starting...");

const expressSanitizer = require('express-sanitizer');

const path = require('path')

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))
app.use(expressSanitizer());

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'somERandomstuff',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}))



// Define our application-specific data
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
  

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /books
const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)

console.log("📌 BEFORE loading API router");
const apiRouter = require('./routes/api');
console.log("✅ API router IMPORTED");

console.log("📌 BEFORE mounting /api");
app.use('/api', apiRouter);
console.log("✅ Mounted /api");



// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('dotenv').config()
