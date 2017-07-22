var request = require('request');
var cheerio = require('cheerio');

var signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
var horoscopeDetail = {};
var Horoscope = function () {

}

Horoscope.prototype.getDailyHoroscope =  function (sign, day) {
	return horoscopeDetail[sign][day];
}
Horoscope.prototype.getWeeklyHoroscope = function () {

}
Horoscope.prototype.getMonthlyHoroscope = function () {

}
Horoscope.prototype.getYearlyHoroscope = function () {

}
signs.forEach(function (sign, i) {
	request({
		uri: "https://www.astroyogi.com/horoscopes/daily/"+sign+"-free-horoscope.aspx",
	}, function(error, response, body) {
		var $ = cheerio.load(body);
		$("#myTabContent .tab-pane .text-justify span").each(function (i, element) {
			var text = $(this).text();
			horoscopeDetail[sign] = horoscopeDetail[sign] || {};
			if (text) {
				text = text.replace("Click here for a more personalised reading", "");
				text = text.replace(", predict astroYogi astrologers","");
				text = text.replace(", advise astroYogi astrologers","");
			}
			if (i === 0) {
				horoscopeDetail[sign]['yesterday'] = text;
			}
			if (i === 1) {
				horoscopeDetail[sign]['today'] = text;
			}
			if (i === 2) {
				horoscopeDetail[sign]['tomorrow'] = text;
			}
		});
	});
});
module.exports = Horoscope;