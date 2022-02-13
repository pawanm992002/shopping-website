const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/conn')
const customerDetail = require('./models/customer')
const bcrypt = require('bcrypt')
const res = require('express/lib/response')


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

app.get("/mobiles",(req,res)=>{
    res.render('mobiles')
})
app.get("/electronics",(req,res)=>{
    res.render('electronics')
})
app.get("/fashion",(req,res)=>{
    res.render('fashion')
})
app.get("/home",(req,res)=>{
    res.render('home')
})
app.get("/grocery",(req,res)=>{
    res.render('grocery')
})
app.get("/beauty",(req,res)=>{
    res.render('beauty')
})
app.get("/toys",(req,res)=>{
    res.render('toys')
})
app.get("/study",(req,res)=>{
    res.render('study')
})
app.get("/kichen",(req,res)=>{
    res.render('kichen')
})
app.get("/sports",(req,res)=>{
    res.render('sports')
})
app.get("/register",(req,res)=>{
    res.render('register')
})
app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/services",(req,res)=>{
    res.render('services')
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

app.get('*',(req,res)=>{
    res.status(404).render("404")
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})