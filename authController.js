const User=require('./models/user')
const Role=require('./models/role')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validationResult}=require ('express-validator')
const {sekret}=require('./config')

const GenerateToken=(id,username)=>{
    const payload={
      id,
      username
    }
    return jwt.sign(payload,sekret, {expiresIn:'2h'})
}

class AuthController{
  async registration(req,res){
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({message:"Ошибка при регистрации", errors})
      }
    const {username,password}=req.body;
    const candidate=await User.findOne({username});
    if(candidate){
      return res.status(400).json({message:"User exist!"});
    }
    
    const hashPassword=bcrypt.hashSync(password,7);
    const userRole=await Role.findOne({value:'USER'});
    const user=new User({username,password:hashPassword,roles:[userRole.value]});
    user.save();
    return res.json({message:"User created"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:"Registration error!"});
    }
  }
  async login(req,res){
    try {
      const {username,password}=req.body;
      console.log({username})
      const user=await User.findOne({username});
      if(!user) {
        res.status(400).json({message:"User not found"})
      }
      const validPassword=bcrypt.compareSync(password,user.password);
      if(!validPassword){
        res.status(400).json({message:"Incorrect password entered"})
      }
      const token=GenerateToken(user._id,user.username);
      return res.json({token});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:"error OUT!"});
    }
  }
  async getUsers(req,res){
    try {
     
  
      res.json('username')
    } catch (error) {
      
    }
  }
}
module.exports=new AuthController()