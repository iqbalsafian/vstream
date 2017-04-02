
module.exports.homeList = function(req, res) {
	res.render('locations-list', 
	{ 
		title: 'Loc8r - find a place to work with wifi', 
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find a place to work with wifi'
		},
		locations: [
			{
				name: 'Starcups',
				address: '125 High Street, Reading RG6 1PS',
				rating: 3,
				facilities: ['Hot Drinks', 'Food', 'Premium WiFi'],
				distance: '100m'
			},
			{
				name: 'Cafe Hero',
				address: '125 High Street, Reading RG6 1PS',
				rating: 4,
				facilities: ['Hot Drinks', 'Food', 'Premium WiFi'],
				distance: '200m'
			},
			{
				name: 'Burger Queen',
				address: '125 High Street, Reading RG6 1PS',
				rating: 2,
				facilities: ['Hot Drinks', 'Food', 'Premium WiFi'],
				distance: '250m'
			},
		]
	});
};

module.exports.locationInfo = function(req, res) {
	res.render('location-info', { title: 'Location Info' });
};

module.exports.addReview = function(req, res) {
	res.render('index', { title: 'Add review'});
};