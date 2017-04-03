var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.locationsCreate = function (req, res, callback) {
	sendJSONResponse(res, 200, {"status" : "success"});
};

module.exports.locationsListByDistance = function (req, res, callback) {
	sendJSONResponse(res, 200, {"status" : "success"});
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

module.exports.locationsUpdateOne = function (req, res, callback) {
	sendJSONResponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res, callback) {
	sendJSONResponse(res, 200, {"status" : "success"});
};