const dotenv = require('dotenv');
const oracledb = require('oracledb');

// Make dotenv configuration
// set api server's .env file's configuration
dotenv.config({
    path: `${__dirname}/../.env`
});

/**
 * Documents
 * 
 * Node.js oracledb document : https://node-oracledb.readthedocs.io/en/latest/index.html
 * oracledb prerequisit and installation : https://node-oracledb.readthedocs.io/en/latest/user_guide/installation.html#node-oracledb-installation-instructions
 * Oracle Placeholder : https://node-oracledb.readthedocs.io/en/latest/user_guide/sql_execution.html#query-output-formats
 * Oracle Placeholder Binding : https://node-oracledb.readthedocs.io/en/latest/user_guide/bind.html
 */

class OralceConnector{
    constructor(){
        this.config = {
            user : process.env.DB_USER,
            password : process.env.DB_PW,
            connectString : `(DESCRIPTION =(ADDRESS = (PROTOCOL = ${process.env.DB_PROTOCOL})(HOST = ${process.env.DB_ADDRESS})(PORT = ${process.env.DB_PORT}))(CONNECT_DATA =(SID= ORCL)))`
        };
    }
    
    async execute(sql,bucket = {},maxrow=0,option = null){
        // Make connection
        const connection = await oracledb.getConnection(this.config);
        // If user wants maxrow -> Add maxrow
        if(maxrow){
            // maxRows option mean of maximum row count of return
            option['maxRows'] = maxrow
        }
        /**
             * Execute Query
             * 
             * 1. SQL
             * 2. Bucket - Oracle Placeholder
             * 3. Option for execution
             * 
             */
        const result = await connection.execute(
            sql,
            bucket,
            option || {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }
        );
        // close connection
        connection.close();
        // return execution result : only return rows
        return result.rows;
    }
}

module.exports = {
    OralceConnector
};