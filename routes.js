const router = require('express').Router();
const mongoose = require('mongoose');

const mailer = require('./mailer');
const models = require('./models');

models.Email.remove({}, function(err){
    if(err) console.log(err);
    else console.log('Table Email dropped!')
})

router.get('/forum', function(req, res) {
    res.redirect('localhost:4567');
});

router.post('/contactus', function(req, res) {
    var mailOpts = req.body;

    mailer.sendEmail({
        to: mailOpts.email,
        subject: "Thanks " + mailOpts.name + " for contacting us! <Hydroponics Team>",
        from: "GrowItIn Inc. <growitin@jurhidy.com>",
        text: "Thanks " + mailOpts.name + " for contacting us! We will stay in touch!",
    }, function(err) {
        if (err) return res.send('it failed');
        return res.send(mailOpts.message);
    });

    // Do the mailer thingy in here
});

router.post('/suscribe', function(req, res) {
    const email = new models.Email({
        email: req.body.email
    }).save(function(err, _) {
        if (err) return res.send('Didn\'t work');
        return res.send('suscribed!');
    });
    // Do the suscribing thingy in here
});

module.exports = router;