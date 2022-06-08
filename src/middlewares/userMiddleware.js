import userSchema from "../schemas/userSchema.js";

const userMiddleware = async (req,res,next) => {
  const  user = req.body;

  const validation = userSchema.validate(user, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.status(422).send("There was a registration error, please fill in the information correctly!");
    return;
  }
  next();
}

export default userMiddleware;