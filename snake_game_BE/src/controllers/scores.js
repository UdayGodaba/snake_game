import Scores from "../models/scores.js";
import User from "../models/user.js";
import { getClaims, getToken } from "../utils/crypt.js";

// To get top 10 scores
export const getTopScores = async (_, res) => {
  try {
    console.log("in getTopScores controller");

    const scores = await Scores.find().sort({ score: -1 }).exec();

    res.status(200).send(scores);
  } catch (err) {
    console.log("Error occured in getTopScores: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};

// To update score of leader board
export const updateScore = async (req, res) => {
  try {
    console.log("in updateScore controller");

    const token = getToken(req);
    const claims = getClaims(token);
    const userId = claims["id"];

    if (!userId) {
      return res.status(401).send({ errorMessage: "Bad Request" });
    }

    const { score } = req.body;

    const { userName: name } = await User.findOne({ _id: userId })
      .select("userName")
      .exec();
    const scores = await Scores.find().sort({ score: -1 }).exec();

    updateScoresList(userId, score, name, scores);

    await Scores.collection.drop();
    await Scores.insertMany(scores);

    res.status(201).send({ Message: "score updated" });
  } catch (err) {
    console.log("Error occured in updateScore: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};

// additional actions required in updatescore
const updateScoresList = (userId, score, name, scores) => {
  for (let i = 0; i < scores.length; i++) {
    if (scores[i]["userId"] == userId) {
      if (score > scores[i]["score"]) {
        scores[i]["score"] = score;
      }
      return;
    }
  }

  if (scores.length < 5) {
    scores.push({ userId, score, name });
    return;
  }

  let isGreater = false;

  for (let i = 0; i < scores.length; i++) {
    if (score > scores[i]["score"]) {
      isGreater = true;
      break;
    }
  }

  if (isGreater) {
    scores.pop();
    scores.push({ userId, score, name });
  }
};
