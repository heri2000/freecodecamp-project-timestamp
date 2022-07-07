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

app.get("/api/:date", function(req, res) {
  let Moment = require('Moment');
  let strDateFormat = "ddd, DD MMM YYYY HH:mm:ss";

  let paramDate = req.params.date;
  if (isNaN(paramDate)) {

    let dateFormat = [ Moment.ISO_8601, "YYYY-MM-DD" ];
    if (Moment(paramDate, dateFormat, true).isValid()) {
      let mDate = Moment(paramDate);
      res.json({
        unix: mDate.valueOf(),
        utc: mDate.format(strDateFormat) + " GMT"
      });
    } else {
      res.json({ error : "Invalid Date" });
    }
    
  } else {

    let unixTimestamp = Number(paramDate);
    let mDate = Moment(unixTimestamp);
    res.json({
      unix: unixTimestamp,
      utc: mDate.format(strDateFormat) + " GMT"
    });
    
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
