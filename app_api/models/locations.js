var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);

// db.locations.save({
// 	name: "Warung Kak Minah",
// 	address: "Depan Kubur, Kg Melayu Raya, 81500 Pekan Nenas, Johor, Malaysia.",
// 	rating: 3,
// 	facilities: ['Hot Drinks', 'Food'],
// 	coords: [103.4966791, 1.5833885],
// 	openingTimes: [
// 		{
// 			days: 'Saturday - Thursday',
// 			opening: '8:00am',
// 			closing: '11:00am',
// 			closed: false
// 		},
// 		{
// 			days: 'Friday',
// 			opening: '12:59am',
// 			closing: '12:58am',
// 			closed: true
// 		}
// 	]
// })

//db.locations.update({"_id": ObjectId(58e0c01ffa6d80b112a90eb8)}, {$set:{"coords": [103.496320, 1.583458]}})
// db.locations.update(
// 	{"_id": ObjectId("58e1eb42b191c56a3433c532")},
// 	{
// 		$push: {
// 			reviews: {
// 				author: 'Wak Tojet',
// 				rating: 4,
// 				timestamp: new Date("July 16, 2013"),
// 				reviewText: 'The place looks stunning with big-screen and have cable TV too!'
// 			}
// 		}
// 	}
// )