const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const bookRideSchema = new Schema({
    from: String,
    to: String,
    date: String,
    time: String,
    price: String,
    seats: String,
    pickupLoc: String,
    dropOffLoc: String,
    driverId: Object,
    userId: String,
});
const BookRides = mongoose.model('BookRides', bookRideSchema);
module.exports = BookRides;