import { createRouter } from "next-connect";

const router = createRouter();

router
  .get(async (req, res) => {
    return res.status(200).json({
      'message': 'Halo...',
    });
  })

export default router.handler({
  onError: async (err, req, res) => {
    return res.status(500).json({
      'message':'Internal server error',
      'error': null
    });
  },
  onNoMatch: (req, res) => {
    return res.status(404).json({
      'message': 'Not found',
      'result' : null
    });
  }
})