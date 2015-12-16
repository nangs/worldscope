/**
 * @module RequestInjector
 * Contain methods that inject REST API requests to the main pipeline
 * from socket adapter components
 */

var Promise = require('bluebird');
var rfr = require('rfr');

var Utility = rfr('app/util/Utility');

var logger = Utility.createLogger(__filename);

function RequestInjector(server) {
  this.server = server;
}

RequestInjector.prototype.API_PATHS = {
  CREATE_COMMENT: '/api/comments'
};

/**
 * Create a new comment in the main pipeline
 * @return {Promise}
 */
RequestInjector.prototype.createComment = function (credentials, comment) {
  return new Promise((function (resolve, reject) {
    var options = {
      'method': 'POST',
      'url': this.API_PATHS.CREATE_COMMENT,
      'credentials': credentials,
      'payload': {'comment': comment},
      'allowInternals': true
    };

    logger.debug('Making %s request to %s', options.method, options.url);
    this.server.inject(options, function (res) {
      resolve(res);
    });
  }).bind(this));
};

module.exports = RequestInjector;
