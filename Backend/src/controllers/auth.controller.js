import User from './../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from '../lib/stream.js';
import containsProfanity from '../lib/profanityCheck.js';
import { isValidUsername, containsMyName } from '../lib/validateName.js';


export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    // not empty
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check for valid full name format (only letters and a single space between first and last name)
    if(isValidUsername(fullName) === false){
      return res.status(400).json({
        message: "Full name must contain only letters and no spaces or special characters"
      });
    }

    if(containsMyName(fullName)){
      return res.status(400).json({
        message: "You can't use this name"
      });
    }

    if(fullName.trim().length > 9){
      return res.status(400).json({
        message: "Full name cannot be more than 9 characters long"
      });
    }

    // check for valid full name
    if (containsProfanity(fullName)) {
      return res.status(400).json({
        message: "You can't choose this name"
      });
    }

    // check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if(containsMyName(email)){
      return res.status(400).json({
        message: "You can't use this email"
      });
    }

    // check for existing user
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"email already registered, please use diffrent one"});
    }

    // create a random avatar
    const index = Math.floor(Math.random() * 100) + 1 ;
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}`;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = await User.create({
        fullName,
        email,
        password : hashedPassword,
        profilePic : randomAvatar,
    })

    try {
        await upsertStreamUser({
            id:newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || ""
        });
        console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
        console.log("error creating stream user", error);
    }
    
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
  
    res.status(201).json({success:true, user:newUser , token})
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({message:"internal server errro"});
  }
}

export async function login(req, res) {
  try {
    const {email, password} = req.body;
    if(!email || ! password) return res.status(400).json({message: "All fields are required"});
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }
    
    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token =jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt",token , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
    
    res.status(200).json({status:true, message:"login Successfull" , user , token});
    
} catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({status:false, message:"Internal server error"});
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success:true, message:"logout successfull"});
}

export async function onboard(req, res){
  try {
    const userId = req.user._id;
  const {fullName , bio , nativeLanguage, learningLanguage, location} = req.body;
  
  if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
    return res.status(400).json({ 
      message: "All fields are required" ,
      missingFields :[
        !fullName && "fullName",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage", 
        !learningLanguage  && "learningLanguage",
        !location && "location"
      ].filter(Boolean)
    });
  }
  // check for valid full name format (only letters and a single space between first and last name)
  if(isValidUsername(fullName) === false){
    return res.status(400).json({
      message: "Full name must contain only letters and no spaces or special characters"
    });
  }

  if(containsMyName(fullName)){
    return res.status(400).json({
      message: "You can't use this name"
    });
  }

  if(fullName.trim().length > 9){
    return res.status(400).json({
      message: "Full name cannot be more than 9 characters long"
    });
  }

  // check for valid full name
  if (containsProfanity(fullName)) {
    return res.status(400).json({
      message: "You can't choose this name"
    });
  }

  // check for valid bio
  if(bio.length > 50){
    return res.status(400).json({message:"Bio cannot be more than 50 characters long"});
  }

  if(containsProfanity(bio)){
    return res.status(400).json({message:"You can't use this bio"});
  }
  if(containsMyName(bio)){
    return res.status(400).json({message:"You can't use this bio"});
  }

  if(containsProfanity(location)){
    return res.status(400).json({message:"You can't use this location"});
  }
  if(containsMyName(location)){
    return res.status(400).json({message:"You can't use this location"});
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    ...req.body,
    isOnBoarded:true,
  }, {new:true}).select("-password");

  if(!updatedUser) return res.status(404).json({message:"User not found"});

  try {
      await upsertStreamUser({
          id: updatedUser._id.toString(),
          name: updatedUser.fullName,
          image: updatedUser.profilePic || ""
      });
      console.log(`Stream user created for ${updatedUser.fullName}`);
  } catch (error) {
      console.log("error creating stream user", error.message);
  }

  res.status(200).json({ success: true, oldValue: req.user , newValue: updatedUser});
} catch (error) {
    res.status(500).json({ success: false,message: "Internal server error"});
  }
}
