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
  })

  export default router.getHandler();
