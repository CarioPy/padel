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
              <td className={styles.score_cells}>Score</td>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((player) => {
              return (
                <tr key={player.name}>
                  <td className={styles.names_cells}>{player.name}</td>
                  <td className={styles.score_cells}>{player.score}</td>
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
