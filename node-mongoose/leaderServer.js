var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    Leaders.create({
      "name": "Peter Pan",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "image": "images/alberto.png",
      "description": "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
    }, function (err, leader) {
        if (err) throw err;

        console.log('Leader created!');
        console.log(leader);
        var id = leader._id;

        // get all the users
        setTimeout(function () {
            Leaders.findByIdAndUpdate(id, {
                    $set: {
                        name: 'Peter Z. Pan'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leader);

                    db.collection('leaders').drop(function () {
                        db.close();
                    });
                });
        }, 3000);

    });

});