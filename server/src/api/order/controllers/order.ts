
// "use strict";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
/**
 * order controller
 */
const { createCoreController, createNewCustomer } = require("@strapi/strapi").factories;
/* 
module.exports = createNewCustomer("api::user.user", ({ strapi }) => ({
    async create(ctx) {
        const { products, userName, email, shipping_options } = ctx.request.body;
        try {
            const customer = await stripe.customers.create({
                description: 'My Test Customer',
                    address: {
                      city: "Göteborg",
                      country: "Sweden",
                      line1: "Blåksdfsdfs 22",
                      line2: "test",
                      postal_code: "417 10",
                      state: ""
                    },
                    phone: "28374628",
                    name: "John Silver",
                    shipping: {
                        name: "John Doe2",
                        phone: "2837487658568628",
                        address: {
                          line1: "123 Main St.",
                          city: "Anytown",
                          state: "",
                          postal_code: "12345",
                          country: "SE",
                        },
                      },
              });
              console.log('customer---->',customer)

              return {user: customer};
        } catch (error) {
            console.log(error)
            ctx.response.status = 500;
            return { error: { message: "There was a problem with create new user" } };
        }

    }
}));
 */
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products, userName, email, shipping_options } = ctx.request.body;
        // console.log('shipping_options--->>', ctx.request.body.shippingAddress)
        try {
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
                                images: ['https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600'], // TODO each product must have own photo with link from BE server link
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.quantity,
                    };
                }));

                const test = await strapi
                .service("api::order.order")
                .findOne(20, {populate: 'order_items'})
                // console.log("test----->", test);

                
                    
                // create a stripe session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card", "klarna"],
                    // customer_email: email,
                    mode: "payment",
                    // success_url: `http://localhost:3000/checkout/success?session_id=${session.id}`,
                    success_url: "http://localhost:3000/checkout/success",
                    cancel_url: "http://localhost:3000/checkout/cancel",
                    line_items: lineItems,
                    metadata: {description: 'some text was reserved!'},
                    // consent_collection: {
                    //     terms_of_service: 'required',
                    //   },  TODO visit this page before https://dashboard.stripe.com/settings/public
                    shipping_address_collection: {
                        allowed_countries: ['SE'],
                    },
                    billing_address_collection: 'auto',
                    customer: 'cus_NbNg6m6yiVlNgj',
                    custom_text: {
                        shipping_address: {
                          message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                        },
                        submit: {message: 'We\'ll email you instructions on how to get started.'},
                      },
                    
                    shipping_options: [
                        { shipping_rate: 'shr_1Mq0rdD4Lx7TzF99Vyaml6ER' },
                        { shipping_rate: 'shr_1Mq1EGD4Lx7TzF99ex4uDqmX'},
                          {
                            shipping_rate_data: {
                                type: 'fixed_amount',
                                fixed_amount: {amount: shipping_options.price * 100, currency: 'sek'},
                                display_name: shipping_options.name,
                                delivery_estimate: {
                                    minimum: {unit: 'business_day', value: 5},
                                    maximum: {unit: 'business_day', value: 7},
                                },
                            },
                        },
                    ],
            });
            // const shippment = await stripe.checkout.sessions.retrieve(session.id);
            // const customer = await stripe.customers.retrieve(session.customer);
            // console.log('session shipping --->>>', session.customer);

            // create order to Strapi
            const createData = {
                // populate: 'order_items', 
                data: { 
                    name: userName, 
                    session_id: session.id,
                    phone: '234324',
                    email: email,
                    status: session.status,
                    payment_status: session.payment_status
                }
            }
            // console.log('createData', JSON.stringify(createData, null, 2))
            const order = await strapi
            .service("api::order.order")
            // .query("order")
            .create(createData, { includeRelations: true }); // Try to create Order with Order_Items at Strapi DB
            console.log("session----->", session)
            // console.log("order--->>", order)

            return { url: session.url, orderId: order.id, id: session.id };
        } catch (error) {
            console.log(error)
            ctx.response.status = 500;
            return { error: { message: "There was a problem creating the charge" } };
        }
    },
}));

