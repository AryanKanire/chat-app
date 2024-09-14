const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const { genratetokenandcookie } = require("../utiles/genratetoken");

module.exports.signup = async(req,res)=>{
    try {
        const {fullName, username, password, confirmpassword, gender} = req.body;

        if(password !== confirmpassword){
            return res.status(400).json({message:"Passord not matches"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Passord to small"});
        }

        const user = await User.findOne({username});
        
        if(user){
            return res.status(400).json({message:"username is alredy taken"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);



        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullName,
            username,
            password:hashpassword,
            gender,
            profilepic: gender=== "male" ? boyprofilepic : girlprofilepic ,

        })

       if(newuser){

            genratetokenandcookie(newuser._id,res);
            await newuser.save();


            res.status(201).json({
                _id:newuser._id,
                fullName:newuser.fullName,
                username:newuser.username,
                profilepic:newuser.profilepic
            });
       }else{
        res.status(400).json({error:"Invalid data"});
       }

    } catch (error) {
        console.log("errro in singup page",error.message);
        res.status(500).json({error:"Internal server error"});   
    }
}

module.exports.login = async(req,res)=>{
    try {
        const {username, password} = req.body;

        const user=await User.findOne({username});
        const ispasswordcorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !ispasswordcorrect){
            res.status(400).json({error:"Invaild password or username"});
        }

        genratetokenandcookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilepic:user.profilepic
        })

    } catch (error) {
        console.log("errro in login page",error.message);
        res.status(500).json({error:"Internal server error"});   
    }
}

module.exports.logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out succefuly"});
        
    } catch (error) {
        console.log("errro in logout page",error.message);
        res.status(500).json({error:"Internal server error"});   
    }
}