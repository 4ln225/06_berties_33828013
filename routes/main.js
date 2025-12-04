
const express = require("express")
const request = require('request');

const router = express.Router()
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/users/login')
    } else {
        next()
    }
}


router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.send('You are now logged out. <a href="/">Home</a>')
    })
})

router.get('/weather', function (req, res, next) {

    let apiKey = '4a0d668f0144faa819aecd199c7ba893';
    let city = req.query.city || "london";

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }

        var weather;

        try {
            weather = JSON.parse(body);
        } catch (e) {
            return res.send("No data found");
        }

        if (weather === undefined || weather.main === undefined) {
            return res.send("No data found");
        }


        var wmsg = 
            'It is ' + weather.main.temp + '°C in ' + weather.name + '. <br>' +
            'The humidity now is: ' + weather.main.humidity + '%. <br>' +
            'Wind speed: ' + weather.wind.speed + ' m/s <br>' +
            'Wind direction: ' + weather.wind.deg + '°';

        res.send(wmsg);
    });
});


module.exports = router