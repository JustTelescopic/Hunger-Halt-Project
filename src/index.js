const path = require('path');
const express = require('express');
const app = express();


const port = process.env.PORT || 3000

require("./db/conn")
const Register = require("./models/registers")
// console.log(path.join(__dirname, "../public"));
const staticPath = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")

app.use(express.static(staticPath))

app.use(express.json())
app.use(express.urlencoded({ extended:false }))


// app.use(express.static(staticPath));
app.set("view engine", "hbs")
app.set("views", template_path)


app.get('/' , (req,res) => {
    res.render("index")
});
app.get('/index' , (req,res) => {
    res.render("index")
});
app.get('/about' , (req,res) => {
    res.sendFile('about.html', { root: 'public' });});
app.get('/blog' , (req,res) => {
    res.sendFile('blog.html', { root: 'public' });});
app.get('/contact' , (req,res) => {
    res.sendFile('contact.html', { root: 'public' });});

    
app.get('/login' , (req,res) => {
    res.render("login")
});
app.get('/register' , (req,res) => {
    res.render("register")
});
app.get('/reguser' , (req,res) => {
    res.render("reguser")
});


app.post('/reguser' , async (req,res) => {
    try {
        // console.log(req.body.name);
        // res.send(req.body.name)
        const password = req.body.password1
        const cpassword = req.body.password2

        if(password === cpassword){
            const regUser = new Register({
                name : req.body.name,
                location : req.body.location,
                email : req.body.email,
                password1 : password,
                password2 : cpassword
            })

            const registered=await regUser.save();
            res.status(201).render("index")
        }
    } catch (error) {
        res.status(400).send(error)
    }
    console.log('hello');
});

app.listen(port , () => {
    console.log("Listening to port 3000 yoo")
});