// ./api/my-custom-users/controllers/User.js

'use strict';
// ----OBS one of them 3 imports should be work.-----
// const usersPermissionsController = require('strapi-plugin-users-permissions.controllers.user');
// const usersPermissionsController = require('../../../plugins/users-permissions/controllers/User');

// const { controllers } = require('@strapi/plugin-users-permissions');
// const usersPermissionsController = controllers.user;

// const usersPermissionsController = require('@strapi/plugin-users-permissions.controllers.user');

module.exports = {
  async create(ctx) {
      console.log('client_1')
    try {
      const { email, username, password } = ctx.request.body;

      // Call the create function from the User.js controller
      const user = await usersPermissionsController.create(ctx);
        console.log('client_2')
        // Customize the response as needed
        ctx.send({
            id: user.id,
            email: user.email,
            username: user.username,
            message: 'User created successfully',
        });
        console.log('client_3')
    } catch (error) {
      ctx.throw(400, error);
    }
  },
};
