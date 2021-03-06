// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(reg, res) {
  let dt = new Date();
  res.json({
    unix: Number(dt),
    utc: dt.toUTCString()
  });
});

app.get("/api/:date", function(req, res) {
  let paramDate = req.params.date;

  if (isNaN(paramDate)) {

    let dt = new Date(paramDate);
    if (dt.toString() != "Invalid Date") {
      res.json({
        unix: Number(dt),
        utc: dt.toUTCString()
      });
    } else {
      res.json({ error: dt.toString() });
    }
    
  } else {

    let unixTimestamp = Number(paramDate);
    let dt = new Date(unixTimestamp);
    res.json({
      unix: unixTimestamp,
      utc: dt.toUTCString()
    });
    
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
