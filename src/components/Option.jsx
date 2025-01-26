import React from 'react';
import './Option.css';

const Option = ({name, number}) => (
  <option value={number}>{name}</option>
);

export default Option;