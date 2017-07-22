var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var dateFormat = require('dateformat');
var Horoscope = require('../service/horoscope.js');

var horoscopes= new Horoscope();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getDailyHoroscope/:sign/:date?', function(req, res, next) {
	var sign = req.params['sign'];
	var now = new Date();
	var today = dateFormat(now, "yyyy-mm-dd");
	var datestr = req.params['date']?(today === req.params['date'] ? "today": (today > req.params['date'] ? "yesterday": "tomorrow")): "today";
	console.log(today,req.params['date'], datestr);
	console.log("today === req.params['date']", today === req.params['date']);
	console.log("today > req.params['date']", today > req.params['date']);

	var date=req.params['date'] || today, signNo = 1, text;

	var horoscopeText = horoscopes.getDailyHoroscope(sign, datestr);

	res.json({'name':sign,'horoscope': horoscopeText, 'date': datestr});

	/*request({
		uri: "https://www.astroyogi.com/horoscopes/daily/aries-free-horoscope.aspx",
	}, function(error, response, body) {
		var $ = cheerio.load(body);
		$("#myTabContent .tab-pane .text-justify span").each(function (i, element) {
			console.log(i,datestr, $(this).text());
			if (i === 0 && datestr === "yesterday") {
				text = $(this).text();
			}
			if (i === 1 && datestr === "today") {
				text = $(this).text();
			}
			if (i === 2 && datestr === "tomorrow") {
				text = $(this).text();
			}
			if (text) {
				text = text.replace("Click here for a more personalised reading", "");
				text = text.replace(", predict astroYogi astrologers","");
			}
		});

		res.json({'name':'aries','horoscope': text, 'date': req.params['date']});
  	});*/
});


module.exports = router;
