const Router = require('express').Router;
const { search } = require('../../components');
const { commonmessage,PAGINATION } = require('../../utils/codes')

const router = Router();
const db = new search();

router.get('/getserchlist',async(req,res,next) => {
    try{
        const {
            keyword,
            pagination,
            start
        } = req.query
        if(pagination){
            const result = await db.get_player_list_pagination(start,pagination || PAGINATION);
            return res.status(200).json(commonmessage(result));
        }else{
            const result = await db.get_search_list(keyword);
            return res.status(200).json(commonmessage(result));
        }
    }catch(err){
        next(err);
    }
})

module.exports = router