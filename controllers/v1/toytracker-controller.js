 (function(){
    var Datastore = require('nedb');
    var path = require("path");
    var db = new Datastore({filename: path.join(__dirname, '../../data/toytracker.db'), autoload: true });


    exports.getList = function(req, res){
        var system = req.params.system;
        var search = {};
        if(system != null){
            search.system = system;
        }
        db.find(search, function(err, docs){
            res.send(docs);
        });
    };

    // exports.addPlanet = function(req, res){
    //     var doc = req.body.planet;
    //     db.planets.insert(doc, function (err, newDoc) {   // Callback is optional
    //         // newDoc is the newly inserted document, including its _id
    //         res.status(200).send({ id: newDoc._id });
    //     });
    // };

    // exports.getPlanet = function(req, res) {
    //     console.log('getPlanet, id: ', req.params.id);
    //     var id = req.params.id;
    //     db.findOne({_id: id }, function(err, planet){
    //         console.log(planet);
    //         res.send(planet);
    //     });
    // };

    // exports.removePlanet = function(req, res) {
    //     var id = req.params.id;
    //     db.remove({_id: id }, function(err, planet){
    //         res.status(204).send({ status: 'Planet with id, ' + id + ', removed.' });
    //     });
    // };

    
 })();