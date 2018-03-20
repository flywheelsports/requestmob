'use strict';

const Actor = require('./actor');
const ServerRequest = require('../lib/server-request');

/**
* @name HydraHealth
* @summary Call Hydra Health endpoint
* @return {undefined}
*/
module.exports = class HydraHealth extends Actor {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {
    super();
  }

  /**
  * @name getDescription
  * @summary return module description
  * @return {string} description - module description
  */
  getDescription() {
    return 'Call Hydra Health endpoint';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {string} actorName - name of actor
  * @return {undefined}
  */
  async execute(actorName) {
    let serverRequest = new ServerRequest();
    let requestID = this.getRequestID();
    let result;
    try {
      this.logStat(actorName, 'request', requestID);
      result = await serverRequest.send({
        host: 'localhost',
        port: 5353,
        method: 'get',
        path: '/v1/router/health'
      });
      this.logStat(actorName, 'process', requestID);
    } catch (e) {
      this.logStat(actorName, 'error', requestID);
    }
  }
}