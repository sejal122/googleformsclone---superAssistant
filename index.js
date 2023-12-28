const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sejalmac:KtaOhpBvhGblDH8r@cluster0.h7joqyc.mongodb.net/?retryWrites=true&w=majority";

app.listen(8000,()=>{
    console.log('server running...')
})
app.get('/data' , async(req,res)=>{
    const client =new MongoClient(uri)
    //res.setEncoding('utf8');
    console.log(client)
    try{
        await client.connect()
        console.log('connected to client')
        const database=client.db('Googleformclone')
        console.log('databasee ' , database)
        const users=database.collection('googleformclone')
        const returnedusers=await users.find().toArray()
        res.send(returnedusers)
    }finally{
await client.close()
    }
})

app.post('/forms',(req,res)=>{
    const cli=new MongoClient(uri)
    const form=req.body
    //console.log(form)
  
    console.log(form)
    try{
         cli.connect();
        const database=cli.db('Googleformclone')
        const allforms=database.collection('googleformclone')
        console.log(allforms)
        allforms.insertOne({form})
        console.log("-----------")
        console.log(allforms)
    }
    catch{
        res.status(409).send('something went wrong')
    }
})

