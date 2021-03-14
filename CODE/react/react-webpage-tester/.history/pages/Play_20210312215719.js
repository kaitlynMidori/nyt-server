import React, {useState} from "react";
import {Box} from 'grommet';
import Container from "../components/Container/Container";
import PlayerScore from "../components/PlayerScore/PlayerScore";
import Board from "../components/Board/Board";
import { Button } from 'react-bootstrap';
import API from "../utils/API"
import "./style.css";
import { NavLink } from 'react-router-dom'



function Play() {
const [playersScores, setPlayersScores] = useState([]);
const [showNumofPlayersDiv, setShowNumOfPlayersDiv] = useState(true);
const playerCounts = [1, 2, 3, 4];

function players(count) {
  setShowNumOfPlayersDiv(false);
  const newPlayerScores = [];
  
  for(let i = 0; i < count; i++) {
    const player = { name: '', score: 0 };
    newPlayerScores.push(player)
  }

  setPlayersScores([...newPlayerScores])
}

function updateName(name, index) {
  const newPlayerScores = playersScores;

  newPlayerScores[index].name = name;
  setPlayersScores([...newPlayerScores])
}

function updateScore(score, index) {
  const newPlayerScores = playersScores;
  //current score + value 

  newPlayerScores[index].score = score;
  setPlayersScores([...newPlayerScores])
}

function endGame() {
 playersScores.forEach((element) => {
    API.savePlayersScores(element)
  })
}
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col mb-5 text-center numOfPlayers">
            {showNumofPlayersDiv ? <Container>
            <h3>Choose the Number of Players</h3>
            {playerCounts.map(number => (
              <Button className="m-2 playerNumBtn" key={String(number)} onClick={() => players(number)}>
                {number}
              </Button>
            ))} </Container>: null}
        </div>
      </div>
      {showNumofPlayersDiv ? null : <div><div className="row">
        <div className="col text-center">
          <Container>
            <h3 className="mb-2 scores">Scores</h3>
            <Box direction="row-responsive" gap="small" alignContent="center">
              {playersScores.map((player, index) => {
                return <PlayerScore player={playersScores} updateName={updateName} index={index} />
              })}
            </Box>
          </Container>
        </div>
      </div>
      <div className="row">
        <div className="col mt-5">
            <div className="boardDiv mb-5">
              <Board playersScores={playersScores} updateScore={updateScore}/>
            </div>
        </div>
      </div> 
      <div className="row">
        <div className="col mt-5">
            <div className="mb-5 text-center">
            <NavLink to="/leaderboard">
              <Button className="m-2 endGameBtn" onClick={() => endGame()}>
                End Game
              </Button>
            </NavLink>
            </div>
        </div>
      </div>
      </div>}
      </div>
  );
}

export default Play;