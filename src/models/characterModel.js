// characterModel.js

const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    CharName: {
        type: String,
        required: true,
        trim: true
    },
    series: {
        type: String, // Kullanıcıdan seri adını girmesini sağlayacak alan
        required: true,
        trim: true
    },
    CharPic: {
        type: String,
        required: true
    }
}, {
    collection: 'Site-Icin',
    timestamps: true
});

const characterS = mongoose.model('Character', characterSchema);

module.exports = characterS;
