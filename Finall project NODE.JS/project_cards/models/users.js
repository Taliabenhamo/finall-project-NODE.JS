const mongoose=require('mongoose');
const JOI=require('joi')
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs')

const UserSchema=new mongoose.Schema({


    username:{
        type:String,
        required:true,
        minlenght:2,
        maxlenght:30
        
    },
    email:{
        type:String,
        required:true,
        minlenght:5,
     
    },
    password:{

        type:String,
        required:true,
        minlenght:5,
        maxlenght:100,
        select:false
    },
    biz:{
        type:Boolean,
        default:false
    },
    createdAt: { type: Date, default: Date.now }

});


 UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); 
  this.password = await bcrypt.hash(this.password, 12); 

  next();
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");


function validateUser(user){
    const schema=JOI.object({
        username:JOI.string().required().min(2).max(30),
        email:JOI.string().required().min(5),
        password:JOI.string().required().min(5).max(100),
        biz:JOI.boolean()
    })
    return schema.validate(user);
}

module.exports=UserModel;

exports.validate=validateUser;