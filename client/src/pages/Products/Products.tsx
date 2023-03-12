import React from 'react';

interface Props {
  title?: string;
  description?: string;
}

const Products: React.FC<Props> = ({ title, description = 'Products' }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Products;
