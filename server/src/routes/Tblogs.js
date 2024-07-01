import express from 'express'
import {TblogModel} from "../models/Tblogs.js"

const router = express.Router();

router.get('/', async(req,res) => {
    try{
        const response = await TblogModel.find({});
        res.json(response);
    } catch(err){
        res.json(err);
    }
})
router.post('/', async(req,res) => {
    const tblog = new TblogModel(req.body);
    try{
        const response = await tblog.save();
        res.json(response);
    } catch(err){
        res.json(err);
    }
})
router.post('/yourblogs', async (req, res) => {
    const userOwner = req.body.userOwner;
    try {
      const response = await TblogModel.find({ userOwner: userOwner });
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

  router.post('/deleteblog', async (req, res) => {
    const blogId = req.body.blogId;
    try {
        const deletedBlog = await TblogModel.findByIdAndDelete(blogId);
        if (deletedBlog) {
            res.json({ success: true, message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export {router as tblogRouter};

