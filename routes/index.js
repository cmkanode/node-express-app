(function(){
    var csrf = require('csurf');
    var express = require('express');
    var path = require("path");


    module.exports = function(app){
        //app.use('/api/admin', require('./admin'));
        app.use('/api/planets', require('./planets'));

        app.use("/", express.static(path.join(__dirname, '../public')));
        
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // client-side routes that need the csrf token enabled
        // app.use(csrf({ cookie: true }));
        // app.use('/', require('./otherroutes'));
    };    
})();
