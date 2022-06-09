import joi from 'joi';

const userSchema = joi.object({
  name: joi.string()
  .min(3)
  .max(20)
  .required(),

  email: joi.string()
  .email()
  .required(),

  password: joi.string()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .required(),

  confirmPassword: joi.string()
  .valid(joi.ref('password'))
  .required()
});

export default userSchema;