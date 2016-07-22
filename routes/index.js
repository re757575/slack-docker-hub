var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/services/:param1/:param2/:param3')
    .post(function(req, res) {
        console.log(req.params);
        
        var salckUrl = 'https://hooks.slack.com/services/'+ req.params.param1 +'/'
            + req.params.param2 +'/'+ req.params.param3;

        var docker = req.body;
        
        console.log(docker);

            var slackText = '[<'+ docker['repository']['repo_url'] +'|'+ docker['repository']['repo_name'] +'>]'+
                ' new image build complete';

            request({
                uri: salckUrl,
                method: 'POST',
                json: {
                    // "text": slackText,
                    "attachments": [
                        {
                            "color": "good",
                            "author_name": docker['push_data']['pusher'],
                            // "author_link": "https://gravatar.com/avatar/",
                            "author_icon": "https://gravatar.com/avatar/",
                            "title": docker['repository']['repo_name'],
                            "title_link": docker['repository']['repo_url'],
                            "text": "new image build complete",
                        }
                    ]
                }
            }, function(error, response, result) {
                console.log(result);
                res.send(result);
            });
    });
    
    
module.exports = router;
