var express = require('express');
var router = express.Router();

module.exports.about = function(req, res) {
	res.render('generic-text', { title: 'About' });
};