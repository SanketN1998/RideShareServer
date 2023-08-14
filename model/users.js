const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  password: String,
  name: {type:String,default:null},
  age: {type:String,default:null},
  surname: {type:String,default:null},
  birthdate: {type:String,default:null},
  address: {type:String,default:null},
  profilePic:{type:String,default:null},
  role:{type:String, default: null}
});
const User = mongoose.model('User', userSchema);
module.exports = User;