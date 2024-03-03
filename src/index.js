const app = require('./app');
const connectDatabase =require('./db');
const PORT = process.env.PORT;


connectDatabase().then((res)=>{
    app.listen(PORT ,()=>{
        console.log(`we are getting connected and port is running at ${PORT} `)
    })
   
}).catch((err)=>{


    console.log(err.message + "<- we are having error")
})