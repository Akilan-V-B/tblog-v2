import { UserModel } from '../models/Users.js';
import express  from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async(req,res) => {
    const {username, email, password, city} = req.body;
    const user = await UserModel.findOne({email});

    if(user) {
        return res.json({message:"User Already Exists!"});
    }

    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({username, email, password: hashPassword, city})
    await newUser.save();
    res.json({message : "User Registered Successfully"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email:email });
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id ,userName : user.username, message:"Correct Password"});
  });

  router.post("/details", async (req, res) => {
    // console.log(req.body)
    const _id = req.body._id;
    const user = await UserModel.findOne({ _id });
    res.json(user);
  });

export {router as userRouter};