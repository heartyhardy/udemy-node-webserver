const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now=new Date();
    var log=`Served a request @${now} method: ${req.method}, url: ${req.url}\n`;

    console.log(log);
    fs.appendFileSync('server.log',log);
    next();
});

app.use((req,res,next)=>{
    res.render('unavailable.hbs',{
        pageTitle:"We'll be back soon!"
    });
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        title:'FullStackBadAss.com',
        pageTitle:'Welcome to FullStackBadAss!',
        links:{
            about:"./about"
        }       
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        title:'FullStackBadAss.com',
        pageTitle:'About us'
    });
});

app.get('/error', (req, res)=>{
    res.send({
        errorMessage:"Unable to handle request."
    });
});

app.listen(3000);