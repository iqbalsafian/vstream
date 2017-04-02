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
// 	name: "Warung Wak Moh & Miah",
// 	address: "No 5, Rizab 1, Kg Melayu Raya, 81500 Pekan Nenas, Johor, Malaysia.",
// 	rating: 3,
// 	facilities: ['Hot Drinks', 'Food'],
// 	coords: [103.4951937, 1.5840187],
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
// 	{"_id": ObjectId("58e0c01ffa6d80b112a90eb8")},
// 	{
// 		$push: {
// 			reviews: {
// 				author: 'Wak Tojet',
// 				id: ObjectId(),
// 				rating: 4,
// 				timestamp: new Date("July 16, 2013"),
// 				reviewText: 'The place looks stunning with big-screen and have cable TV too!'
// 			}
// 		}
// 	}
// )