const mongoose=require('mongoose')

const dbUri='mongodb+srv://admin:1234@cluster0.xfny7ns.mongodb.net/employee_db?retryWrites=true&w=majority'

module.exports=()=>{
    return mongoose.connect(dbUri)
}
