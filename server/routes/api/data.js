const express=require('express');
const router=express.Router();
//const config=require('config');
const Upload =require('../../uploadFile/UploadFile')

//models 
const Data = require('../../models/Data');
const File = require('../../models/File');

//upload file 
router.get('/get-file',async(req,res)=>{
    const files = req.file;

    try{
        const file = await File.find();
       // console.log('+++++ your are in upload file', 'inser file:',file,)
        if (!file) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Does not exist!!' }] });
          }
                     // const f=await fileModel.save(); 
        res.json(file) //,{fileName: files.originalname, filePath: `cd../allFilles/uploads/${files.path}`}

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error, upload file');
    }

})

//upload file 
router.post('/upload-file',Upload.single('file'),async(req,res)=>{
    const files = req.file;
    //console.log('+++++ your are in upload file', 'Body:',req.file.filename,)
    let fileModel=new File({
        filePath:req.file.path,
        fileType:req.body.fileType,
        fileName:req.file.filename
    });

    const { filename } = req.file;
    try{
        const file = await File.findOne({fileName:filename});
        console.log('+++++ your are in upload file', 'inser file:',filename,)
        if (file) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'This file already exist!!' }] });
          }else{
                      const f=await fileModel.save(); 
                      res.json(f) //,{fileName: files.originalname, filePath: `cd../allFilles/uploads/${files.path}`}
          }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error, upload file');
    }

})

// insert new data 
router.get('/insert-data',async(req,res)=>{
    
    const {dataType,saveData,xx} =req.body;
    //console.log('you are in insert api data','Body:',dataType,' ', saveData)
    try{
        const data=await Data.findOne({dataType});
       // res.json(data);

       const newData=new Data;
       newData.dataType=dataType;
       newData.dataSaved.unshift(1,2,3,4,5,6,7,8,9,100);
       //data.dataSaved.unshift(saveData)
       const d=await newData.save();
       res.json(d)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// get data from db 
router.get('/get-data',async(req,res)=>{
    console.log('you are in GET DATA api data','Body:',req.body)
    try{
        const data=await Data.findOne({dataType:'file csv 3'});
        res.json(data);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;
