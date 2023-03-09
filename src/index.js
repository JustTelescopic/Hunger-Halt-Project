const path = require('path');
const express = require('express');
const app = express();


const port = process.env.PORT || 3000

require("./db/conn")
const Register = require("./models/registers")
const ngoRegister = require("./models/ngoregisters")
const staticPath = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")



app.use(express.static(staticPath))

app.use(express.json())
app.use(express.urlencoded({ extended:false}))


app.set("view engine", "hbs")
app.set("views", template_path)


app.get('/' , (req,res) => {
    res.render("index")
});
app.get('/index' , (req,res) => {
    res.render("index")
});
app.get('/about' , (req,res) => {
    res.sendFile('about.html', { root: '../Hunger-Halt-Project/public' });});
app.get('/blog' , (req,res) => {
    res.sendFile('blog.html', { root: '../Hunger-Halt-Project/public' });});
app.get('/contact' , (req,res) => {
    res.sendFile('contact.html', { root: '../public' });});


app.get('/login' , (req,res) => {
    res.render("login")
});
app.get('/ngologin' , (req,res) => {
    res.render("ngologin")
});
app.get('/register' , (req,res) => {
    res.render("register")
});
app.get('/reguser' , (req,res) => {
    res.render("reguser")
});
app.get('/ngodisplays' , (req,res) => {
    res.render("ngodisplays")
});
app.get('/fooduser' , (req,res) => {
    res.render("fooduser")
});
app.get('/profileuser' , (req,res) => {
    res.render("profileuser")
});


// const User = require('../models/user'); // import your user model

app.get('/users/', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // find user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(`Username: ${user.username}`); // send the username of the user
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//User Registration
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


//User/NGO Login
app.post('/login' , async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const useremail = await Register.findOne({email:email});
    //    res.send(useremail.password)
    //    console.log(useremail);
        if(useremail.password1 === password){
            res.status(201).render("index")
        }
        else{
            res.send("Invalid credentials")
        }
    } catch (error) {
        res.status(400).send(error)
    }

});


//NGO Registration
app.post('/register' , async (req,res) => {
    try {
        // console.log(req.body.name);
        // res.send(req.body.name)
        const password = req.body.password1
        const cpassword = req.body.password2

        if(password === cpassword){
            const ngoUser = new ngoRegister({
                name : req.body.name,
                id : req.body.id,
                email : req.body.email,
                password1 : password,
                password2 : cpassword
            })

            const registered=await ngoUser.save();
            res.status(201).render("ngologin")
        }
    } catch (error) {
        res.status(400).send(error)
    }
    console.log('hello');

});



app.post('/ngologin' , async (req,res) => {
    try {
        const email = req.body.email
        const id = req.body.id
        const password = req.body.password

        const useremail = await ngoRegister.findOne({email:email});
        if(useremail.password1 === password){
            res.status(201).render("fooduser")
        }
        else{
            alert("Invalid credentials")
        }
    } catch (error) {
        res.status(400).send(error) 
    }

});


app.listen(port , () => {
    console.log("Listening to port 3000 yoo")
});