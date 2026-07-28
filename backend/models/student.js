import mongoose from "mongoose";
const studentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        course:{
            type:String,
            required:true
        },
        skills:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"student"
        },
        appliedCompanies:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"company"
            }
        ]
    },{timestamps:true}
)
const Student=mongoose.model('student',studentSchema);
export default Student;