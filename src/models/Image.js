import { Schema, model } from "mongoose";

const imageSchema = Schema({
  url: {
    type: Schema.Types.String,
    required: true
  },
  classroomId: {
    type: Schema.Types.String,
    required: true
  },
  text: {
    type: Schema.Types.String
  }
}, { timestamps: true });

const Image = model("Image", imageSchema);

export default Image;