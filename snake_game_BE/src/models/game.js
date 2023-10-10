import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  value: {
    type: {
      dirX: Number,
      dirY: Number,
      body: Array,
      position: Array,
      level: Number,
      isPaused: Boolean,
      score: Number,
    },
    required: true,
  },
});

const game = mongoose.model("game", gameSchema);

export default game;
