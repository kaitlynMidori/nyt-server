import React from "react";
import {Box, TextInput, Heading} from 'grommet';

function PlayerScore(props) {

  return (
    <div className="text-center">
        <Box direction="column" gap="medium" width="255px">
            <Heading margin="medium">{props.player[props.index].score}</Heading>
            <TextInput placeholder="Name" margin="medium" onChange={event => {
              props.updateName(event.target.value, props.index)
            }}/>
        </Box>
    </div>
  );
}

export default PlayerScore;