import Student from "../models/student.js"

export const isAdmin = async (req, res,next) => {
    try {
        const{email,id}=req.user
        const student=await Student.findById(id);
        console.log(student)
        if(student.role!='admin'){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}