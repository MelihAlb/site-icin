const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }]
});

const Series = mongoose.model('Series', seriesSchema);
module.exports = Series;
