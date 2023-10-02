import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

// token verification
export const verifyToken = async (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(403).send({ errorMessage: "Access Denied" });
    }

    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
    } catch (err) {
      return res.status(401).send({ errorMessage: "UnAuthorised" });
    }

    next();
  } catch (err) {
    console.log("Error in verifyToken: ", err.message);
    return res.status(500).send({ errorMessage: "Error occured" });
  }
};

// get token
export const getToken = (req) => {
  let token = req.header("Authorization");

  if (!token) return "";

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  return token;
};

// get claims from token
export const getClaims = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// generating token
export const generateToken = async (data) => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

// generating password hash
export const generateHash = async (data) => {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(data, salt);
  return hashed;
};

// verifying the password
export const verifyHash = async (pass1, pass2) => {
  const match = await bcrypt.compare(pass1, pass2);
  return match;
};
