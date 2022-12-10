const app = require('./app');
const dotenv = require('dotenv');
const { createServer } = require('http');

// set dotenv config
dotenv.config();

const server = createServer(app);

server.listen(app.get('port'),() => {
    console.log(`Server listening on port ${app.get('port')}`);
})