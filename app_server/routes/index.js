var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOthers.about);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  if (req.session.state) {
	res.json({state: req.session.state});
  }
});

module.exports = router;
