import Joi from 'joi';
import bcrypt from 'bcrypt';
import { createDefaultRouter } from "@/lib/router.js";
import { generateAccessToken } from "@/lib/jwt.js";
import DB from '@/models/index.js';
import * as UserModel from '@/models/user.js';

const User = UserModel(DB.sequelize, DB.Sequelize.DataTypes);

const router = createDefaultRouter();

router
  .post(async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    const { value, error } = schema.validate(req.body);

    if (error!=null) {
      return res.status(400).json({
        'message': 'Bad request',
        'error' : error.details[0].message
      });
    }

    const userInput = value;
    let email = userInput.email;

    const user = await User.findOne({
      where: {
        'email': email,
        'is_active': true
      }
    });

    if (user===null) {
      return res.status(401).json({
        'message': 'User not found or inactive.',
        'error' : 'User not found or inactive.'
      });
    }

    const isMatch = await bcrypt.compare(userInput.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        'message': 'Invalid email and/or password.',
        'error' : 'Invalid email and/or password.'
      });
    }

    const authToken = generateAccessToken(user.email, user.first_name+' '+user.last_name, user.id);

    return res.status(200).json({
      'result': {
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token: authToken
      },
      'message': "",
    });
  })

export default router.getHandler();
