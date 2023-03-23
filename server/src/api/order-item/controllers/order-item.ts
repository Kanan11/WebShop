"use strict";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

/**
 * item controller
*/

import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::order-item.order-item');
