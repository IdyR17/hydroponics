const express = require('express');

const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const mailer = require('./mailer');

mongoose.connect("mongodb://growitin:growitin17@ds127994.mlab.com:27994/growitin", function(err) {
    if (err) console.log(err);
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

const models = require('./models');

const PORT = process.env.PORT || 3000

app.get('/forum', function(req, res) {
    res.redirect('localhost:4567');
});

app.post('/contactus', function(req, res) {
    var mailOpts = req.body;

    mailer.sendEmail({
        to: mailOpts.email,
        subject: "Thanks " + mailOpts.name + " for contacting us! <Hydroponics Team>",
        from: "Hydroponics Inc. <growitin@jurhidy.com>",
        text: "Thanks " + mailOpts.name + "for contacting us! We will stay in touch!",
    }, function(err) {
        if (err) return res.send('it failed');
        return res.send(mailOpts.message);
    });

    // Do the mailer thingy in here
});

app.post('/suscribe', function(req, res) {
    const email = new models.email({
        email: req.body.email
    }).save(function(err, _) {
        if (err) return res.send('Didn\'t work');
        return res.send('suscribed!');
    });
    // Do the suscribing thingy in here
});

app.listen(PORT, function() {
    console.log('Example app listening on port' + PORT + '!')
});