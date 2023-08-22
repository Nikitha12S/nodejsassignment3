const mongoose=require('mongoose')

module.exports=mongoose.model('Employee',{
    fullName:{type:String},
    positiion:{type:String},
    location:{type:String},
    salary:{type:Number},
})