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

const urlById = async (req,res) => {
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

const deleteUrl = async (req,res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const result = await db.query(`
      SELECT *
      FROM urls
      WHERE id=$1
    `, [id]);

    if(result.rows[0].userId !== user){
      return res.sendStatus(401);
    }
  
    if(result.rowCount === 0){
      return res.sendStatus(404);
    }

    await db.query(`
      DELETE FROM urls
      WHERE id=$1 AND "userId"=$2
    `,[id,user]);

    res.sendStatus(204);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}

const openUrl = async (req,res) => {
  const { shortUrl } = req.params;

  try {
    const result = await db.query(`
      SELECT *
      FROM urls
      WHERE "shortUrl"=$1
    `, [shortUrl]);
  
    if(result.rowCount === 0){
      return res.sendStatus(404);
    }
  
    await db.query(`
      UPDATE urls
      SET "visitCount"=$1
      WHERE id=$2
    `,[result.rows[0].visitCount + 1,result.rows[0].id]);

    res.redirect(result.rows[0].url);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesUrlController = { createShorten,urlById,openUrl,deleteUrl };
export default modulesUrlController;