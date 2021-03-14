import React, {useEffect, useState} from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import QuestionCard from "../QuestionCard/QuestionCard";
import API from "../../utils/API";
import "./style.css";


function Board(props) {
const [categories, setCategories] = useState([]);
const [questions, setQuestions] = useState([]);
const [twoHundredQuestions, setTwoHundredQuestions] = useState([]);
const [fourHundredQuestions, setFourHundredQuestions] = useState([]);
const [sixHundredQuestions, setSixHundredQuestions] = useState([]);
const [eightHundredQuestions, setEightHundredQuestions] = useState([]);
const [thousandQuestions, setThousandQuestions] = useState([]);

useEffect(() => {
    loadCategories()
  }, [])

useEffect(() => {
    loadQuestions()
  }, [categories])

useEffect(() => {
    if(questions[0] && questions[0].questions.length >= 5){
        categories.forEach(()=>{
            setTwoHundredQuestions(createScoreCards(0));
            setFourHundredQuestions(createScoreCards(1));
            setSixHundredQuestions(createScoreCards(2));
            setEightHundredQuestions(createScoreCards(3));
            setThousandQuestions(createScoreCards(4));
        })
        console.log(questions)
    } 
}, [questions])

  function loadCategories() {
    API.getCategories(Math.floor(Math.random() * 2000))
    .then(res => {
        setCategories(res.data)
    })
    .catch(err => console.log(err));
  };

  //use categories to retrieve questions for each category via API
  function loadQuestions() {
    categories.forEach((category, index) => {
        console.log(`${category.id} ${index} ${typeof index}`);
        API.getQuestions(category.id)
        .then(res => {
            setQuestions(previousState => [...previousState, {id:category.id, questions: res.data.clues}]);
        })
    })
  };

  //set questions into their own arrays based on point value 
  function createScoreCards(questionScoreIndex){
    let tempArray = [];
    questions.forEach((categoryQuestion)=>{
        if(categoryQuestion.questions){
            tempArray.push(categoryQuestion.questions[questionScoreIndex])
        }
    })
    return tempArray;
  }
  
  return (
      
    <div className="boardContainer">
        <div className="row categoryRow">
            {categories.map((cat)=>{
            return(
            <CategoryCard title={cat.title} key={cat.id}></CategoryCard>)})}
        </div>
        <div className="row 200Row">
            {twoHundredQuestions.map((question)=>{
                return <QuestionCard level='200' question={twoHundredQuestions} categoryID={question.category_id} index={twoHundredQuestions.indexOf(question)}  playersScores={props.playersScores} updateScore={props.updateScore}></QuestionCard>
            })}
        </div>
        <div className="row 400Row">
            {fourHundredQuestions.map((question)=>{
                return <QuestionCard level='400' question={fourHundredQuestions}
                categoryID={question.category_id} index={fourHundredQuestions.indexOf(question)} playersScores={props.playersScores} updateScore={props.updateScore}></QuestionCard>
            })}
        </div>
        <div className="row 600Row">
            {sixHundredQuestions.map((question)=>{
                return <QuestionCard level='600' question={sixHundredQuestions} categoryID={question.category_id} index={sixHundredQuestions.indexOf(question)} playersScores={props.playersScores} updateScore={props.updateScore}></QuestionCard>
            })}
        </div>
        <div className="row 800Row">
            {eightHundredQuestions.map((question)=>{
                return <QuestionCard level='800' question={eightHundredQuestions} categoryID={question.category_id} index={eightHundredQuestions.indexOf(question)} playersScores={props.playersScores} updateScore={props.updateScore}></QuestionCard>
            })}
        </div>
        <div className="row 1000Row">
            {thousandQuestions.map((question)=>{
                return <QuestionCard level='1000' question={thousandQuestions} categoryID={question.category_id} index={thousandQuestions.indexOf(question)} playersScores={props.playersScores} updateScore={props.updateScore}></QuestionCard>
            })}
        </div>
    </div>
  );
}

export default Board;