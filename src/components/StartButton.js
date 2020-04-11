import React from 'react';
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import "../styles/startButton.css"

export default function StartButton() {
  return(
    <React.Fragment>
      <Link to="/productions">
        <div className="startButtonContainer">
          <Button variant="contained" color="primary">
            Empezar
          </Button>
        </div>
      </Link>
    </React.Fragment>
  )
}