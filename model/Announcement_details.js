const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const announcement_detail = new Schema({  
    title: String,
    desc: String,
    points:[String],
    image: String,
    date: String  
});

module.exports = model('Announcement Detail', announcement_detail)