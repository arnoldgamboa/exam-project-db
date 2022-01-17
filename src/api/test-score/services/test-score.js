'use strict';

/**
 * test-score service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-score.test-score');
