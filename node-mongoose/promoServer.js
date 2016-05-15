var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    Promotions.create({
      name: "Weekend Grand Buffet",
      label: "New",
      image: "images/buffet.png",
      price: "19.99",
      description: "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
    }, function (err, promo) {
        if (err) throw err;

        console.log('Promotion created!');
        console.log(promo);
        var id = promo._id;

        // get all the users
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        label: 'Hot'
                    }
                }, {
                    new: true
                })
                .exec(function (err, promo) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promo);

                    db.collection('promotions').drop(function () {
                        db.close();
                    });
                });
        }, 3000);

    });

});