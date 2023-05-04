import { createDefaultRouter } from "@/lib/router.js";
import DB from '@/models/index.js';
import * as UserModel from '@/models/users.js';

const User = UserModel(DB.sequelize, DB.Sequelize.DataTypes);

const router = createDefaultRouter();

router
  .get(async (req, res) => {
    const user = await new User({id: 1});

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