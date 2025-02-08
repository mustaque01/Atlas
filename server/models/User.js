
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
         type: String,
          required: true 
        },
    lastName: {
         type: String,
          required: true
         },
    email: {
        type: String,
        required: true,
        unique: true 
    },
        password:{
            type:String,
            required:true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
		role:{
            type:String,
            default:"admin"
        },
        verificationToken: String,
		verificationTokenExpiresAt: Date,
        date: {
            type: Date,
            default: Date.now,
        }
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);