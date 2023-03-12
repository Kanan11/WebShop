import React from 'react';

interface Props {
  title?: string;
  description?: string;
}

const Product: React.FC<Props> = ({ title, description = 'product' }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Product;
