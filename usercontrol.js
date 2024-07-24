import { user} from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
        const {fullName, username,password,confirmPassword ,gender}= req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"all fields are required"});
        }
        if(password !== confirmPassword ){
            return res.status(400).json({message:"password in not matched"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"already exit , try different "});  
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const femaleProfilePhoto = `https://img.icons8.com/?size=100&id=FYkMRk1VgOVC&format=png&color=000000?username=&{username}`;
        const maleProfilePhoto = `https://img.icons8.com/?size=100&id=23240&format=png&color=000000?username=&{username}`;

        await User.create({
            fullName,
            username,
            password:hashedPassword,
            profilePhoto:gender===" male"? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        })
    } catch (error){
        console.log(error);
    }
};

export const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if( !username || !password ){
            return res.status(400).json({message:"all fields are required"});
        };
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };
        const tokendata = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:'Id'});

        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000 , httpOnly:true ,sameSite:'strict'}).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });

    } catch(error){
        console.log(error);
    }
}

export const logout = (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}

export const getotheruser = async (req,res)=>{
    try{
        const loggedinuserid = req.id;
        const otheruser = await User.find({_id:{$ne:loggedinuserid}}).select("-password");
        return res.status(200).json(otheruser);
    } catch(error){
        console.log(error);
    }
}