const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const visit_count = new Schema({  
    id: String,
    "visit(s)": Number,
    time: String     
});

module.exports = model('Visit Count', visit_count)