const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    noticenom: String,
    date: String,
    Streams: [{type: String}],
    Branch: [{type: String}],
    Company: String,
    YOP: String,
    CTC: String,
    dead: String,
    website: String,
    Notice: String,
    position:String,
    eligibility1: String,
    eligibility2: String,
    eligibility3: String,
    eligibility4: String,
});


module.exports = mongoose.model('Notice', NoticeSchema);