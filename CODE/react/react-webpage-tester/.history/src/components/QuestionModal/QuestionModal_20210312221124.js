import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import './style.css'

function QuestionModal(props) {
  const [showAssignPointsDiv, setShowAssignPointsDiv] = useState(false);

  function showAnswer() {
    document.getElementById("answer").classList.remove("hidden");
    setShowAssignPointsDiv(true);
  }

  function addPoints(index) {
    const currentScores = props.props.playersScores; 
    const pointsEarned = parseInt(props.props.level);

    const newScore = props.props.playersScores[index].score + pointsEarned; 
    {props.props.updateScore(newScore, index)}
    props.setModalShow(false)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.props && props.props.question[props.props.index].question}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="answerContainer">
          <Button className="modalBtn" onClick={showAnswer}>Show Answer</Button>
          <div className="answerDiv hidden m-3" id="answer">
            {props.props && props.props.question[props.props.index].answer}
          </div>
          {showAssignPointsDiv ? <div className="row text-center m-3">
            <p className="m-2">Assign Points To:</p>
            {props.props.playersScores.map((player, index) => {
              return <Button className="m-2 modalBtn" onClick={() => addPoints(index)} id={index}>{props.props.playersScores[index].name}</Button>
            })}
            <Button className="m-2 modalBtn" onClick={() => props.setModalShow(false)}>None</Button>
          </div> : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="modalBtn">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionModal; 