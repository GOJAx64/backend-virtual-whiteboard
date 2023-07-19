import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import Image from '../models/Image.js';

const router = Router();

router.post('/upload', checkAuth, async(req, res) => {
    const { url } = req.body;
    try {
      const newImage = await new Image(req.body);
      await newImage.save();
      res.status(201).json({message: "new image uploaded", createdPost: newImage});
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: error.message,
      });
    }
});

router.get('/:id', checkAuth, async(req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const images = await Image.find().where("classroomId").equals(id);
  res.json(images);
});

export default router;