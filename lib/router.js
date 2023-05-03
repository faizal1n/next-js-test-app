import { createRouter } from "next-connect";
import process from 'process';

/** 
 * Generate default error handler object for next-connect router
 * */ 
function generateDefaultErrorFunction(router) {
  return {
    onError: async (err, req, res) => {
      
      // rollback database transaction if any
      if (router.t!=null) {
        await router.t.rollback();
      }

      // printout to console if APP_DEBUG 'true'
      if (process.env.APP_DEBUG === 'true') {
        console.log(err.stack)
      }
  
      if (err.code!=null && err.code <= 500 && err.code >=300) {
        let errorDetail = err.message;
        if (process.env.APP_DEBUG === 'true') {
          errorDetail = (err.detail || err.message);
        }
  
        return res.status(err.code).json({
          'message': err.message,
          'error': errorDetail
        });
      }
  
      // Return full error if APP_DEBUG 'true'
      if (process.env.APP_DEBUG === 'true') {
        return res.status(500).json({
          'message':'Internal server error',
          'error': err
        }); 
      }
  
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
    },
  }
}


/**
 * Create next-connect router with handler but without any middleware
 * Use .getHandler() in 'export default' line of 'pages/' files
 * @returns next-connect router object
 */
function createDefaultRouter() {
  const router = createRouter().clone();

  router.t = null;
  router.getHandler = function () {
    return router.handler( generateDefaultErrorFunction(router) );
  };

  return router;
}

export {
  createDefaultRouter
}