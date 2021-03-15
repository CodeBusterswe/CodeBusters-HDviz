const express=require('express');
const router=express.Router();
const fs = require("fs");
//const config=require('config');
const Upload =require('../../uploadFile/UploadFile')
const fastcsv = require("fast-csv");
const csv = require("fast-csv");
const path = require('path');

const conDB = require('../../config/pgDb');


//get all data
router.post('/get-all-data', async (req, res, next)=>{//'SELECT * FROM DataSet'
const {queryField,queryType,table}=req.body;
    console.log('API get All data:',req.body)

    try{
        if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }
       
        const query=`SELECT  * FROM ${table}`;
        conDB.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            //res.status(200).send(result.rows);
           res.json(result.rows)
            //conDB.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

router.get('/get-data', async (req, res, next)=>{//'SELECT * FROM DataSet'
const {queryField,queryType,table}=req.body;
   // console.log('API get data query:',req.body)

    try{
        if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }
       
        const query=`SELECT  ${queryField} FROM ${table}  WHERE ${queryField}=${queryType}`;
        conDB.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //conDB.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});


// get all columns from table
router.post('/get-params', async (req, res, next)=>{//'SELECT * FROM DataSet'
const {table}=req.body;
   // console.log('API get-params query:',table, 'req.body:',req.body)

    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='demoDatabase' AND table_name ='${table}'`
        conDB.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //conDB.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all columns from table
router.post('/get-columns', async (req, res, next)=>{//'SELECT * FROM DataSet'
const {table}=req.body;
   // console.log('API get-columns query:',table, 'req.body:',req.body)

    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='demoDatabase' AND table_name ='${table}'`
        conDB.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //conDB.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all tables from db 
router.get('/get-tables', async (req, res, next)=>{//'SELECT * FROM DataSet'
const {queryField,queryType,table}=req.body;
    console.log('API get data query:',req.body)

    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query="SELECT * FROM information_schema.tables WHERE table_catalog='demoDatabase' AND table_schema='public' ";
        conDB.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //conDB.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

//delete all from table
router.delete('/delete', function (req, res, next) {
    
    console.log('API get data')
    conDB.query('DELETE  FROM DataSet', function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err);
        }
       // res.status(200).send(result.rows);
       res.json()
        //conDB.end();
    });
});



const insertDatax = `
INSERT INTO DataSet (filename)
VALUES ('data1.csv')
`;





/*
router.post('/insert-data', function (req, res, next) {
    console.log('API insert data',req.body)
    const insertData = [req.body.filename];
    ///`INSERT INTO DataSet (filename) VALUES ${req.body.filename}`;
    conDB.query(`INSERT INTO DataSet (filename) VALUES($1)`,insertData, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err);
        }
        //res.status(200).send(result.rows);
        conDB.end();
    });
*/


const query="INSERT INTO DataSet (filename) VALUES($1)";
router.post('/insert-data',Upload.single('file'), async(req, res, next)=>{
   // stream = fs.createReadStream(req.body);
   //console.log('API insert data',req.body,'filename:',req.file.buffer)

  // var filename = fs.createReadStream(path.join(__dirname,req.file.path));
   // console.log('API insert data',req.file.filename,'filename:')
   //console.log('API insert data Path',__dirname,'../../allFiles/uploads/data.json')
   const results = [];

  const xstream= fs.createReadStream(path.join(__dirname,`../../allFiles/uploads/${req.file.filename}`));
  let xsvStream = fastcsv.parse()
     .on('data', function(data){

        let sepal_length = data.sepal_length;
        let sepal_width = data.sepal_width;
        let petal_length = data.petal_length;
        let petal_width = data.petal_width;
        let species = data.species;
        console.log('sepal_length,',sepal_length);
      results.push(data);
     })        
     .on('end', () => {
       console.log('results,',results);
       console.log(results[0]['Lowest Selling Price'])
     });
     xstream.pipe(xsvStream);
    
   try{

  

    let stream = fs.createReadStream(path.join(__dirname,`../../allFiles/uploads/${req.file.filename}`));//
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function(data) {
        console.log('API insert data',data.map((item,index)=>item))
        let sepal_length = data.sepal_length;
        let sepal_width = data.sepal_width;
        let petal_length = data.petal_length;
        let petal_width = data.petal_width;
        let species = data.species;

        csvData.push(data);
 

                 //(sepal_length,sepal_width, petal_length, petal_width,species)
            csvData.forEach((row,i) => { //sepal_length,sepal_width,petal_length,petal_width,species [sepal_length, sepal_width, petal_length, petal_width,species]
                console.log( + " row:", row, 'index:',i);
            conDB.query(`INSERT INTO DataSet VALUES ($1, $2, $3, $4,$5)`,
            row, function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err);
                }
                
           // console.log("inserted " + res.rowCount + " row:", row, 'index:',i);
            // conDB.end();
            res.json(res.rows)
            });
        });

    })
    .on("end", function(d) {
      // remove the first line: header
       
      csvData.shift();
        //+++++++

    });
    stream.pipe(csvStream);
   }catch(err){
    console.error(err.message);
    res.status(500).send('Server error insert-data');
   }


});


let counter = 0; 

// let header = [];
// let data = [];
router.post('/insert-csv',Upload.single('file'), async(req, res, next)=>{

try{


let CvsStream =csv.fromPath(path.join(__dirname,`../../allFiles/uploads/iris.csv`), { headers: true })
.on("data", function(data){
        
        CvsStream.pause();

        let sepal_length = data.sepal_length;
        let sepal_width = data.sepal_width;
        let petal_length = data.petal_length;
        let petal_width = data.petal_width;
        let species = data.species;

        console.log("sepal_length:",sepal_length,'data:',data);

            conDB.query("INSERT INTO DataSet(sepal_length, sepal_width, petal_length, petal_width,species) \
            VALUES($1, $2, $3, $4, $5)", [sepal_length, sepal_width, petal_length, petal_width,species], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;


        CvsStream.resume();
      

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });

}catch(err){
    console.error(err.message);
    res.status(500).send('Server error insert-data');
}


});

module.exports=router;