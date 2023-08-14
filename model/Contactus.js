const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const contactUsSchema = new Schema({
    name: String,
    email: String,
    message: String,
    userId: String,
});
const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;