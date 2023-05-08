import formidable from 'formidable';
import Joi from 'joi';
import { saveFileToLocal } from "@/lib/uploadFile.js";
import { createAuthRouter } from "@/lib/router.js";
import DB from '@/models/index.js';
import * as ProductModel from '@/models/product.js';

const Product = ProductModel(DB.sequelize, DB.Sequelize.DataTypes);

const router = createAuthRouter();

router
  .get(async (req, res) => {

    const dateResult = await DB.sequelize.query(
      `SELECT CURDATE() as 'current_date'`,
      {
        type: DB.sequelize.QueryTypes.SELECT
      }
    );

    return res.status(200).json({
      'message': "Product list",
    });
  });

router.post(async (req, res) => {
  const form = new formidable.IncomingForm();

  const formPromise = await new Promise((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      });
      const { value, error } = schema.validate(fields);

      if (error!=null) {
        const errorValidation = new Error(error.details[0].message);
        errorValidation.code = 400;
        reject(errorValidation)
      }

      await saveFileToLocal(files.file);
      resolve({
        'message': 'Product created'
      });
    });
  });

  return res.status(201).json(formPromise);

});

export const config = {
  api: {
    bodyParser: false
  },
};

export default router.getHandler();
