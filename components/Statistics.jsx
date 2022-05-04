import styles from "../styles/Statistics.module.css";
import Image from "next/image";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInfo: {},
      today_date: new Date().toISOString().slice(0, 10),
      allmatches: [],
    };
  }
  // Need to be in GetServerSideProps ()
  // Retreive player based on its name
  getOrCreatePlayer = async () => {
    const router = Router;
    if (this.state.playerInfo) {
      try {
        let player = await fetch("/api/player/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.props.props.user.email,
          }),
        });

        let { data } = await player.json();
        this.setState({ playerInfo: data });
      } catch (error) {
        console.log(error);
      }
    } else {
      let new_player_uuid = uuidv4();
      await fetch("/api/player", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: new_player_uuid,
          name: this.props.props.user.name,
          score: 0,
          email: this.props.props.user.email,
        }),
      });

      this.setState({
        playerInfo: {
          pid: new_player_uuid,
          name: this.props.props.user.name,
          score: 0,
          email: this.props.props.user.email,
        },
      });
      router.push("/profile/statistics/player_creation");
    }
  };

  fetchMatch = async () => {
    const matches = await fetch("/api/match/findall", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.playerInfo.name }),
    });
    let { data } = await matches.json();
    this.setState({ allmatches: data });
  };

  Alert = () => {
    alert("In Building ;)");
  };

  render() {
    this.getOrCreatePlayer();
    this.fetchMatch();
    return (
      <>
        <h4 className={styles.title}>Statistics</h4>
        <div className={styles.dashboardContainer}>
          <div className={styles.horizontalTopContainer}>
            <Image
              className={styles.player_pic}
              src={this.props.props.user.image}
              width={80}
              height={80}
            ></Image>
            <div className={styles.player_name}>
              {this.state.playerInfo.name}
            </div>
            <div className={styles.player_score}>
              {this.state.playerInfo.score}
            </div>
          </div>
          <h4>Match History</h4>
          <div className={styles.matchTableContainer}>
            <table className={styles.matchTable}>
              <thead className={styles.tableHead}>
                <tr>
                  <td>Teams</td>
                  <td>Score</td>
                  <td>Date</td>
                  <td>Validation</td>
                </tr>
              </thead>
              {this.state.allmatches.map((match) => {
                return (
                  <tbody key={match.mid}>
                    <tr>
                      <td className={styles.player_cells}>
                        <p>
                          {match.player1ID} and {match.player2ID}
                        </p>
                        <h3> VS </h3>
                        <p>
                          {match.player3ID} and {match.player4ID}
                        </p>
                      </td>
                      <td>
                        <h3>
                          {match.score_teamA} : {match.score_teamB}
                        </h3>
                      </td>
                      <td>{match.date.slice(0, 10)}</td>
                      <td>
                        <button
                          className={styles.pendButton}
                          onClick={this.Alert}
                        >
                          Contest Score
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Statistics;
