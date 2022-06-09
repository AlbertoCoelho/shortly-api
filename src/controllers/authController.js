import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if(user.rows.length === 0) return res.sendStatus(401);

    if (bcrypt.compareSync(password, user.rows[0].password)) {
      const token = uuid();
      await db.query('INSERT INTO sessions ("userId", token) VALUES ($1,$2)', [user.id,token])

      res.send(token);
      return;
    }

    res.sendStatus(401); // Unauthorized
  } catch (err) {
    console.log("Error logging in user.", err);
    res.status(500).send("Error logging in user.");
  }
};

export default signin;