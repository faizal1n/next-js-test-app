import { createDefaultRouter } from "@/lib/router.js";

const router = createDefaultRouter();

router
  .get(async (req, res) => {
    return res.status(200).json({
      'message': 'Halo...',
    });
  })

  export default router.getHandler();