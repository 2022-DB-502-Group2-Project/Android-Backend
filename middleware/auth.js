const passport = require('passport');

exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        return res.status(403).json({
            'msg' : 'Login Required'
        })
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        return res.status.send(403).json({
            'msg' : 'Already logged in'
        })
    }
}