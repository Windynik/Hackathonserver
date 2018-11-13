const express = require('express');
const router = express.Router();
var utils = require("../utils.js")
const url = `https://api.judge0.com/submissions?wait=true`;

var request = require('request');
router.get('/test', (req, res) => {
    res.send("Well run works");
});


router.post('/', (req, res) => {
    code=req.body.code;
    language_id=req.body.lang_id;
    stdin=req.body.stdin;
    console.log("well shit")
    console.log(req.body)
    var options = {
        uri: url,
        method: 'POST',
        json: {
            "source_code": code,
            "language_id": language_id,
            "number_of_runs": "1",
            "stdin": stdin,
            "cpu_time_limit": "2",
            "cpu_extra_time": "0.5",
            "wall_time_limit": "5",
            "memory_limit": "128000",
            "stack_limit": "64000",
            "max_processes_and_or_threads": "30",
            "enable_per_process_and_thread_time_limit": false,
            "enable_per_process_and_thread_memory_limit": true,
            "max_file_size": "1024"
        }
    };
    request(options, function (error, response, body) {
        
        if(typeof(body.token) !== 'undefined'){
            success = true;
            err = error;
            data = body;
            res.json(utils.kek(success, err, data));}

        
        else{ 
            success = false;
            err = "400";
            data = body;
            res.json(utils.kek(success, err, data));

        }
    });

})
module.exports = router;