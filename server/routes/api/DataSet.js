const express=require('express');
const router=express.Router();
const fs = require("fs");
const Upload =require('../../uploadFile/UploadFile')
const fastcsv = require("fast-csv");
const csv = require("fast-csv");
const path = require('path');
const db = require('../../config/db');


//get all data
router.post('/get-tabel-byName', async (req, res, next)=>{
const {queryField,queryType,table}=req.body;
    console.log('API get All data:',req.body)
    try{
        if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }
        const query=`SELECT  * FROM ${table}`;
        db.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            //res.status(200).send(result.rows);
            res.json(result.rows)
            //db.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

router.post('/get-data', async (req, res, next)=>{
        const {queryField}=req.body;
       // console.log('API get_data query:',req.body.query)
        const {selectField,table_name}=req.body
        var prepareQuery =q=>q.map(item=>item).join();

        try{
            if(!table_name){
                return res.status(400).send({msg:'Pleas select table name!!'});
            }
                //WHERE ${queryField}=${queryType}
            const query=`SELECT ${prepareQuery(selectField)} FROM ${table_name}`;
            db.query(query, function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err);
                }
                console.log ("result.rows:",result.rows)
                res.status(200).send(result.rows);
            });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error in get data');
        }
});


// get all columns from table
router.post('/get-params', async (req, res, next)=>{
const {table}=req.body;
   // console.log('API get-params query:',table, 'req.body:',req.body)
    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='demoDatabase' AND table_name ='${table}'`
        db.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all columns from table
router.post('/get-columns', async (req, res, next)=>{
const {table}=req.body;
   // console.log('API get-columns query:',table, 'req.body:',req.body)
    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='demoDatabase' AND table_name ='${table}'`
        db.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //db.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all tables from db 
router.get('/get-tables', async (req, res, next)=>{
const {queryField,queryType,table}=req.body;
    console.log('API get data query:',req.body)
    try{
       /* if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }*/
        const query="SELECT * FROM information_schema.tables WHERE table_catalog='demoDatabase' AND table_schema='public' ";
        db.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
           //res.json(result.rows)
            //db.end();
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

//delete all from table
/* router.delete('/delete', function (req, res, next) {
    
    console.log('API get data')
    db.query('DELETE  FROM DataSet', function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err);
        }
       // res.status(200).send(result.rows);
       res.json()
    });
}); */


//const query="INSERT INTO DataSet (filename) VALUES($1)";
router.post('/insert-data',Upload.single('file'), async(req, res, next)=>{
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
            csvData.forEach((row,i) => { 
            console.log( + " row:", row, 'index:',i);
            db.query(`INSERT INTO DataSet VALUES ($1, $2, $3, $4,$5)`,
            row, function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err);
                }
            res.json(res.rows)
                });
            });

        }).on("end", function(d) {
        // remove the first line: header
        csvData.shift();
        });
        stream.pipe(csvStream);
   }
   catch(err){
    console.error(err.message);
    res.status(500).send('Server error insert-data');
   }
});

module.exports=router;