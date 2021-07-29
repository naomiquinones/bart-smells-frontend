import React from "react";

const Vote = (props) => {
  const upVote = () => {
    props.vote(props.report.id, 1);
  };
  const downVote = () => {
    props.vote(props.report.id, -1);
  };

  return (
    <>
      <button title="vote up" className="vote up" onClick={upVote}>
        +
      </button>{" "}
      <button title="vote down" className="vote down" onClick={downVote}>
        -
      </button>
    </>
  );
};

export default Vote;
