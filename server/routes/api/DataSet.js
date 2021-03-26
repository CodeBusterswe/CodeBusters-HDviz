const express=require('express');
const router=express.Router();
var DB_NAME= require('../../config/default');
const db = require('../../config/db');


//get all data
router.post('/get-tabel-byName', async (req, res, next)=>{
const {table}=req.body;
    
    try{
        if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }
        const query=`SELECT  * FROM ${table}`;
        const result= await db.query(query);
        return res.json(result.rows)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

router.post('/get-data', async (req, res, next)=>{
        const {selectField,table_name}=req.body
        var prepareQuery =q=>q.map(item=>item).join();
        try{
            if(!table_name){
                return res.status(400).send({msg:'Pleas select table name!!'});
            }
            const query=`SELECT ${prepareQuery(selectField)} FROM ${table_name}`;
            const result= await db.query(query);
            return res.json(result.rows);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error in get data');
        }
});


router.post('/get-custom-data', async (req, res, next)=>{
    const {selectField}=req.body;
    const {compareValue,conditionSelected,inputData,table}=req.body.params
    
    var prepareQuery =q=>q.map(item=>item).join();

    const compareValues=[]
    compareValues.push(compareValue)
    function concatQuery(){return compareValues.map(d=>{return d+ conditionSelected+`'${inputData.value}'`;})}
    const dataQuery=concatQuery()
    var prepareConcatQuery =q=>q.map(item=>item).join('');

    try{
        if(!table){
            return res.status(400).send({msg:'Pleas select table name!!'});
        }
        const query=`SELECT ${prepareQuery(selectField)} FROM ${table} WHERE (${prepareConcatQuery(dataQuery)})`;
        const result=await db.query(query);
        console.log ("result.rows:",res.rows)
        return res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all columns from table
router.post('/get-params', async (req, res, next)=>{
const {table}=req.body;
    try{
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='${DB_NAME.DB_NAME}' AND table_name ='${table}'`
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
    try{
        const query=`SELECT column_name FROM information_schema.columns WHERE table_catalog='${DB_NAME.DB_NAME}' AND table_name ='${table}'`
        const result= await db.query(query);
        return res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});

// get all tables from db //Funziona solo se il catalog é demoDatabase -> restituisce tutte le tabelle del database
//SELECT table_name FROM information_schema.tables WHERE table_catalog='demoDatabase' AND table_schema='public'
router.get('/get-tables', async (req, res, next)=>{
    try{
        console.log("${DB_NAME}:",DB_NAME.DB_NAME)
        const query=`SELECT table_name FROM information_schema.tables WHERE table_catalog='${DB_NAME.DB_NAME}' AND table_schema='public'`;
        const result= await db.query(query);
        return res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error in get data');
    }
});
module.exports=router;