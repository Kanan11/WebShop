const stripe = require('stripe')(process.env.STRIPE_API_KEY);


module.exports = { async beforeCreate (event) {
  try {
    const { params } = event // data from frontend
    params.session_id = await stripe.createCheckoutSession({
      amount: params,
      currency: 'sek',
      items: params.items.map(e => {
         return item // convert to stripe item
      })
    })
  } catch (error) {
    event.throw(400, error)
  }}
};


// module.exports = {
//   async createPaymentIntent(ctx) {
//     try {
//       const { amount } = ctx.request.body;
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: 'sek',
//       });
//       ctx.send({
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (error) {
//       ctx.throw(400, error);
//     }
//   },
// };