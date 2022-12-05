const request = require('request');



   const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=848c8ce67f25b6d70334edd32f69a3da&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude);
    request({url:url,json:true},(error,response)=>{
           if(error){
               callback("unable to connect",undefined);
           }else  if(response.body.error){
               callback("unable to find the location",undefined);
           }   
           else{
               callback(undefined,{
                   temperature:response.body.current.temperature,
                   precip:response.body.current.precip
                   
               }
                   
                   );
       
           }
           })
   }

    module.exports = forecast;