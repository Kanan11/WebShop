
import { Store, Persistor } from 'redux';

export interface CardProps {
  item: {
    id: number;
    oldPrice?: number;
    attributes: {
      isNew: boolean;
      img: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      img2: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      title: string;
      price: number;
    };
  };
}

export interface FeaturedProductsProps {
  type: string;
}

export interface Product {
  id: string | number;
  attributes: {
    isNew?: boolean;
    img?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    img2?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    title?: string;
    price?: number;
  };
  oldPrice?: number;
}

declare module 'redux/store' {
  export const store: Store;
  export const persistor: Persistor;
}
