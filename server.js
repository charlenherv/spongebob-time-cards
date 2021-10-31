const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

app.get('/getBackgrounds', (req, res) => {
    const directoryPath = path.join(__dirname, '/public/backgrounds/');
    fs.readdir(directoryPath, function (err, files) {
        let filteredFiles = [];
        for(var i in files) {
            const ext = path.extname(files[i]);
            if(ext === ".jpg" || ext === ".png" || ext === ".gif") {
                //do something
                filteredFiles.push(files[i])
            }
         }

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        res.json(filteredFiles);
    });
})

app.listen(port, host, function(){
    console.log('Running on localhost:5000')
});