(function(){
    var express = require('express');
    var router = express.Router();
    var planets = require('../controllers/v1/planets-controller')

    router.get('/', function(req, res, next) {
        res.send('Planets Section');
    });

    router.post('/', function(req, res, next) {
        planets.addPlanet(req, res);
    });

    router.get('/list/:system?', function(req, res, next){
        planets.getList(req, res);
    });
    
    router.get('/:id', function(req, res, next){
        planets.getPlanet(req, res);
    });

    // router.delete('/:id', function(req, res, next) {
    //     planets.removePlanet(req, res);
    // });

    
    module.exports = router;
})();
