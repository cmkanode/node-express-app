(function(){
    var express = require('express');
    var path = require("path");
    var router = express.Router();
    var Datastore = require('nedb');
    var db = {};
    var dbFilename = path.join(__dirname, '../data/planets.db');

    router.get('/', function(req, res, next) {
        res.send('Admin Section');
    });

    router.get('/init', function(req, res, next){
        db.planets = new Datastore({filename: dbFilename, autoload: true });
        var docs = [
            { _id: 'id1', planet: 'Mercury', system: 'solar', inhabited: false },
            { _id: 'id2', planet: 'Venus', system: 'solar', inhabited: false },
            { _id: 'id3', planet: 'Earth', system: 'solar', inhabited: true, satellites: ['Moon'] },
            { _id: 'id4', planet: 'Mars', system: 'solar', inhabited: false, satellites: ['Phobos', 'Deimos'] },
            { _id: 'id5', planet: 'Jupiter', system: 'solar', inhabited: false },
            { _id: 'id6', planet: 'Saturn', system: 'solar', inhabited: false },
            { _id: 'id7', planet: 'Uranus', system: 'solar', inhabited: false },
            { _id: 'id8', planet: 'Neptune', system: 'solar', inhabited: false },
        ];

        db.planets.insert(docs, function (err, newDocs) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            res.send(newDocs);
        });
    });

    router.get('/planet/:id', function(req, res, next){
        var id = req.params.id;
        db.planets = new Datastore({filename: dbFilename, autoload: true });
        db.planets.find({_id: id }, function(err, planet){
            res.send(planet);
        })
    })
    
    module.exports = router;
})();
