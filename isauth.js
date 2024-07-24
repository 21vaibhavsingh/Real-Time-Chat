import jwt  from "jsonwebtoken";
const isauth = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"User not authenticated"})
        };
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
      console.log(decode);
        if(!decode){
        return res.status(401).json({message:"Invalid token"});
       };
       req.id = decode.id;
        next();
    }catch(error){
        console.log(error);
    }
};
export default isauth;