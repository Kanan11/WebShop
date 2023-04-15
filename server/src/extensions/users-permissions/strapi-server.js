const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("plugin::users-permissions.users-permissions", ({ strapi }) => ({
    async create(ctx) {
        const { updateNewCustomer } = ctx.request.body;
        console.log('update-->', updateNewCustomer);
    }
}));


module.exports = (plugin) => {
    plugin.controllers.user.find = async (ctx) => {
        const { test } = ctx.request.body
  console.log('test', test);

  const entry = await strapi.entityService.findOne('api::user.user', 1, {
    populate: { someRelation: true },
  });
  
  const entity = await strapi.entityService.update(
    "plugin::users-permissions.user",
    ctx.state.user.id,
    { data }
);
  };
  
    return plugin;
  };

