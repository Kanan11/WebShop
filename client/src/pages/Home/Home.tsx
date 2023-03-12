import React from 'react';

interface Props {
  title?: string;
  description?: string;
}

const Homepage: React.FC<Props> = ({ title, description = 'home page' }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Homepage;
