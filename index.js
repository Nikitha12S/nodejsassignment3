const express=require('express')
const bodyParser=require('body-parser')

const connectDb=require('./db.js')
const employeeRoutes=require('./controller/employee.controller')

const app=express()

app.use(bodyParser.json())
app.use('/api/employees',employeeRoutes)

connectDb()
.then(()=>{
   console.log('db connection succeeded');
   app.listen(3001,()=>console.log('server started at 3001'))
})
.catch(err=>console.log(err))
