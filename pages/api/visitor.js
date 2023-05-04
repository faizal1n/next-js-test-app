import { createDefaultRouter } from "@/lib/router.js";

// mongoDB client connection promise
import { getConnection } from "@/lib/mongodb_connection.js";

const router = createDefaultRouter();

router
  .get(async (req, res) => {
    const dbConnection = await getConnection();

    const currentTime = new Date();

    // insert visitor IP address and visit time to database
    await dbConnection.collection('visitors').insertOne({
      'ip_address': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      'visit_time': currentTime
    });

    // get total today visitor count
    const dateString = currentTime.getUTCFullYear()
      +'-'+ ('0' + (currentTime.getMonth()+1) ).slice(-2) 
      +'-'+ ('0' + (currentTime.getDay()) ).slice(-2) 

    const totalVisitor = await dbConnection.collection('visitors').countDocuments(
      {
        "visit_time": {
          $gte: new Date(`${dateString}T00:00:00.000Z`),
          $lte: new Date(`${dateString}T23:59:59.000Z`)
        }
      }
    );

    return res.status(200).json({
      'message': `Halo pengunjung ke-${totalVisitor} hari ini`,
    });
  })

  export default router.getHandler();