//const {Client}=require('pg');
const Pool = require('pg').Pool

/*
const connectionString = 'postgress://postgres:admin@localhost:5400/demoDatabase';
const conDB = new Client({
    connectionString: connectionString
});*/
//conDB.connect();

const conDB = async () => {
	try {
		 const pool =await new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'demoDatabase',
            password: 'admin',
            port: 5400,
          });
        console.log('PostgreSql connected... *_*');
        return pool;
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
module.exports=conDB;