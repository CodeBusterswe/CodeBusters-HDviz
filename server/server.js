const express=require('express');
const bodyParser =require('body-parser')
const path =require('path')
const db=require('./config/db')
var port= require('./config/default');
const cors = require('cors');


const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/data', require('./routes/api/DataSet'));


app.get('/test-server', function(req, res) {
  console.log('in server test');
	return res.status(200).json({ server: `server running ${port.PORT}`});
});



const irisDataset = `
CREATE TABLE IrisData (
    sepal_length VARCHAR(255),
    sepal_width VARCHAR(255),
    petal_length VARCHAR(255),
    petal_width VARCHAR(255),
    species VARCHAR(255)
);
`;

// da rimuovere 
app.get('/c', function (req, res, next) {
    db.query(irisDataset, (err, res) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Table is successfully created');
        //db.end();
    });
});

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

const server=app.listen(RUN_ON,()=>console.log(`🚀 🚀 Server started on port ${RUN_ON}`));
module.exports = server;