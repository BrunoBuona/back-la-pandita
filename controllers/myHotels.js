const Hotel = require('../models/Hotel')

const controller = {
    readHU: async(req,res)=>{
        let query = {};
        if(req.query.userId){
            query = {userId: req.query.userId};
        }
        try{
            let hotels = await Hotel.find(query)
            if(hotels){
            res.status(200).json({
                response: hotels,
                success: true,
                message: 'Hotels Founded'
            })}else{
                res.status(404).json({
                    success: false,
                    message: 'Hotels not Founded'
                })
            }
        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
    }
}}

module.exports = controller