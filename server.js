const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const client = __dirname + '/public';

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

// STATIC
app.use(express.static(client+'/'));
app.get('/', (req,res) => {
  res.sendFile(client + "/index.html");
});


app.listen(process.env.PORT, function(){
    console.log('Running on localhost:5000')
});