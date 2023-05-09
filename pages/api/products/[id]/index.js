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
 * Product Detail API
 */
router
  .get(async (req, res) => {
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

    return res.status(200).json({
      'message': "",
      'result': productResult,
    });
  });

/**
 * Update Product API
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

  const form = new formidable.IncomingForm({
    allowEmptyFiles: true,
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
        'price': Joi.number().integer().min(1),
        'product_image': Joi.any()
      });
      const { value, error } = schema.validate(fields);

      if (error!=null) {
        const errorValidation = new Error(error.details[0].message);
        errorValidation.code = 400;
        reject(errorValidation);
      }

      try {
        let imageUrl = productResult.image;
        if (files.product_image != null) {
          imageUrl = await saveFileToLocal(files.product_image);
        }
        const productInput = value;

        productResult.set({
          'name': productInput.name,
          'description': productInput.description,
          'image': imageUrl,
          'price': productInput.price,
        });

        await productResult.save();

        resolve({
          'message': 'Product updated',
          'result': productResult
        });
      } catch (errSave) {
        errSave.code = 500;
        reject(errSave);
      }
    });
  });

  return res.status(200).json(formPromise);

});

/**
 * Product Delete API
 */
router
.delete(async (req, res) => {
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
    'deleted_at': new Date()
  });

  await productResult.save();

  return res.status(200).json({
    'message': "Product is successfully deleted",
    'result': {},
  });
});

export const config = {
  api: {
    bodyParser: false
  },
};

export default router.getHandler();
