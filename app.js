const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const { exceptionmessage } = require('./utils/codes')

// Get router : aall of the endpoint starts with '/api'
const api = require('./Routes');
const { session } = require('passport');

// start express 
const app = express();
// Set port. If PORT not in environment variable, set default port as 3000
app.set('port',process.env.PORT || 3000);
// Set logger
process.env.MODE === 'dev'
? app.use(logger('dev'))
: app.use(logger('combined'));

/**
 * Init session. Each fields has a meaning of
 * 
 * resave : 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 설정할 지 결정한다
 * saveUninitialized : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정한다
 * secret : 쿠키에 서명을 추가한다
 * cookie : 세션 쿠키에 관한 설정이다.
 * - httpOnly : 클라이언트에서 쿠키를 확인하지 못하도록한다
 * - secure : false로 할 시 https가 아닌환경에서도 사용할 수 있다.
 * 
 */

app.use('/api',api);

// For checking server liveness
app.get('/ping',(req,res) => {
    return res.status(200).json({
        'msg' : 'pong'
    })
})


// Invalid router
app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} router not found`);
    error.status = 404;
    next(error);
})

// Internal exception handling middleware
app.use((err,req,res,next) => {
    return res.status(err.status || 500).json(exceptionmessage(err.message));
})


module.exports = app;