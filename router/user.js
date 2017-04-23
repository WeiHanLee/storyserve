/**
 * 
 */
var jsonwebtoken = require('jsonwebtoken');
var User = require('../model/user');
var secretKey = require('../config').secretKey;

function createToken(user) {
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    }, secretKey, {
            expiresIn: 1440
        });

    return token;
}


function user(api) {

    api.post('/signup', function (req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                success: true,
                message: 'User has been created!',
                token: token
            });
        });
    });

    api.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });

    api.post('/login', function (req, res) {
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {

            if (err) {
                throw err;
            }

            if (!user) {
                res.send({ message: 'User or password doesnot exist' });
                return;
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.send({ message: 'Invalid Password!' });
                } else {
                    //token
                    var token = createToken(user);
                    res.json({
                        success: true,
                        message: 'Successful login!',
                        token: token
                    });
                }
            }
        });
    });


}

module.exports = user;