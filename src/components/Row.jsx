import React from 'react';
import './Row.css';
import Vote from './Vote';

const Row = (props) => {
  return (
    <tr key={props.report.id}>
      <td>{props.report.date}</td>
      <td>{props.report.type}</td>
      <td>{props.report.description}</td>
      <td>{props.report.route}</td>
      <td>{props.report.direction}</td>
      <td>{props.report.car_number}</td>
      <td>{props.report.votes}</td>
      <td><Vote report={props.report} vote={props.vote} /></td>
    </tr>
  )
}

export default Row;