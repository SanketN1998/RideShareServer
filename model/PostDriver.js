const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const driverPostSchema = new Schema({
    from: String,
    to: String,
    date: String,
    time: String,
    price: String,
    seats: String,
    pickupLoc: String,
    dropOffLoc: String,
    userId: String,
});
const PostDriver = mongoose.model('PostDriver', driverPostSchema);
module.exports = PostDriver;