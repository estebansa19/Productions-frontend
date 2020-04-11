import React from 'react';
import { Grid } from '@material-ui/core'
import "../styles/front.css"
import entertaiment from "../images/entertaiment.png"
import StartButton from "../components/StartButton"

export default function Front() {
  return(
    <div className="frontWrapper">
      <div className="frontContainer">
        <div className="center">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h1>
                Personal media project to save opinions, reviews or whatever of books,
                films, series and animes that I consume
              </h1>
            </Grid>
            <Grid item xs={6}>
              <img alt="Entertaiment icon" src={entertaiment}></img>
            </Grid>
          </Grid>
        </div>
      </div>
      <StartButton/>
    </div>
  )
}