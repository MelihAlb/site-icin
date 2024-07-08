const { json } = require("express");
const characterS = require("../models/characterModel");
const Series = require("../models/seriesModel");
const { getNextSequenceValue } = require("../utils/counterHelp");

const charAdd = async (req, res) => {
    console.log(req.body);
    try {
        // Karakter adı kontrolü
        const sameChar = await characterS.findOne({ CharName: req.body.CharName });
        if (sameChar) {
            return res.status(409).json({
                success: false,
                message: "A character with this name already exists"
            });
        }

        // Seri kontrolü
        const foundSeries = await Series.findOne({ series: req.body.series });

        if (!foundSeries) {
            return res.status(400).json({
                success: false,
                message: 'Series not found'
            });
        }

        // Yeni karakter oluşturma
        const newId = await getNextSequenceValue("characterId");
        const newChar = new characterS({ ...req.body, _id: newId, series: foundSeries._id });

        await newChar.save();
        
        return res.status(200).json(newChar);
        
    } catch (error) {
        console.error("Error creating character:", error);
        return res.status(500).json({
            success: false,
            message: "Could not create character"
        });
    }
};

const charGetOne = async (req,res)=>{
    const {id}=req.params
    try {
        const charGetOne = await characterS.findById(id)
        if(charGetOne){
            return res.status(200).json({
                succes:true,message:"find succesful",
                data:charGetOne
            })
        }else {
            return res.status(400).json({
                succes:false,
                message: "Find Character failed"
            }) 
        }

    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get char's"
        })
    }
}

const charGetAll = async (req,res)=>{
    const {page}=req.query;
    const limit = 4;
    const skip = Number(page-1)*limit;
    try {
        const charGetAll = await characterS.find({}).limit(limit).skip(skip)
        return res.status(200).json ({
            succes:true,
            data:charGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get Char's"
        })
        
    }
}

module.exports = {
    charAdd,
    charGetOne,
    charGetAll
};
