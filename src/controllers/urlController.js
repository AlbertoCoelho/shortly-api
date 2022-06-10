import db from "../db.js";
import { nanoid } from 'nanoid';

const createShorten = async (req,res) => {
  const { user } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(10);

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

const userUrl = async (req,res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT id,"shortUrl",url
      FROM urls
      WHERE id=$1 
    `,[id]);
  
    if(result.rowCount === 0) {
      res.sendStatus(404);
    }
  
    res.status(200).send(result.rows[0]);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesUrlController = { createShorten,userUrl };
export default modulesUrlController;