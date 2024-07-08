const Series = require('../models/seriesModel');
const Character = require('../models/characterModel');

const seriesAdd = async (req, res) => {
    console.log(req.body);
    try {
        const sameSeries = await Series.findOne({ name: req.body.name });
        if (sameSeries) {
            return res.status(409).json({
                success: false,
                message: "A series with this name already exists"
            });
        }
        const newSeries = new Series({
            name: req.body.name,
            description: req.body.description
        });
        await newSeries.save();
        res.status(200).json(newSeries);
    } catch (error) {
        console.error("error creating series :", error);
        return res.status(500).json({
            success: false,
            message: "Could not create serie"
        });
    }
};

const getCharactersInSeries = async (req, res) => {
    try {
        const { seriesName } = req.params;

        // Seri adına göre seri bilgisini bul
        const foundSeries = await Series.findOne({ name: seriesName });

        if (!foundSeries) {
            return res.status(404).json({
                success: false,
                message: 'Seri bulunamadı'
            });
        }

        // Seri id'sine göre karakterleri bul
        const characters = await Character.find({ series: foundSeries._id });

        return res.status(200).json({
            success: true,
            data: characters
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Karakterler getirilemedi'
        });
    }
};

module.exports = {
    seriesAdd,
    getCharactersInSeries
};
