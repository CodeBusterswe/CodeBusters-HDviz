import React from 'react';
import Select from 'react-select';

const algoritmi = [
  { label: "FASTMAP", value: 1 },
  { label: "T-SNE", value: 2 },
  { label: "ISOMAP", value: 3 },
  { label: "LLE", value: 4 }
];

const SelectorDimension = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Select options={ algoritmi } />
      </div>
      <div className="col-md-4"></div>
    </div>
  </div>
);
      
export default SelectorDimension       