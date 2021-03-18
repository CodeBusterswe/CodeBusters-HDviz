const express=require('express');
const cons=require('consolidate')
const dust=require('dustjs-helpers')
const {pg,Client}=require('pg')
const bodyParser =require('body-parser')
const path =require('path')
const conDB=require('./config/pgDb')
const cors = require('cors')


const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
const corsOptions = {
  origin: 'http://localhost:5400',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
*/

/*
const connectionString ='postgres://demoDB:admin@localhost:5400/demoDatabase';
const client = new Client({
    connectionString: connectionString
});

console.log(client.connect(),'PostgreSql conneccted!!')
*/



/*
app.engine('dust',cons.dust);

app.set('view engine', 'dust');
app.set('view', __dirname+'/views');

app.use(express.static(path.join(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
*/
app.use('/api/data', require('./routes/api/DataSet'));

const query = `
CREATE TABLE DataSet (
    sepal_length VARCHAR(255),
    sepal_width VARCHAR(255),
    petal_length VARCHAR(255),
    petal_width VARCHAR(255),
    species VARCHAR(255)
);
`;


const query1 = `
CREATE TABLE Admin (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

app.get('/c', function (req, res, next) {
    conDB.query(query, (err, res) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Table is successfully created');
        conDB.end();
    });
});

//const conString='postgresql://demoDB:admin@database.server.com:5400/demoDatabase';
/*
const client = new Client({
    user: 'demoDB',
    host: 'localhost',
    database: 'demoDatabase',
    password: 'admin',
    port: 5400,
});
const client1 = new Client();

console.log(client1.connect(),'PostgreSql conneccted!!')
*/


app.get('/', function(req,res){
    console.log('PostgreSql test works!!')
})

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))