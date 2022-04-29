import styles from "../styles/Match.module.css";
import React, { Component } from "react";
import Player from "./Player";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamA_score: 0,
      TeamB_score: 0,
    };
  }

  increaseScoreTeamA = () => {
    this.setState({ TeamA_score: this.state.TeamA_score + 1 });
  };
  decreaseScoreTeamA = () => {
    this.setState({ TeamA_score: this.state.TeamA_score - 1 });
  };
  increaseScoreTeamB = () => {
    this.setState({ TeamB_score: this.state.TeamB_score + 1 });
  };
  decreaseScoreTeamB = () => {
    this.setState({ TeamB_score: this.state.TeamB_score - 1 });
  };

  createMatch = async () => {
    let new_match = await fetch("http://localhost:3000/api/match", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "00000000",
        player1ID: "62628afe82c638156acfa99b",
        player2ID: "62628afe82c638156acfe98b",
        player3ID: "62628afe82c654drd324bbcb",
        player4ID: "62628afERFTdgare45fdraGG",
        score: 10,
      }),
    });
    console.log("match created");
  };

  render() {
    return (
      <>
        <h4 className={styles.title}>Match</h4>
        <div className={styles.main_container}>
          <div className={styles.field}>
            <div className={styles.LinePlayerContainer}>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player func={this.pull_data} />
                </div>
              </div>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player />
                </div>
              </div>
            </div>

            <div className={styles.LinePlayerContainer}>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player />
                </div>
              </div>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.score_container}>
            <div className={styles.button_container}>
              <button onClick={this.increaseScoreTeamA}>+</button>
              <button onClick={this.decreaseScoreTeamA}>-</button>
            </div>
            <h1>{this.state.TeamA_score}</h1>
            <h1>:</h1>
            <h1>{this.state.TeamB_score}</h1>
            <div className={styles.button_container}>
              <button onClick={this.increaseScoreTeamB}>+</button>
              <button onClick={this.decreaseScoreTeamB}>-</button>
            </div>
          </div>
          <button>End Match !</button>
        </div>
      </>
    );
  }
}

export default Match;
