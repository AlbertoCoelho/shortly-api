import loginSchema from "../schemas/loginSchema.js";

const loginMiddleware = async (req,res,next) => {
  const  user = req.body;

  const validation = loginSchema.validate(user, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.status(422).send("There was a login error, please fill in the information correctly!");
    return;
  }
  next();
}

export default loginMiddleware;