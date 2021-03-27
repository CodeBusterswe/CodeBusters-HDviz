const {Client}=require('pg');
const env =require('./default');


const connectionString =`postgress://${env.USER_NAME}:${env.PASSWORD}@localhost:${env.HOST}/${env.DB_NAME}`;
const conDB = new Client({
    connectionString: connectionString
});
conDB.connect();

module.exports=conDB;