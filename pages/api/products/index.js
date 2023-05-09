import formidable from 'formidable';
import Joi from 'joi';
import { saveFileToLocal } from "@/lib/uploadFile.js";
import { createAuthRouter } from "@/lib/router.js";
import DB from '@/models/index.js';
import * as ProductModel from '@/models/product.js';

const Product = ProductModel(DB.sequelize, DB.Sequelize.DataTypes);
const Op = DB.Sequelize.Op;

const router = createAuthRouter();

/**
 * Product List API
 */
router
  .get(async (req, res) => {
    const schema = Joi.object({
      'start': Joi.number().min(0).integer().required(),
      'length': Joi.number().min(1).integer().required(),
      'keyword': Joi.string().optional().allow(null).allow('').default(''),
      'is_active': Joi.boolean().optional().allow(null),
    });
    const { value, error } = schema.validate(req.query);

    if (error!=null) {
      return res.status(400).json({
        'message': 'Bad request',
        'error' : error.details[0].message
      });
    }

    const reqQuery = value;

    const productResult = await Product.findAll({
      attributes: ['id', 'name', 'image'],
      where: {
        'deleted_at': {
          [Op.is] : null
        },
        [Op.or]: [
          { name: { [Op.like]: `%${reqQuery.keyword}%`} },
          { description: { [Op.like]: `%${reqQuery.keyword}%`} }
        ],
        'is_active': true
      },
      limit: reqQuery.length,
      offset: reqQuery.start
    });

    return res.status(200).json({
      'message': "",
      'result': {
        'data': productResult,
        'start': reqQuery.start,
        'length': reqQuery.length,
        'totalCurrentData': productResult.length
      }
    });
  });

/**
 * Create Product API
 */
router.post(async (req, res) => {
  const form = new formidable.IncomingForm({
    allowEmptyFiles: false,
  });

  const formPromise = await new Promise((resolve, reject) => {
    form.on('fileBegin', (formName, file) => {
      const mimetype = file.mimetype;
      if (!(mimetype && mimetype.includes("image"))) {
        const errorValidation = new Error('File type is not supported');
        errorValidation.code = 400;
        reject(errorValidation);
      }
    });

    form.parse(req, async function (errFile, fields, files) {
      if (errFile!=null) {
        errFile.code = 400;
        reject(errFile);
      }

      const schema = Joi.object({
        'name': Joi.string().required(),
        'description': Joi.string().required(),
        'price': Joi.number().integer().min(1)
      });
      const { value, error } = schema.validate(fields);

      if (error!=null) {
        const errorValidation = new Error(error.details[0].message);
        errorValidation.code = 400;
        reject(errorValidation);
      }

      try {
        const imageUrl = await saveFileToLocal(files.product_image);
        const productInput = value;

        await Product.create({
          'name': productInput.name,
          'description': productInput.description,
          'image': imageUrl,
          'price': productInput.price,
          'created_by': req.user.id,
          'is_active': true
        });

        resolve({
          'message': 'Product created'
        });
      } catch (errSave) {
        errSave.code = 500;
        reject(errSave);
      }
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
