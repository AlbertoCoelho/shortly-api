import urlSchema from "../schemas/urlSchema.js";

const urlMiddleware = async (req,res,next) => {
  const url = req.body;

  const validation = urlSchema.validate(url, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.status(422).send("There was a registration error, please fill in the information correctly!");
    return;
  }
  next();
}

export default urlMiddleware;