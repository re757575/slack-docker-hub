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
                ' new image build complete,'+
                ' pushed by '+ docker['push_data']['pusher'];

            request({
                uri: salckUrl,
                method: 'POST',
                json: {
                    'text': slackText
                }
            }, function(error, response, result) {
                console.log(result);
                res.send(result);
            });
    });
    
    
module.exports = router;
