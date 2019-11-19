const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res) {
    res.send(`code : ${req.query.code}<br> id_questionnaire : ${req.query.id_questionnaire}`);
});

router.get('/read', (req, res) => {
    try {
        fs.accessSync('./data')
        fs.readFile('./data', (err, data) => {
            if (err) {
                return console.log(err);
            }
            res.send(`<pre>${data.toString()}</pre>`);
        });
    } catch (e) {
        res.send('Nothing to read')
    }
});

router.post('/hook', function (req, res) {
    let date = new Date();
    let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    fs.appendFile(`./data`, `${dateString}\n${JSON.stringify(req.body)}\n\n`, (err) => {
        if (err) {
            return console.log(err);
        }
        res.send("The file was saved!");
    });
});

module.exports = router;
