const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
    },
    content : {
        type : String ,
        required : true
    },
    summary : {
        type : String ,
        required : true
    },
    cover : {type : String},
    author : {
        type : mongoose.Schema.Types.ObjectId , ref : 'User'
    }
},{timestamps: true})

const PostModel = mongoose.model('Post' , Post);

module.exports = PostModel