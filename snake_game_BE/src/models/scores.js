import mongoose from "mongoose";

const scoresSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  name: { type: String, required: true },
});

const scores = mongoose.model("scores", scoresSchema);

export default scores;
