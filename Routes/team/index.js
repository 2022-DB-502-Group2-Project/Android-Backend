const Router = require('express').Router;
const { team } = require('../../components');
const { commonmessage,PAGINATION } = require('../../utils/codes')

const router = Router();
const db = new team();

router.get('/teams',async(req,res,next) => {
    try{
        const {
            pagination,
            start
        } = req.query;
        if(start){
            const result = await db.get_team_list_pagination(start,pagination || PAGINATION);
            return res.status(200).json(commonmessage(result));
        }else{
            const result = await db.get_team_list();
            return res.status(200).json(commonmessage(result));
        }
    }catch(err){
        next(err);
    }
})

router.get('/teamscount',async(req,res,next) => {
    try{
        const result = await db.get_team_count();
        const data = result[0]['COUNT(*)'];
        return res.status(200).json(commonmessage(data))
    }catch(err){
        next(err);
    }
})

router.get('/teamstadium',async(req,res,next) => {
    try{
        const {
            teamid
        } = req.query;
        const result = await db.get_team_stadium(teamid);
        return res.status(200).json(commonmessage(result));
    }catch(err){
        next(err);
    }
})

router.get('/teaminfo',async(req,res,next) => {
    try{
        const {
            teamid
        } = req.query;
        const result = await db.get_team_individual(teamid);
        return res.status(200).json(commonmessage(result));
    }catch(err){
        next(err);
    }
})

router.get('/teamplayers',async(req,res,next) => {
    try{
        const {
            teamid,
            pagination,
            start
        } = req.query;
        if(start){
            const result = await db.get_team_players_pagination(teamid,start,pagination || PAGINATION)
            return res.status(200).json(commonmessage(result));
        }else{
            const result = await db.get_team_players_list(teamid);
            return res.status(200).json(commonmessage(result));
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;