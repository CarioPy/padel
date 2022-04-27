import React, { Component } from "react";
import styles from "../styles/LeaderBoard.module.css";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  getDatas = async () => {
    const res = await fetch("/api/player");
    const { data } = await res.json();
    this.setState({ players: data });
  };

  render() {
    this.getDatas();

    return (
      <>
        <h4 className={styles.title}>Leaderboard</h4>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeadRow}>
              <td>Player</td>
              <td>Score</td>
              <td>Rank</td>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((player) => {
              return (
                <tr key={player.name}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default LeaderBoard;
