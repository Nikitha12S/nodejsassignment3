const express=require('express');
const router =express.Router();
const Employee=require('../models/employee.model')
const {generateCrudMethods}=require('../services/index.js')
const employeeCrud=generateCrudMethods(Employee)
const {validateDbId, raiseRecord404Error}=require('../middlewares')
const winston = require('winston');

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.combine(
     winston.format.timestamp(),
     winston.format.printf(({ timestamp, level, message }) => {
       return `${timestamp} [${level}]: ${message}`;
     })
   ),
   transports: [
     new winston.transports.Console(),
     new winston.transports.File({ filename: 'app.log' }),
   ],
 });

router.get('/test',
(req,res,next)=>{
   logger.info('Testing endpoint was accessed.');
   next();
},
(req,res)=>{
   logger.info('Test endpoint response.');
   res.send('foo')}
);

router.get('/',(req,res)=>{
   logger.info('GET all employees request.');
   employeeCrud.getAll()
   .then(data=>res.send(data))
   .catch(err=>{
      logger.error('Error fetching employees:', err);
});
});

router.get('/:id',validateDbId,(req,res)=>{
   employeeCrud.getById(req.params.id)
   .then(data=>{
      if(data)
         res.send(data)
      else
        raiseRecord404Error(req,res)
         })
  
   .catch(err=>console.log(err))
})



router.post('/',(req,res)=>{
   employeeCrud.create(req.body)
   .then(data=>res.status(201).json(data))
   .catch(err=>console.log(err))
})


router.put('/:id',(req,res)=>{
employeeCrud.update(req.params.id,req.body)
.then(data=> {
   if (data) res.send(data)
   else raiseRecord404Error(req,res)
})
.catch(err=>next(err))
})

module.exports=router
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   