var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connected error ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

var gracefulShutDown = function(msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through: ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function() {
	gracefulShutDown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function() {
	gracefulShutDown('app termination', function() {
		process.exit(0);
	});
});

require('./locations');
