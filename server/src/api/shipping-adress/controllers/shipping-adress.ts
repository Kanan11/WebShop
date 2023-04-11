/**
 * shipping-adress controller
 */

import { factories } from '@strapi/strapi';

interface ShippingAddress {
        street?: string;
        city?: string;
        postal_code?: string;
        country?: string;
        name?: string;
        phone?: string;
      }

export default factories.createCoreController('api::shipping-adress.shipping-adress', ({ strapi }) => ({
    async create(ctx) {
        
    const { shipping_adress }: { shipping_adress: ShippingAddress } = ctx.request.body as { shipping_adress: ShippingAddress };
    
    const createData = {
        data: { 
            street: shipping_adress.street,
            city: shipping_adress.city,
            postal_code: shipping_adress.postal_code,
            country: shipping_adress.country,
            name: shipping_adress.name,
            phone: shipping_adress.phone,
            publishedAt: new Date()
        }
    }
    
    try {
      const created_shipping_address = await strapi
      .service("api::shipping-adress.shipping-adress")
      .create(createData);  
      const created_shipping_address_id = created_shipping_address.id;
      console.log("Created shipping address ID:", created_shipping_address_id);
      return { id: created_shipping_address_id };
    } catch (error) {
      console.error("-->",error);
      return { error: error.message };
    }
  }
}));
