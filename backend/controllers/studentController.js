import Student from "../models/student.js";
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const regiseter = async (req, res) => {
    try {
        const { name, email, password, course, skills, role } = req.body
        if (!name) {
            return res.status(400).json({ message: "Please provide name" })
        }
        if (!email) {
            return res.status(400).json({ message: "Please provide email" })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const existEmail = await Student.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ message: "User already registered, please login" })
        }

        if (!password) {
            return res.status(400).json({ message: "Please provide password" })
        }
        if (!course) {
            return res.status(400).json({ message: "Please provide course" })
        }
        if (!skills) {
            return res.status(400).json({ message: "Please provide skills" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            course,
            skills,
            role: role || "student"
        });
        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student: student
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: "Please provide email" })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const existUser = await Student.findOne({ email });
        if (!existUser) {
            return res.status(404).json({ message: "User not found, please register first" })
        }

        let comparedPassword = await bcrypt.compare(password, existUser.password);
        if (!comparedPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        let token = jwt.sign(
            { email: email, id: existUser._id, role: existUser.role },
            process.env.JWT_SECRET || "placement_portal_jwt_secret_2024",
            { expiresIn: '2d' }
        )

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                role: existUser.role,
                course: existUser.course,
                skills: existUser.skills,
                appliedCompanies: existUser.appliedCompanies
            }
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let students = await Student.find().select('-password');
        if (students.length === 0) {
            return res.status(404).json({ message: "No Data Found" })
        }
        return res.status(200).json({
            success: true,
            message: "Received all students",
            students: students
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        if (!student) {
            return res.status(404).json({ success: false, message: "No user found" })
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            student: student
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const validId = await Student.findById(id);
        if (!validId) {
            return res.status(400).json({ success: false, message: "Student not found" })
        }
        await Student.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Student deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).select('-password');
        if (!student) {
            return res.status(400).json({ message: "No user found with this id" })
        }
        return res.status(200).json({
            success: true,
            message: "Student found successfully",
            student: student
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get logged-in user profile
export const getMe = async (req, res) => {
    try {
        const { id } = req.user;
        const student = await Student.findById(id).select('-password').populate('appliedCompanies');
        if (!student) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ success: true, student })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}