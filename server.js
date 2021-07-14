const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const userschema = require('./models/UserModel')

const app = express()

mongoose.connect(process.env.DATABASE_URL, (err) =>{
    if(err){ 
        console.log(err)
    }
    else{
        console.log('Database successfully connected')
        app.emit('ready')
    }
})







app.use(express.json())
app.use(cors())

app.get("/users", async (req, res) =>{
    const user = await userschema.find()
    if(user.length === 0){
        res.json({data:"No data present"})
 
    }
    else{
        res.json({data: user})
    }
})


app.post('/input',(req, res) =>{
    const user = new userschema({
        name: req.body.name,
        contact: req.body.contact,
        subjects: req.body.subjects,
        class: req.body.class,
        society: req.body.society,
        year: req.body.year
    })

    user.save()
        .then(data =>{
            console.log(data.subjects[0])
            console.log(data.society)
            res.json(data)
        })
        .catch(err =>{
            res.status(404).json({err : "Not saved to database"})
        })
    

})





app.on('ready',()=>{
    app.listen(5000, () =>{
        console.log('Server running on port 5000')
    })
})