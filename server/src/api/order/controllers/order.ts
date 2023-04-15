
"use strict";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
/**
 * order controller
 */
const { createCoreController, createNewCustomer } = require("@strapi/strapi").factories;
/* // save new user to Stripe
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
        const { products, userName, email, shipping_options, shippingAddress, userId, phone } = ctx.request.body;
        const BASE_URL = ctx.request.headers.origin || 'http://localhost:3000'
        if (products){
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
                    phone: phone,
                    email: email,
                    payment_status: 'unpaid',
                    order_items: orderItems.map(i => i.id)
                }
            }
            const order = await strapi
            .service("api::order.order")
            .create(createData, { includeRelations: true });  
            console.log(shippingAddress);
           const createShippingAdress = {
                data: { 
                    name: userName,
                    co_name: shippingAddress.co_name,
                    phone: shippingAddress.line2,
                    street: shippingAddress.line1,
                    postal_code: shippingAddress.postal_code,
                    city: shippingAddress.city,
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
                    success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
                    cancel_url: `${BASE_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
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
            
            
            /* ------------- This code should be removed --------------- */
            if (!session.payment_intent) {
                // handle the case where payment_intent is not set
                console.error('PaymentIntent ID is null');
              } else {
                if (session.payment_status === 'paid') {
                  // handle the case where payment was successful
                  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
                  const clientSecret = paymentIntent.client_secret;
                  // use the clientSecret to build your webhook endpoint
                } else if (session.payment_status === 'requires_payment_method') {
                  // handle the case where payment requires a new payment method
                  console.error('Payment requires a new payment method');
                } else {
                  // handle other cases
                  console.error('Unknown payment status: ' + session.payment_status);
                }
              }
            /* ------------- This code should be removed --------------- */


            // update same order with Stripe payment session.id, two statuses and shipping adress
            const updateData = {
                data: { 
                    session_id: session.id,
                    shipping_adress: shippingAdress.id,
                    status: session.status,
                    payment_status: session.payment_status,
                    // users_permissions_user: userId
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
    }else{
        // if order is paid change status to paid and be sure if it correct order
        const { sessionId, orderId } = ctx.request.body
        const session = await stripe.checkout.sessions.retrieve(
            sessionId
            )
            if(session.payment_status === "paid"){
                const updateData = {
                    data: { 
                        status: session.status, 
                        payment_status: session.payment_status,
                    }
                }
                const checkUp = await strapi
                .service("api::order.order")
                .findOne(orderId, {populate: 'order_items'})
                if (checkUp.session_id === sessionId) {
                    await strapi
                    .service("api::order.order")
                    .update(orderId, updateData);
                    
                    // TODO add order to user table
                    const updateUser = {
                        data: { 
                            orders: orderId, 
                            // shipping_adress: shipping_adressId, // TODO optional if user have many adress
                        }
                    }
                    // const userService = strapi.plugins['users-permissions'].services.user;
                    // const user = await userService.findOne({ id: userId }, ['orders']);
                    // await strapi
                    // .service("api::users-permissions.user")
                    // .findOne(userId, {populate: 'order'})
                    // .update(userId, updateUser);
                    console.log('-------->', updateUser)
                    }else{
                        console.log('Incorrect orderID')
                        ctx.throw(400, "It seems like the order wasn't verified, please contact support")
                        return
                    }
                    return {session: session}
                } else {
                    ctx.throw(400, "It seems like the order wasn't verified, please contact support")                    
                    }
                    return 
                }
            }
}));

