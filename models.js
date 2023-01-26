const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {strictPopulate: false});

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
}, {strictPopulate: false});


const PostSchema = new mongoose.Schema({
    keywords: [{
        type: String,
        required: true,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {strictPopulate: false});


const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
}, {strictPopulate: false});

const User = mongoose.model("User", UserSchema);
const Phone = mongoose.model("Phone", PhoneSchema);
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {User, Phone, Post,Comment};
