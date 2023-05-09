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
 * Update Product Active Status API
 */
router.put(async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().min(1).required()
  });
  const { value, error } = schema.validate(req.query);

  if (error!=null) {
    return res.status(400).json({
      'message': 'Bad request',
      'error' : error.details[0].message
    });
  }

  const idProduct = value.id;

  const bodySchema = Joi.object({
    'is_active': Joi.boolean().required()
  });
  const bodyValidationResult = bodySchema.validate(req.body);

  if (bodyValidationResult.error!=null) {
    const errorValidation = new Error(bodyValidationResult.error.details[0].message);
    errorValidation.code = 400;
    throw errorValidation;
  }

  const productResult = await Product.findOne({
    where: {
      'deleted_at': { [Op.is] : null },
      'id': idProduct,
    }
  });

  if (productResult==null) {
    const notFound = new Error('Product is not found');
    notFound.code = 404;
    throw notFound;
  }

  productResult.set({
    'is_active': bodyValidationResult.value.is_active
  });

  await productResult.save();

  return res.status(200).json({
    'message': "Product is successfully deleted",
    'result': productResult,
  });

});

export default router.getHandler();
