import React from 'react';
import './Row.css';

const Row = (props) => {
  const upVote = () => {
    props.vote(props.report.id,1);
  };
  const downVote = () => {
    props.vote(props.report.id,-1);
  };
  return (
    <tr key={props.report.id}>
      <td>{props.report.date}</td>
      <td>{props.report.type}</td>
      <td>{props.report.description}</td>
      <td>{props.report.route}</td>
      <td>{props.report.direction}</td>
      <td>{props.report.car_number}</td>
      <td>{props.report.votes}</td>
      <td><button title="vote up" className="vote up" onClick={upVote}>+</button> <button title="vote down" className="vote down" onClick={downVote}>-</button></td>
    </tr>
  )
}

export default Row;