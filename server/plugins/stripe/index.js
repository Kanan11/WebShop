const stripe = require('stripe')(process.env.STRIPE_API_KEY);
export default (_strapi) => {
    console.log(process.env.STRIPE_API_KEY)
    console.log(process.env.NODE_ENV);
  return {
    initialize: async () => {
      try {
        const products = await stripe.products.list();
        console.log('Stripe products:', products);

        const customer = await stripe.customers.create({
          email: 'kanan@example.com',
          name: 'Kanan Garaisayev',
        });

        console.log('Stripe customer:', customer);
      } catch (error) {
        console.error('Error fetching Stripe products:', error);
      }
    },
  };
};