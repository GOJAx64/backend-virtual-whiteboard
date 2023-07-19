import Image from '../models/Image.js';

export const uploadImage = async(req, res) => {
    try {
      console.log('llega')
      const newImage = await new Image(req.body);
      await newImage.save();
      res.status(201).json({message: "Captura guardada", createdPost: newImage});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}