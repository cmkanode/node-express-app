(function(){
    var express = require('express');
    var path = require("path");
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.send('I\'m Alive');
    });

    router.get("/version/", function(req, res, next){
        var version = getNameAndVersion();
        res.send(version);
    });

    

    function getNameAndVersion(){
        var ver = ' version ';
        var pack = require('../package.json');
        ver = pack.name + ver + pack.version;
        return ver;
    }
    
    module.exports = router;
})();
