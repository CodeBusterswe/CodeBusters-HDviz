const {Client}=require('pg');
const env =require('./default');

//const connectionString = 'postgress://postgres:admin@localhost:5400/demoDatabase';
const connectionString =`postgress://${env.USER_NAME}:${env.PASSWORD}@localhost:${env.HOST}/${env.DB_NAME}`;
const conDB = new Client({
    connectionString: connectionString
});
conDB.connect();

/* function connectionMiddleware(connectionData) {
    const pool = new Pool(connectionData);
    return (req, res, next) => {
        req.pool = pool;
        next();
    }
}

app.use(connectionMiddleware({
    user: 'postgres',
    host: 'localhost',
    database: 'demoDatabase',
    password: 'admin',
    port: 5400,
})); */

module.exports=conDB;