const {Client}=require('pg');



const connectionString = 'postgress://postgres:admin@localhost:5400/demoDatabase';
const conDB = new Client({
    connectionString: connectionString
});
conDB.connect();

module.exports=conDB;