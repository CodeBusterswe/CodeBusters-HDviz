const express=require('express');
const bodyParser =require('body-parser')
const path =require('path')
const db=require('./config/db')
const cors = require('cors')


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

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))