var request = require("request");
var apiOptions = {
	server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	//apiOptions.server = domain.com
}

var requestOptions = {
	url: 'http://yourdomain.com',
	method: "GET",
	json: {},
	qs: {
		offset: 20
	}
};
request(requestOptions, function(err, response, body) {
	if (err) {
		console.log(err);
	} else if (response.statusCode === 200) {
		console.log(body);
	} else {
		console.log(response.statusCode);
	}
});

var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function() {
	var earthRadius = 6371;

	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};

	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	};

	return {
		getDistanceFromRads: getDistanceFromRads,
		getRadsFromDistance: getRadsFromDistance
	}
})();

var sendJSONResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.locationsCreate = function (req, res, callback) {
	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
				days: req.body.days1,
				opening: req.body.opening1,
				closing: req.body.closing1,
				closed: req.body.closed1,
			}, {
				days: req.body.days2,
				opening: req.body.opening2,
				closing: req.body.closing2,
				closed: req.body.closed2,
			}]
		},
		function(err, location) {
			if (err) {
				sendJSONResponse(res, 400, err);
			} else {
				sendJSONResponse(res, 201, location);
			}
		}
	);
};

var meterConversion = (function() {
	var mToKm = function(distance) {
	    return parseFloat(distance / 1000);
	};
	var kmToM = function(distance) {
	    return parseFloat(distance * 1000);
	};
	return {
	    mToKm : mToKm,
	    kmToM : kmToM
	};
})();

module.exports.locationsListByDistance = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	maxDistance = (!req.query.maxdistance === NaN) ? parseFloat(req.query.maxdistance) : 1;

	console.log('Max dist:' + maxDistance)
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	var geoOptions = {
		spherical: true,
		maxDistance: meterConversion.kmToM(maxDistance),
		num: 10
	};

	Loc.geoNear(point, geoOptions, function(err, results, stats) {
		var locations = [];

		if (err){

		} else {
			results.forEach(function(doc) {
				locations.push({
					distance: theEarth.getDistanceFromRads(doc.dis),
					name: doc.obj.name,
					address: doc.obj.address,
					rating: doc.obj.rating,
					facilities: doc.obj.facilities,
					_id: doc.obj._id
				});
			});
		}
		sendJSONResponse(res, 200, locations);
	});
};

module.exports.locationsReadOne = function (req, res, callback) {
	if (req.params && req.params.locationid) {
		Loc
			.findById(req.params.locationid)
			.exec(function(err, location){
				if (!location) {
					sendJSONResponse(res, 404, {
						"message" : "location not found"
					});
					return;
				} else if (err) {
					sendJSONResponse(res, 404, err);
					return;
				}
				sendJSONResponse(res, 200, location);
			});
	} else {
		sendJSONResponse(res, 404, {
			"message" : "Please provide proper request."
		});
	}
};

module.exports.locationsUpdateOne = function (req, res) {
	if (!req.params.locationid) {
		sendJSONResponse(res, 404, {
			"message" : "Not found, location is required"
		});
		return;
	}
	Loc
		.findById(req.params.locationid)
		.select('-reviews -rating')
		.exec(
			function(err, location) {
				if (!location) {
					sendJSONResponse(res, 404, {
						"message" : "location not found"
					});
					return;
				} else if (err) {
					sendJSONResponse(res, 400, err);
					return;
				}
				location.name = req.body.name;
				location.address = req.body.address;
				location.facilities = req.body.facilities.split(",");
				location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
				location.openingTimes = [
					{
						days: req.body.days1,
						opening: req.body.opening1,
						closing: req.body.closing1,
						closed: req.body.closed1
					},
					{
						days: req.body.days2,
						opening: req.body.opening2,
						closing: req.body.closing2,
						closed: req.body.closed2
					}
				];

				location.save(function(err, location) {
					if (err) {
						sendJSONResponse(res, 404, err);
					} else {
						sendJSONResponse(res, 200, location);
					}
				});
			}
		);
};

module.exports.locationsDeleteOne = function (req, res, callback) {
	var locationid = req.params.location;

	if (locationid) {
		Loc
			.findByIdAndRemove(locationid)
			.exec(
				function(err, location) {
					if (err) {
						sendJSONResponse(res, 404, err);
						return;
					}
					sendJSONResponse(res, 204, null);
				}
			);
	} else
	{
		sendJSONResponse(res, 200, {
			"message" : "location was not found"
		});
	}

	/*
		alternatively, do this to do something before removing data from db
		Loc
			.findById(locationid)
			.exec(
				function(err, location) {
					Loc.remove(function(err, location) {
						//confirm success or failure
					});
				}
			);
	*/
};
