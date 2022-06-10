import db from "../db.js"

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send("No token."); // unauthorized

  try {
    const session = await db.query(`
    SELECT * 
    FROM sessions 
    WHERE token=$1
    `,[token]);
    if (session.rows.length === 0) return res.status(401).send("No session."); // unauthorized

    const user = await db.query(`
    SELECT *
    FROM users 
    WHERE id=$1
    `,[session.rows[0].userId]);
    if (!user.rows[0]) return res.status(404).send("User not found"); // not found

    res.locals.user = user.rows[0].id;
    next();
  } catch (error) {
    console.log("token", error);
    res.status(500).send("Error checking token.");
  }
};

export default validateToken;