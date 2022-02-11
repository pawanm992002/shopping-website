const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/conn')
const customerDetail = require('./models/customer')
const bcrypt = require('bcrypt')


const port = process.env.PORT || 8000
const app = express()

const publicPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


app.use(express.static(publicPath))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/register",(req,res)=>{
    res.render('register')
})

app.get("/login",(req,res)=>{
    res.render('login')
})
app.post("/register", async (req,res)=>{
    try {
        const password = req.body.password
        const cpassword = req.body.cpassword
        if(password === cpassword){
            const getDetails = new customerDetail({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword
            })
            const saveDetails = await getDetails.save()
            res.status(201).render('index')
        }
    } catch (err) {
        res.status(404).send(err)
    }
})

app.post("/login",async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const findUser = await customerDetail.findOne({email:email})
        if(findUser.password == password){
            res.status(201).render('index',{name:email[0].toUpperCase()})
        }
        else{
            res.send('email or password is not mathing')
        }
    } catch (err) {
        res.status(404)
        res.send("email or password is wrong")
    }
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})