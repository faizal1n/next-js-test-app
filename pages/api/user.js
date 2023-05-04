import { createDefaultRouter } from "@/lib/router.js";
import DB from '@/models/index.js';

const router = createDefaultRouter();

router
  .get(async (req, res) => {

    const dateResult = await DB.sequelize.query(
      `SELECT CURDATE() as 'current_date'`,
      {
        type: DB.sequelize.QueryTypes.SELECT
      }
    );

    return res.status(200).json({
      'message': dateResult[0].current_date+" : Selamat datang",
    });
  })

  export default router.getHandler();