import React from 'react';
import './Input.css'

const Input = (props) => {
  return (
    <>
    <label htmlFor={props.name}>{props.label}</label>
    <input name={props.name} className={props.className} type={props.type} value={props.value} onChange={props.onChange} />
    </>
  );
}

export default Input;