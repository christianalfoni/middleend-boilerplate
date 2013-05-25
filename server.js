var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,
    paths: {
        'validate': 'dev/js/vendors/validate',
        'validation': 'dev/js/shared/validation',
        'underscore': 'dev/js/vendors/underscore',
        'timeHelper': 'dev/js/shared/timeHelper',
        'handlebarHelpers': 'dev/js/shared/handlebarHelpers',
        'config': 'server/config'
    }
});

requirejs(['fs', 'config', 'express', 'everyauth', 'server/authentication', 'express-hbs', 'server/routes', 'handlebarHelpers'], function (fs, config, express, everyauth, authentication, hbs, routes) {

    var app = express();

    // Set up authentication
    //everyauth.debug = true;
    authentication.configure(everyauth);

    // Configuration
    app.configure(function () {
        app.engine('hbs', hbs.express3({partialsDir: __dirname + '/dev/templates/partials'}));
        app.set('view engine', 'hbs');
        app.set('views', __dirname + '/dev/templates');
        app.set('view cache', config.is('production'));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({ // To keep sessions between restarts of server, use a memcache, https://github.com/balor/connect-memcached
            secret: 'mr ripley',
            cookie: {
                maxAge: false // Milliseconds. Set to false if no expiration of cookie, session will expire on server restart (if no memcache)
            }
        }));
        app.use(express.methodOverride());
        app.use(everyauth.middleware());
        // Middleware to handle missing session and caching
        app.use(function (req, res, next) {
            if (!req.user) {
                // Redirect to login if there is no user in the request
                res.redirect('/login');
            } else {
                // Disable all caching, handle it manually instead
                res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                next();
            }
        });
        app.use(express.static(__dirname + config.get('publicDir')));
    });

    // Adds a global _config object for the client and other global variables
    app.locals.config = new hbs.SafeString(JSON.stringify(config.get('client')));
    app.locals.cssFiles = [];
    app.locals.development = config.is('development');
    // Load css files dynamically
    fs.readdir('dev/css', function (err, files) {
        files.forEach(function (file) {
            var fileParts = file.split('.');
            if (fileParts[fileParts.length - 1] === 'css') {
                app.locals.cssFiles.push(file);
            }
        });
    });

    // Routes
    app.get('/', routes.index);
    app.get('/messages', routes.getMessages);
    app.get('/history', routes.getHistory);
    app.post('/messages', routes.createMessage);
    app.put('/messages/:id', routes.updateMessage);
    app.get('/users', routes.getUsers);


    // Start server
    app.listen(config.get('port'), function () {
        console.log("Express server listening on port %d", config.get('port'));
    });

});

