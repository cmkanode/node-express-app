(function(){
    var express = require('express');
    //var path = require('path');

    var app = express();
    var config = require('./config/server-config')(app);

    var router = require('./routes/index')(app);

    // error handler - move to routes?
    app.use(function (err, req, res, next){
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        // handle CSRF token errors
        res.render('warning');
    })

    const server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;
})();
