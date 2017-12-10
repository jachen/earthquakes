var mapimg;
var	clat = 0,
		clon = 0,
		lat = 31.2304, //shanghai 31.2304, 121.4737  Zurich 47.3666, 8.55
		lon = 121.4737,
		zoom = 1,
		earthquakes;

		function preload() {
			mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,0.9.25,0,0/1024x512?access_token=pk.eyJ1IjoiamFjaGVuY2FybCIsImEiOiJjajJlaHE0OW8wNXo4MzJwaXB1YnFrb3RmIn0.WYeP_WLjofL9L3rW7PjMVA');
			//mapimg = loadIamge('https://api.mapbox.com/styles/v1/mapbox/dark-v9.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#2/0/0';

			earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
			//earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv');
		}

function mercX(lon) {
	lon = radians(lon);
	var a = 256/PI*pow(2,zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat) {
	lat = radians(lat);
	var a = 256/PI*pow(2,zoom);
	var b = tan(PI/4  + lat/2);
	var c = PI - log(b);
	return a * c;
}

function setup() {
	createCanvas(1024, 512);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimg,0,0);
	var cx = mercX(clon);
	var cy = mercY(clat);

for (var i = 0; i < earthquakes.length; i++) {
	var data = earthquakes[i].split(/,/);
	console.log(data);
	var lat = data[1];
	var lon = data[2];
	var mag = data[4];


	var x = mercX(lon) - cx;
	var y = mercY(lat) -cy;

	mag = pow(8, mag);
	mag = sqrt(mag);

	var magmax = sqrt(pow(8, 8));

	var d = map(mag, 0, magmax, 0, 120);

	stroke(255, 0, 255);
	fill(255, 0, 255);
	ellipse(x, y, d, d);
	if (data[4] >= 4.5) {
		stroke(0);
		text(data[4], x, y+18);
	}

	stroke(0);
	fill(120);
  textSize(10);
	textStyle(NORMAL);
  textAlign(LEFT);
  text('Allday earthquakes ' + '\u00A9 ' + 'jachen' + ' Ver. 09.12.2017', -100, 200);
  }
}
