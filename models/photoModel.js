import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  photographer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Photo = mongoose.model("Photos", photoSchema);

export default Photo;
