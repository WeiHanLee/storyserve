/**
 * 
 */

var Story = require('../model/story');

var story = function (api, io) {

    api.get('/story/all', function (req, res) {
        Story.find({}, function (err, stories) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(stories);
        });
    });

    api.route('/')
        .post(function (req, res) {
            var story = new Story({
                creator: req.decoded.id,
                content: req.body.content
            });
            story.save(function (err, newStory) {
                if (err) {
                    res.send(err);
                    return;
                }
                io.emit('story', newStory);
                res.json({ message: 'New Stroy Created!' });
            })
        })
        .get(function (req, res) {
            console.log(req.decoded);
            Story.find({ creator: req.decoded.id }, function (err, stories) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(stories);
            });
        });
};

module.exports = story;