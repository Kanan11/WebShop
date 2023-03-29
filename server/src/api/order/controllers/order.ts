
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
                email: email,
                    address: {
                      city: shippingAddress.city,
                      country: shippingAddress.country,
                      line1: shippingAddress.line1,
                      line2: shippingAddress.line2,
                      postal_code: shippingAddress.postal_code,
                      state: ""
                    },
                    phone: shippingAddress.line2,
                    name: userName,
                    shipping: {
                        name: userName,
                        phone: shippingAddress.line2,
                        address: {
                            line1: shippingAddress.line1,
                            line2: shippingAddress.line2,
                            city: shippingAddress.city,
                            state: "",
                            postal_code: shippingAddress.postal_code,
                            country: shippingAddress.country,
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
        const { products, userName, email, shipping_options, shippingAddress } = ctx.request.body;
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

                // const test = await strapi
                // .service("api::order.order")
                // .findOne(20, {populate: 'order_items'})
                // console.log("test----->", test);

                // create order with order_items to Strapi
            const orderItems = [];
            for (const item of products) {
                const x = await strapi
                .service("api::order-item.order-item")
                .create(
                    { data: {
                        quantity: item.quantity,
                        product_id: item.id,
                        product: item.id // need for relationship
                    }}
                )
                orderItems.push(x)
            }
  
           const createData = {
                data: { 
                    name: userName, 
                    phone: shippingAddress.line2,
                    email: email,
                    order_items: orderItems.map(i => i.id)
                }
            }
            const order = await strapi
            .service("api::order.order")
            .create(createData, { includeRelations: true });  

           const createShippingAdress = {
                data: { 
                    name: userName, 
                    phone: shippingAddress.line2,
                    street: shippingAddress.line1,
                    postal_code: shippingAddress.postal_code,
                    country: shippingAddress.country
                }
            }
            const shippingAdress = await strapi
            .service("api::shipping-adress.shipping-adress")
            .create(createShippingAdress, { includeRelations: true });  
                    
                // create a Stripe session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card", "klarna"],
                    // customer_email: email,
                    mode: "payment",
                    success_url: `http://localhost:3000/checkout/success?order_id=${order.id}`,
                    cancel_url: `http://localhost:3000/checkout/cancel?order_id=${order.id}`,
                    line_items: lineItems,
                    metadata: {description: 'some text was reserved!'},
                    // consent_collection: {
                    //     terms_of_service: 'required',
                    //   },  TODO visit this page before https://dashboard.stripe.com/settings/public
                    shipping_address_collection: {
                        allowed_countries: ['SE'],
                    },
                    billing_address_collection: 'auto',
                    customer: 'cus_NcAFbuWszFORNe',
                    custom_text: {
                        shipping_address: {
                          message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                        },
                        submit: {message: 'We\'ll email you instructions on how to get started.'},
                      },
                    
                    shipping_options: [
                        { shipping_rate: 'shr_1Mq1EGD4Lx7TzF99ex4uDqmX'},
                        { shipping_rate: 'shr_1Mq0rdD4Lx7TzF99Vyaml6ER' },
                          { // this shipping methode come from front-end
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

            // update same order with Stripe payment session.id and two statuses
            const updateData = {
                data: { 
                    session_id: session.id,
                    shipping_adress: shippingAdress.id,
                    status: session.status, // TODO need to update one more time, after confirmation
                    payment_status: session.payment_status, // TODO need to update one more time, after confirmation
                }
            }
            await strapi
            .service("api::order.order")
            .update(order.id, updateData);  

            return { url: session.url, id: session.id };
        } catch (error) {
            console.log(error)
            ctx.response.status = 500;
            return { error: { message: "There was a problem creating the charge" } };
        }
    },
}));

