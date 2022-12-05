

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'../public')))

app.set('views',(path.join(__dirname,'../templates/views')))

hbs.registerPartials(path.join(__dirname,'../templates/partials'));




//suppose you own the domain app.com and routes like app.com/help or app.com/about
app.get('',(req,res) => { //for app.com
res.render('index.hbs',{
    title:"weather",
    name:"nishant",
    age:35
});
});

app.get('/help',(req,res) => { //for app.com/help
    res.render('help.hbs',{
        name:'nishant help',
        age:35
    });
    });

app.get('/about',(req,res) => { //for app.com/about
    res.render('about.hbs',{
        name:'nishant about',
        age:35
    });    
    });



    app.get('/weather',(req,res) => {
        let address = req.query.address;
        if(!address){
            return res.send({error:'Please provide a serach parameter fro address'});
        }else{
            geoCode(address,(error,data) => {
                if(error){
                    return res.send({error:'Geo code Please provide a serach parameter for address'});
                }
                console.log(data.latitude);
                forecast(data.longitude, data.latitude, (error, data) => {
                    if(error){
                        return res.send({error:'forecast Please provide a serach parameter for address'});
                    }
                    console.log('Error', error)
                    console.log('Data', data)
                    res.send({forecast:'abc',location:'def',address:address,data:data});
                  });
                
                });
           
        }
       
        });

    app.get('/products',(req,res) => {
        
        if(!req.query.search){
            return res.send({error:'Please provide a serach parameter'});
        }
        //console.log(req.query);
        res.send({products:[]});
        });

    app.get('/what',(req,res) => { 
        res.render('pagenotfound.hbs',{
            name:'nishant about',
            age:35,
            error:"error for what"
        });    
        });

     //for help/iamstuck
     app.get('/help/*',(req,res) => { 
        res.render('pagenotfound.hbs',{
            name:'nishant about',
            age:35,
            error:"error for help"
        });    
        });

    //for 404
    app.get('*',(req,res) => { //for 404 
        res.send('page not found');
        });

app.listen(3000,() =>{//start the web server and listen at post 3000 and the second parameter is a callnack which executed once the
                     //server starts
console.log('server is up on port 3000');
}); 