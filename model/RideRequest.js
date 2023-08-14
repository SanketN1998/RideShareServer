const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const rideRequestScheme = new Schema({
    from: String,
    to: String,
    date: String,
    time: String,
    userId: String,
});
const RideReq = mongoose.model('RideRequest', rideRequestScheme);
module.exports = RideReq;