import React from 'react';

export const GridContainer = ({ children }) => {
  return <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>{children}</div>;
};

