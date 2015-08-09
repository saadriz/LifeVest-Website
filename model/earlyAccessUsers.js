/**
 * Created by Marwen on 08/08/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true
	}
});

exports.User = mongoose.model('EarlyAccessUser', UserSchema);
