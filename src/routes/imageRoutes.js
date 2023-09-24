import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import Image from '../models/Image.js';

const router = Router();

router.post('/upload', checkAuth, async(req, res) => {
    try {
      const newImage = await new Image(req.body);
      await newImage.save();
      res.status(201).json({message: "new image uploaded", imageId: newImage.id });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: error.message,
      });
    }
});

router.get('/:id', checkAuth, async(req, res) => {
  const { id } = req.params;
  const images = await Image.find().where("classroomId").equals(id);
  res.json(images);
});

router.delete('/:id', checkAuth, async(req, res) => {
  const { id } = req.params;
  const image = Image.findById(id);
  try {
    await image.deleteOne();
    res.json({ msg: "Imagen Eliminada"});
  } catch (error) {
    return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
  }
});
export default router;