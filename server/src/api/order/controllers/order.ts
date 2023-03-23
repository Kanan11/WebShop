
// "use strict";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
/**
 * order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products, userName, email } = ctx.request.body;
        try {
            // retrieve item information
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);

                    return {
                        price_data: {
                            currency: "sek",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.quantity,
                    };
                }));

                const test = await strapi
                .service("api::order.order")
                .findOne(20, {populate: 'order_items'})
                // console.log("test----->", test)

                // DEBUGGER CONSOLE ------------------
                /* stripe.customers.list(
                    { limit: 3 },
                    function(err, customers) {
                        // Process the response
                        console.log("console error", err)
                        console.log("console customers", customers)
                    }
                    ); 
                */
                // DEBUGGER CONSOLE ------------------
                    
                    // create a stripe session
                    const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    customer_email: email,
                    mode: "payment",
                    success_url: "http://localhost:3000/checkout/success",
                    cancel_url: "http://localhost:3000/checkout/cancel",
                    line_items: lineItems,
                });
                
                // console.log("session ==>>> ", session)
        // create the item
        console.log("strapi-->>", session.payment_status)
        const createData = {
            // populate: 'order_items', 
            data: { 
                name: userName, 
                session_id: session.id,
                phone: '234324',
                email: email,
                status: session.status,
                payment_status: session.payment_status
                // order_items: products.map(function (product) {
                //   return {
                //     product: product.id,
                //     quantity: product.quantity
                //   }
                // })
              }
        }
        // console.log('createData', JSON.stringify(createData, null, 2))
        const order = await strapi
        .service("api::order.order")
        // .query("order")
        .create(createData, { includeRelations: true }); // Try to create Order with Order_Items at Strapi DB
        // return the session id
        // console.log("session-----", session.id)
        // console.log("order--->>", order)
        return { url: session.url, orderId: order.id };
      } catch (error) {
        console.log(error)
        ctx.response.status = 500;
        return { error: { message: "There was a problem creating the charge" } };
      }
    },
  }));



// export default factories.createCoreController('api::order.order');
