import db from "../db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);
    delete user.confirmPassword;

    const user = await db.query("SELECT * FROM users WHERE email=$1", [user.password]);
    if(user !== 0){
      res.sendStatus(409);
      return;
    }

    await db.query(`
    INSERT INTO users (name,email,password)
    VALUES ($1,$2,$3)
    `,[user.name,user.email,passwordHash]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}