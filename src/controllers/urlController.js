import db from "../db.js";
import { nanoid } from 'nanoid';

const createShorten = async (req,res) => {
  const { user } = res.locals;
  const { url } = req.body;
  const shortUrl = {shortUrl: nanoid(10)};

  try{
    await db.query(`
      INSERT INTO urls ("userId",url,"shortUrl")
      VALUES ($1,$2,$3)
    `, [user,url,shortUrl]);
  
    res.status(201).send(shortUrl);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesUrlController = { createShorten };
export default modulesUrlController;