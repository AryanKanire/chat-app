const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

module.exports.protectroute = async(req,res,next)=>{
    try {
        
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"unauthorized user"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({error:"unauthorised"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400).json({error:"user not found"});
        }

        req.user=user;
        next(); 

    } catch (error) {
        console.log("Error in protect route",error.message);
        res.status(500).json({error:"internal error"})
    }
}