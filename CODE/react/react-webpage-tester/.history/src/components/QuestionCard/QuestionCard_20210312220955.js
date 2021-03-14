import React, {useState} from "react";
import QuestionModal from "../QuestionModal/QuestionModal";
import "./style.css"

function QuestionCard(props) {
const [modalShow, setModalShow] = useState(false);
const [disableLink, setDisableLink] = useState(false);

  function showModal(props){
    // console.log(props, 'In show modal props');
    setModalShow(true);
    setDisableLink(true)
  }

  return (
      <div className="col cardCol" >
        <QuestionModal  show={modalShow}
          onHide={() => setModalShow(false)}
          props={props}
          setModalShow={setModalShow}
        ></QuestionModal>
        <div className="card">
          <div className="card-body text-center questionCard" value={props.level} catID={props.categoryID} index={props.index}>
            <button 
              id={props.categoryID}
              type="button" 
              className="btn btn-link" 
              disabled={disableLink}
              onClick={() => showModal(props)}
              >
              {props.level}
            </button>
          </div>
        </div>
      </div>
    );
}

export default QuestionCard;