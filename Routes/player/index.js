const Router = require('express').Router;
const { player } = require('../../components');
const { commonmessage,PAGINATION } = require('../../utils/codes')

const router = Router();
const db = new player();

router.get('/players',async (req,res,next) => {
    try{
        const {
            pagination,
            start
        } = req.query;
        if(start){
            const result = await db.get_player_list_pagination(start,pagination || PAGINATION);
            return res.status(200).json(commonmessage(result));
        }
        else{
            const result = await db.get_player_list_all();
            return res.status(200).json(commonmessage(result));
        }
    }catch(err){
        next(err)
    }
})

router.get('/playerscount',async(req,res,next) => {
    try{
        const result = await db.get_player_count();
        const data = result[0]['COUNT(*)'];
        return res.status(200).json(commonmessage(data))
    }catch(err){
        next(err)
    }
})

router.get('/playerinfo',async(req,res,next) => {
    try{
        const {
            playerid
        } = req.query;
        const result = await db.get_player_list_individual(playerid);
        return res.status(200).json(commonmessage(result));
    }catch(err){
        next(err)
    }
})


module.exports = router;