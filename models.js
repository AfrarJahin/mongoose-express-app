const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
},{strictPopulate: false});

const PhoneSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{strictPopulate: false});
const User = mongoose.model("User", UserSchema);
const Phone = mongoose.model("Phone", PhoneSchema);
module.exports = {User,Phone};