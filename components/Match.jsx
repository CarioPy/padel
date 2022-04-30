import styles from "../styles/Match.module.css";
import React, { Component } from "react";
import Player from "./Player";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player_1: {},
      player_2: {},
      player_3: {},
      player_4: {},
      TeamA_score: 0,
      TeamB_score: 0,
    };
  }

  raisePlayerScore = async (player) => {
    await fetch("/api/player/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: player.pid,
        name: player.name,
        score: player.score + 1,
        email: player.email,
      }),
    });
  };

  decreasePlayerScore = async (player) => {
    await fetch("/api/player/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: player.pid,
        name: player.name,
        score: player.score - 1,
        email: player.email,
      }),
    });
  };

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

  handleCallBack_player1 = async (childData) => {
    await this.setState({ player_1: childData });
    console.log(this.state.player_1);
  };

  handleCallBack_player2 = async (childData) => {
    await this.setState({ player_2: childData });
    console.log(this.state.player_2);
  };

  handleCallBack_player3 = async (childData) => {
    await this.setState({ player_3: childData });
    console.log(this.state.player_3);
  };

  handleCallBack_player4 = async (childData) => {
    await this.setState({ player_4: childData });
    console.log(this.state.player_4);
  };

  createMatch = async () => {
    const new_match_uuid = uuidv4();
    const score_team_A = this.state.TeamA_score;
    const score_team_B = this.state.TeamB_score;

    await fetch("http://localhost:3000/api/match", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mid: new_match_uuid,
        player1ID: this.state.player_1.pid,
        player2ID: this.state.player_2.pid,
        player3ID: this.state.player_3.pid,
        player4ID: this.state.player_4.pid,
        score_teamA: score_team_A,
        score_teamB: score_team_B,
      }),
    });

    if (score_team_A > score_team_B) {
      this.raisePlayerScore(this.state.player_1);
      this.raisePlayerScore(this.state.player_2);
      this.decreasePlayerScore(this.state.player_3);
      this.decreasePlayerScore(this.state.player_4);
    } else if (score_team_B > score_team_A) {
      this.raisePlayerScore(this.state.player_3);
      this.raisePlayerScore(this.state.player_4);
      this.decreasePlayerScore(this.state.player_1);
      this.decreasePlayerScore(this.state.player_2);
    }

    Router.push("match/match_validated");
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
                  <Player parentCallBack={this.handleCallBack_player1} />
                </div>
              </div>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player parentCallBack={this.handleCallBack_player3} />
                </div>
              </div>
            </div>

            <div className={styles.LinePlayerContainer}>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player parentCallBack={this.handleCallBack_player2} />
                </div>
              </div>
              <div className={styles.PlayerContainer}>
                <div className={styles.Player}>
                  <Player parentCallBack={this.handleCallBack_player4} />
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
          <button onClick={this.createMatch}>Save Score</button>
        </div>
      </>
    );
  }
}

export default Match;
