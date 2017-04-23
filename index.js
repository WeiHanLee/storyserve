var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var config = require('./config');

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to the database');
    }
});

var secretKey = config.secretKey;

module.exports = function (app, express, io) {

    var api = express.Router();
    require('./router/user')(api);
    /**
     * middleware 
     */
    api.use(function (req, res, next) {
        var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
        if (token) {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({ success: false, message: 'Failed to authenticate user!' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(403).send({ success: false, message: 'No Token Provided!' });
        }
    });
    //Destination B // provide a legitimate token
    require('./router/story')(api, io);
    api.get('/me', function (req, res) {
        res.json(req.decoded);
    });
    return api;
};


// var data = {};

// express()
//     .use(express.static(__dirname + '/public'))
//     .use(bodyParser.json())
//     .get('/api/data', (req, res) => res.json(data))
//     .post('/api/data', (req, res) => res.json(data = req.data))
//     .get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
//     .listen(config.port);