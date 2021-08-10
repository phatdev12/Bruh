const mongoose = require('mongoose');

const profile = new mongoose.Schema({
    userID: { type: String, require: true },
    serverID: { type: String, require: true },
    coins: { type: String, default: '1000' },
    bank: { type: Number }
});
const model = mongoose.model('ProfileModels', profile);

module.exports = model;
