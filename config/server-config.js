(function(){
    var bodyParser = require('body-parser');
    var compression = require('compression');
    var cookieParser = require('cookie-parser');
    var helmet = require('helmet');
    var path = require('path');
    var rateLimit = require('express-rate-limit');
    var session = require('express-session');
    var uuid = require('node-uuid');

    module.exports = function(app) {
        var sessionTimeout = 1000 * 60 * 60, // one hour
            rateLimitTime = 1000 * 60 * 15, // 15 minutes
            myKey = process.env.SECRET || 'meHazTest';
        
        app.set('port', process.env.PORT || 8000); // Set Port
        // app.enable('trust proxy'); // When behind a proxy
        app.use(compression()); // gzip compression

        // set up rate limiter
        var limiter = new rateLimit({
            windowMs: rateLimitTime, // 15 minutes
            max: 100,
            delayMs: 0 // disable delaying - full speed until the max limit is reached
        });
        app.use(limiter);

        // view engine
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');

        app.use(cookieParser());
        app.use(session({
            genid: function(req){
                return uuid.v4();
            },
            secret: myKey,
            resave: true,
            saveUninitialized: true,
            cookie: {
                httpOnly: true, // can only be read on the server
                secure: false, // true means that the cookie will only be set for HTTPS!
                maxAge: sessionTimeout
            }
        }));

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());

        // set security headers
        app.use(helmet.frameguard({ action: 'deny' }));
        app.use(helmet.noSniff());
        app.use(helmet.xssFilter());
        app.disable('x-powered-by');
    };
})();