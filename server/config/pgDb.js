const {Client}=require('pg');



const connectionString = 'postgress://postgres:admin@localhost:5000/database';
const conDB = new Client({
    connectionString: connectionString
});
conDB.connect();

module.exports=conDB;