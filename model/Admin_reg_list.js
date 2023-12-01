const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Admin_reg_list = new Schema({  
    seckey: String,
    username: String,
    password: String,
    refresh_token: String  
});

module.exports = model('Admin', Admin_reg_list)