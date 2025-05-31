import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

export const registerController =async (req,res)=>{
    try {
        const{fullname,email,password}=req.body;
        // console.log(email)
        if(!fullname || !email || !password) return res.status(400).json({message:"Required all fields",success:false,error:true})
            const existingUser =await UserModel.findOne({email});
        // console.log(existingUser)
        if(existingUser) return res.status(400).json({meassge:"Email already exist",success:false,error:true})

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        const user = await UserModel.create({
            fullname,
            email,
            password:hashedPassword
        })
        if(!user) return res.status(400).json({message:"User not created",success:false,error:true})
            const {password:_,...rest} = user._doc
        
            return res.status(201).json({message:"User registed successfully",success:true,error:false})


    } catch (error) {
        console.log(`Error in register controller`,error);
        return res.status(500).json({message:"Internal server error",success:false,error:true});
    }
}

export const loginController =async (req,res)=>{
    try {
        const {email,password} = req.body;
         if( !email || !password) return res.status(400).json({message:"Required all fields",success:false,error:true});
         const user = await UserModel.findOne({email});
        //  console.log(user);
         if(!user) return res.status(400).json({message:"Invalid credentials",success:false,error:true});
         const matchPassword = await bcryptjs.compare(password,user.password);
        //  console.log(`matchPassword : ${matchPassword}`)
        const accessToken = jwt.sign({ id : user._id},
                process.env.SECRET_KEY_ACCESS_TOKEN,
                { expiresIn : '1d'}
            )
        // console.log(accessToken)
         const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
         res.cookie('accessToken',accessToken,cookiesOption)
         return res.status(201).json({message:"Login Successful",success:true,error:false,data:accessToken})
    } catch (error) {
        console.log(`Error in login controller`, error);
        res.status(500).json({message:"Internal server error!",success:false,error:true})
    }
}


export const logoutController =async (req,res)=>{
    try {
        const userId = req.userId;
        console.log(userId)
         if (!userId) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const user= await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.clearCookie('accessToken',cookiesOption)
         return res.status(200).json({ message: "Logout successfully",error : false,success : true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
}