const User = require("../models/usermodel");

module.exports.getuserforsidebar = async(req,res)=>{
    try {
        const loggedInuserId= req.user._id;

        const alluser = await User.find({_id: {$ne:loggedInuserId}}).select("-password");

        res.status(200).json(alluser);

    } catch (error) {
        console.log("error in getuserroute",error.message);
        res.status(500).json({error:"Internal server error"});
    }
    
}