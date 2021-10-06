const express = require('express');
const mongoose=require('mongoose');
const AuthRouter=require('./authRouter')
const app = express();
const PORT = process.env.PORT || 5000;
const urldb='mongodb+srv://VladAdmin:jqlby@cluster0.avcz2.mongodb.net/Auth_roles?retryWrites=true&w=majority'

app.use(express.json());
app.use('/auth',AuthRouter);
const startServer = async() => {
  try {
   await mongoose.connect(urldb)
    app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();