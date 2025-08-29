import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        minLength: 6,
        trim:true,
        required:true
    },
    bio:{
        type:String,
        default: "",
    },
    profilePic:{
        type:String,
        default:""
    },
    nativeLanguage:{
        type:String,
        default:""
    },
    learningLanguage:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:"",
    },
    isOnBoarded:{
        type:Boolean,
        default:false,
    },
    friends : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

} , { timestamps: true });

const User = mongoose.model("User", userSchema);


export default User;