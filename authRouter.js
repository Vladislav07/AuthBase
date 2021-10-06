const Router=require('express');
const AuthController=require('./authController');
const {check}=require ('express-validator');

const router=new Router();

router.post('/registration',[
  check("username","Логин не может быть пустым").notEmpty(),
  check("password","Пароль должен быть от 4 до 10 символов").isLength({min:4,max:10})
],
AuthController.registration)
router.post('/login',AuthController.login)
router.get('/users',AuthController.getUsers)

module.exports=router;