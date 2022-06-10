import db from "../db.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const user = req.body;

  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);

    const existingUser = await db.query(`
    SELECT * 
    FROM users 
    WHERE email=$1
    `,[user.email]);

    if(existingUser.rowCount !== 0){
      return res.sendStatus(409);
    }

    delete user.confirmPassword;

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

const getUser = async (req,res) => {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    //!== vai dar 401.
    if(id != user){
      return res.sendStatus(401);
    }

    const userResult = await db.query(`
      SELECT users.id,users.name,SUM(urls."visitCount") AS "visitCount"
      FROM users
      LEFT JOIN urls
      ON urls."userId" = users.id
      WHERE users.id = $1
      GROUP BY users.id
    `, [id]);

    if(userResult.rowCount === 0){
      return res.sendStatus(404);
    }

    const urlsResult = await db.query(`
      SELECT id,"shortUrl",url,"visitCount"
      FROM urls
      WHERE "userId" = $1
    `, [id]);

    const [userRows] = userResult.rows;
    const urls = urlsResult.rows;

    res.status(200).send({...userRows,shortenedUrls: urls})
  } catch (err){
    console.log(err);
    res.sendStatus(500);
  }
}

const rankingUsers = async (req,res) => {

  try {
    const result = await db.query(`
      SELECT users.id,users.name, COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
      FROM users
      LEFT JOIN urls
      ON urls."userId" = users.id
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10
    `);

    console.log(result);
    res.status(200).send(result.rows);
  } catch (err){
    console.log(err);
    res.sendStatus(500);
  }

}

const modulesSignUpController = { signUp,getUser,rankingUsers };
export default modulesSignUpController;