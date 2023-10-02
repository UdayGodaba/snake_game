import { getClaims, getToken } from "../utils/crypt.js";
import Game from "../models/game.js";

// to get user's game
export const getGame = async (req, res) => {
  try {
    console.log("in getGame controller");

    const token = getToken(req);
    const claims = getClaims(token);
    const userId = claims["id"];

    if (!userId) {
      return res.status(401).send({ errorMessage: "Bad Request" });
    }

    const userGame = await Game.findOne({ userId }).exec();

    if (!userGame) {
      return res.status(200).send({});
    }

    res.status(200).send(userGame);
  } catch (err) {
    console.log("Error occured in getGame: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};

// create or update game
export const updateGame = async (req, res) => {
  try {
    console.log("in updateGame controller");

    const token = getToken(req);
    const claims = getClaims(token);
    const userId = claims["id"];

    if (!userId) {
      return res.status(401).send({ errorMessage: "Bad Request" });
    }

    const filter = { userId };
    const update = { value: { ...req.body } };
    const options = { upsert: true, new: true };

    await Game.findOneAndUpdate(filter, update, options).exec();

    res.status(201).send({ message: "Game updated" });
  } catch (err) {
    console.log("Error occured in updateGame: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};
