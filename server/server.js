const express=require('express');
const bodyParser =require('body-parser')
const path =require('path')
const db=require('./config/db')
var port= require('./config/default');
const cors = require('cors')
/* const dotenv =require('dotenv');
dotenv.config(); */


const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/data', require('./routes/api/DataSet'));

const query = `
CREATE TABLE Iris (
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
    db.query(query, (err, res) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Table is successfully created');
        //db.end();
    });
});

app.get('/', function(req,res){
    console.log('PostgreSql test works!!')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }


const RUN_ON =process.env.PORT||port.PORT;

app.listen(RUN_ON,()=>console.log(`Server started on port ${RUN_ON}`))